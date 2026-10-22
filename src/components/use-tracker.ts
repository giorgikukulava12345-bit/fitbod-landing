'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {blankWorkspace,demoWorkspace,validWorkspace,validWorkout,type Workspace,type Routine,makeActive,type WorkoutLog,dateKey,completedSets} from '@/lib/tracker';
import {translator,type Lang} from '@/lib/tracker-i18n';
import {validRoutine} from '@/lib/program';
type Mode='demo'|'personal';
const key=(mode:Mode)=>'giofitness.tracker.v1.'+mode;
export function useTracker(today:string){
 const [data,setData]=useState<Workspace>(()=>demoWorkspace(today));const [mode,setMode]=useState<Mode>('demo');const [lang,setLanguage]=useState<Lang>('en');const [unit,setUnit]=useState<'kg'|'lbs'>('kg');const [ready,setReady]=useState(false);const [notice,setNotice]=useState('');const [saving,setSaving]=useState(false);const [now,setNow]=useState(0);const blocked=useRef(new Set<string>());const t=translator(lang);
 const notify=useCallback((message:string)=>setNotice(message),[]);
 function read(mode:Mode):Workspace{
  try{const raw=localStorage.getItem(key(mode));if(raw){const parsed=JSON.parse(raw);if(validWorkspace(parsed))return parsed;blocked.current.add(key(mode));return mode==='demo'?demoWorkspace(today):blankWorkspace()}
   const next=mode==='demo'?demoWorkspace(today):blankWorkspace();
   if(mode==='personal'){
    const legacy=JSON.parse(localStorage.getItem('giofitness.open.routines.v1')||'[]');if(Array.isArray(legacy))next.routines=legacy.filter(validRoutine).slice(0,100).map(r=>({id:r.id,name:r.name,nameKa:r.name,level:r.level,place:r.place,exerciseIds:[...new Set(r.items.map(i=>i.exerciseId))],prescriptions:r.items.map(i=>({exerciseId:i.exerciseId,sets:i.sets,reps:i.reps,metric:i.unit}))}));
    const progress=JSON.parse(localStorage.getItem('giofitness.open.progress.v1')||'{}');const candidate={...next,program:progress};if(validWorkspace(candidate))next.program=progress;
   }return next;
  }catch{blocked.current.add(key(mode));return mode==='demo'?demoWorkspace(today):blankWorkspace()}
 }
 useEffect(()=>{let m:Mode='demo';try{const prefs=JSON.parse(localStorage.getItem('giofitness.tracker.preferences.v1')||'{}');if(prefs.mode==='personal')m='personal';if(prefs.lang==='ka'||prefs.lang==='en')setLanguage(prefs.lang);if(prefs.unit==='lbs')setUnit('lbs')}catch{}setMode(m);setData(read(m));setNow(Date.now());setReady(true)},[]);// eslint-disable-line react-hooks/exhaustive-deps
 useEffect(()=>{if(!ready)return;document.documentElement.lang=lang;try{localStorage.setItem('giofitness.tracker.preferences.v1',JSON.stringify({lang,mode,unit}));if(blocked.current.has(key(mode))){notify(t('saveError'));return}localStorage.setItem(key(mode),JSON.stringify(data))}catch{notify(t('saveError'))}},[data,mode,lang,unit,ready]);// eslint-disable-line react-hooks/exhaustive-deps
 useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[]);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(''),6500);return()=>clearTimeout(timer)},[notice]);
 function switchMode(next:Mode){if(next===mode)return;try{if(!blocked.current.has(key(mode)))localStorage.setItem(key(mode),JSON.stringify(data))}catch{notify(t('saveError'))}setData(read(next));setMode(next)}
 function start(routine:Routine){if(data.active){notify(t('sessionActive'));return false}setData(d=>({...d,active:makeActive(routine,crypto.randomUUID(),Date.now(),d.logs)}));return true}
 function pause(){setData(d=>{if(!d.active)return d;const a=d.active;return {...d,active:{...a,elapsed:a.elapsed+(a.runningSince?Math.max(0,(Date.now()-a.runningSince)/1000):0),runningSince:a.runningSince?null:Date.now()}}})}
 async function finish(){
  if(!data.active||saving)return false;if(!completedSets(data.active)){notify(t('oneSet'));return false}if(data.logs.length>=500){notify(t('backupLimit'));return false}
  const a=data.active;const w:WorkoutLog={id:a.id,name:a.name,nameKa:a.nameKa,startedAt:a.startedAt,finishedAt:new Date().toISOString(),duration:Math.min(172800,Math.floor(a.elapsed+(a.runningSince?Math.max(0,(Date.now()-a.runningSince)/1000):0))),exercises:a.exercises};
  if(!validWorkout(w)){notify(t('invalidEntry'));return false}setSaving(true);let online=true;
  try{const response=await fetch('/api/workouts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(w),signal:AbortSignal.timeout(8000)});if(!response.ok)online=false}catch{online=false}
  setData(d=>({...d,logs:d.logs.some(l=>l.id===w.id)?d.logs:[w,...d.logs],active:null}));setSaving(false);notify(t(online?'workoutSaved':'offlineSaved'));return true;
 }
 function exportData(){const blob=new Blob([JSON.stringify({app:'giofitness',version:1,workspace:data},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`giofitness-${mode}-${dateKey(Date.now())}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify(t('exported'))}
 async function importData(file?:File){if(!file)return;try{if(file.size>5000000)throw Error();const parsed=JSON.parse(await file.text());if(parsed.app!=='giofitness'||!validWorkspace(parsed.workspace))throw Error();const incoming:Workspace=parsed.workspace;const logs=[...data.logs];for(const log of incoming.logs){const old=logs.find(l=>l.id===log.id);if(!old)logs.push(log);else if(JSON.stringify(old)!==JSON.stringify(log))logs.push({...log,id:crypto.randomUUID()})}const weights=[...data.weights,...incoming.weights.filter(w=>!data.weights.some(x=>x.date===w.date&&x.kg===w.kg))].sort((a,b)=>a.date.localeCompare(b.date));const customs=[...data.routines];for(const r of incoming.routines){const old=customs.find(c=>c.id===r.id);if(!old)customs.push(r);else if(JSON.stringify(old)!==JSON.stringify(r))customs.push({...r,id:crypto.randomUUID()})}const program={...data.program};for(const [key,days]of Object.entries(incoming.program))program[key]=[...new Set([...(program[key]||[]),...days])];const merged={...data,logs:logs.sort((a,b)=>b.finishedAt.localeCompare(a.finishedAt)),weights,routines:customs,program};if(!validWorkspace(merged))throw Error();setData(merged);notify(t('imported'))}catch{notify(t('importError'))}}
 return {data,setData,mode,switchMode,lang,setLanguage,unit,setUnit,ready,notice,notify,clearNotice:()=>setNotice(''),now:now||Date.parse(today+'T12:00:00Z'),start,pause,finish,saving,exportData,importData,t};
}
export type Tracker=ReturnType<typeof useTracker>;
