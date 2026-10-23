import {exercises,type Exercise,type Level} from './catalog.ts';
export type Group='chest'|'back'|'legs'|'shoulders'|'arms'|'core';
export type Unit='kg'|'lbs';
export type LoggedSet={id:string;reps:number;kg:number;done:boolean};
export type LoggedExercise={exerciseId:string;metric?:'reps'|'seconds';sets:LoggedSet[]};
export type WorkoutLog={id:string;name:string;nameKa:string;startedAt:string;finishedAt:string;duration:number;exercises:LoggedExercise[]};
export type ActiveWorkout={id:string;name:string;nameKa:string;startedAt:string;elapsed:number;runningSince:number|null;exercises:LoggedExercise[]};
export type Routine={id:string;name:string;nameKa:string;level:Level;place:'home'|'gym';exerciseIds:string[];prescriptions?:{exerciseId:string;sets:number;reps:number;metric:'reps'|'seconds'}[]};
export type WeightEntry={date:string;kg:number};
export type Workspace={version:1;logs:WorkoutLog[];weights:WeightEntry[];goal:number;active:ActiveWorkout|null;routines:Routine[];program:Record<string,number[]>};
export const groups:Group[]=['chest','back','legs','shoulders','arms','core'];
export const groupOf=(e:Exercise):Group=>['quads','hamstrings','glutes'].includes(e.muscle)?'legs':e.muscle==='cardio'?'core':e.muscle as Group;
export const exerciseById=(id:string)=>exercises.find(e=>e.id===id)!;
export const toUnit=(kg:number,unit:Unit)=>unit==='kg'?kg:kg*2.2046226218;
export const fromUnit=(value:number,unit:Unit)=>unit==='kg'?value:value/2.2046226218;
export const round=(n:number)=>Math.round(n*100)/100;
export const displayWeight=(kg:number,unit:Unit)=>Number(toUnit(kg,unit).toFixed(1));
export const dateKey=(value:string|number|Date)=>new Date(value).toISOString().slice(0,10);
export const dayBefore=(day:string,n:number)=>new Date(Date.parse(day+'T12:00:00Z')-n*86400000).toISOString().slice(0,10);
export const routines:Routine[]=[
 {id:'upper-a',name:'Upper body A',nameKa:'ზედა სხეულის დღე',level:'intermediate',place:'gym',exerciseIds:['barbell-bench-press','one-arm-dumbbell-row','seated-dumbbell-press','dumbbell-lateral-raise','cable-triceps-pushdown']},
 {id:'pull',name:'Pull day',nameKa:'მოქაჩვის დღე',level:'intermediate',place:'gym',exerciseIds:['lat-pulldown','seated-cable-row','face-pull','dumbbell-biceps-curl']},
 {id:'legs',name:'Lower body',nameKa:'ქვედა სხეული',level:'intermediate',place:'gym',exerciseIds:['barbell-back-squat','barbell-romanian-deadlift','leg-press','seated-leg-curl']},
 {id:'home',name:'Home essentials',nameKa:'ვარჯიში სახლში',level:'beginner',place:'home',exerciseIds:['bodyweight-squat','knee-push-up','glute-bridge','dead-bug','forearm-plank']},
];
export const exerciseUnit=(id:string):'reps'|'seconds'=>/plank|hold|wall-sit|carry|bike|ergometer|elliptical|march|jack|climber|knees|crawl/.test(id)?'seconds':'reps';
export function defaultKg(id:string){const e=exerciseById(id);return e.equipment==='bodyweight'?0:/squat|deadlift|leg-press/.test(id)?60:/bench-press/.test(id)?50:e.equipment==='dumbbell'?12:20}
export function makeActive(routine:Routine,id:string,now:number,logs:WorkoutLog[]=[]):ActiveWorkout{
 return {id,name:routine.name,nameKa:routine.nameKa,startedAt:new Date(now).toISOString(),elapsed:0,runningSince:now,exercises:routine.exerciseIds.map(exerciseId=>{
  const previous=logs.find(l=>l.exercises.some(e=>e.exerciseId===exerciseId&&e.sets.some(s=>s.done)))?.exercises.find(e=>e.exerciseId===exerciseId)?.sets.filter(s=>s.done).at(-1);
  const plan=routine.prescriptions?.find(p=>p.exerciseId===exerciseId);const metric=plan?.metric||exerciseUnit(exerciseId);return {exerciseId,metric,sets:Array.from({length:plan?.sets||3},(_,i)=>({id:id+'-'+exerciseId+'-'+i,reps:plan?.reps||previous?.reps||(metric==='seconds'?30:10),kg:previous?.kg??defaultKg(exerciseId),done:false}))};
 })};
}
export function blankWorkspace():Workspace{return {version:1,logs:[],weights:[],goal:75,active:null,routines:[],program:{}}}
export function demoWorkspace(today:string):Workspace{
 const data=blankWorkspace();data.goal=78;
 const days=[27,25,23,22,20,18,16,15,13,11,9,8,6,4,3,2,1,0];
 data.logs=days.map((daysAgo,index)=>{const routine=routines[index%3];const start=dayBefore(today,daysAgo)+'T07:00:00.000Z';const active=makeActive(routine,'demo-'+index,Date.parse(start));return {id:active.id,name:active.name,nameKa:active.nameKa,startedAt:start,finishedAt:new Date(Date.parse(start)+(38+index%12)*60000).toISOString(),duration:(38+index%12)*60,exercises:active.exercises.map(e=>({...e,sets:e.sets.map((s,i)=>({...s,reps:10-i,kg:s.kg===0?0:s.kg+Math.floor(index/3)*2.5,done:true}))}))}}).reverse();
 data.weights=Array.from({length:9},(_,i)=>({date:dayBefore(today,(8-i)*3),kg:round(83.2-i*.32+([0,.1,-.2][i%3]))}));
 const active=makeActive(routines[0],'demo-active',Date.parse(today+'T12:00:00Z'),data.logs);active.runningSince=null;active.elapsed=12*60+36;active.exercises[0].sets[0].done=true;active.exercises[0].sets[1].done=true;data.active=active;
 return data;
}
const finite=(n:unknown,min:number,max:number)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
const text=(s:unknown,max=100)=>typeof s==='string'&&s.length>0&&s.length<=max;
const validDate=(s:unknown)=>typeof s==='string'&&Number.isFinite(Date.parse(s));
export function validExerciseLogs(value:unknown):value is LoggedExercise[]{return Array.isArray(value)&&value.length>0&&value.length<=40&&value.every(e=>e&&(e.metric===undefined||['reps','seconds'].includes(e.metric))&&text(e.exerciseId)&&exercises.some(x=>x.id===e.exerciseId)&&Array.isArray(e.sets)&&e.sets.length>0&&e.sets.length<=10&&e.sets.every((s:LoggedSet)=>s&&text(s.id,180)&&Number.isInteger(s.reps)&&finite(s.reps,1,300)&&finite(s.kg,0,500)&&typeof s.done==='boolean')&&new Set(e.sets.map((s:LoggedSet)=>s.id)).size===e.sets.length)&&new Set(value.map(e=>e.exerciseId)).size===value.length}
export function validWorkout(value:unknown):value is WorkoutLog{if(!value||typeof value!=='object')return false;const w=value as WorkoutLog;return text(w.id)&&text(w.name,80)&&text(w.nameKa,80)&&validDate(w.startedAt)&&validDate(w.finishedAt)&&Date.parse(w.finishedAt)>=Date.parse(w.startedAt)&&finite(w.duration,0,172800)&&validExerciseLogs(w.exercises)&&w.exercises.some(e=>e.sets.some(s=>s.done))}
export function validTrackerRoutine(r:Routine){
 return !!r&&text(r.id)&&text(r.name,80)&&text(r.nameKa,80)&&['beginner','intermediate','advanced'].includes(r.level)&&['home','gym'].includes(r.place)&&Array.isArray(r.exerciseIds)&&r.exerciseIds.length>0&&r.exerciseIds.length<=40&&new Set(r.exerciseIds).size===r.exerciseIds.length&&r.exerciseIds.every(id=>exercises.some(e=>e.id===id))&&(r.prescriptions===undefined||(Array.isArray(r.prescriptions)&&r.prescriptions.length<=40&&r.prescriptions.every(p=>r.exerciseIds.includes(p.exerciseId)&&Number.isInteger(p.sets)&&finite(p.sets,1,10)&&Number.isInteger(p.reps)&&finite(p.reps,1,300)&&['reps','seconds'].includes(p.metric))));
}
export function validWorkspace(value:unknown):value is Workspace{
 if(!value||typeof value!=='object')return false;const w=value as Workspace;
 const logs=Array.isArray(w.logs)&&w.logs.length<=500&&w.logs.every(validWorkout)&&new Set(w.logs.map(l=>l.id)).size===w.logs.length;
 const weights=Array.isArray(w.weights)&&w.weights.length<=1000&&w.weights.every(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)&&validDate(e.date)&&finite(e.kg,20,400));
 const a=w.active;
 const active=a===null||(!!a&&text(a.id)&&text(a.name,80)&&text(a.nameKa,80)&&validDate(a.startedAt)&&finite(a.elapsed,0,172800)&&(a.runningSince===null||finite(a.runningSince,0,Date.now()+86400000))&&validExerciseLogs(a.exercises));
 const routines=Array.isArray(w.routines)&&w.routines.length<=100&&w.routines.every(validTrackerRoutine);
 const program=!!w.program&&typeof w.program==='object'&&Object.entries(w.program).every(([key,days])=>/^(home|gym)\.(beginner|intermediate|advanced)$/.test(key)&&Array.isArray(days)&&days.length<=28&&new Set(days).size===days.length&&days.every(n=>Number.isInteger(n)&&n>=1&&n<=28));
 return w.version===1&&logs&&weights&&finite(w.goal,20,400)&&active&&routines&&program;
}
export function completedSets(w:WorkoutLog|ActiveWorkout){return w.exercises.reduce((n,e)=>n+e.sets.filter(s=>s.done).length,0)}
export function volume(w:WorkoutLog|ActiveWorkout){return round(w.exercises.reduce((sum,e)=>sum+((e.metric||exerciseUnit(e.exerciseId))==='seconds'?0:e.sets.filter(s=>s.done).reduce((v,s)=>v+s.reps*s.kg,0)),0))}
export function streak(logs:WorkoutLog[],today:string){const dates=new Set(logs.map(l=>dateKey(l.finishedAt)));let count=0;let start=dates.has(today)?0:1;while(dates.has(dayBefore(today,start+count)))count++;return count}
export function records(logs:WorkoutLog[]){const best:Record<string,{kg:number;reps:number;estimate:number;date:string}>={};for(const w of logs)for(const e of w.exercises)for(const s of e.sets){if(!s.done||s.kg===0||(e.metric||exerciseUnit(e.exerciseId))==='seconds')continue;const estimate=round(s.kg*(1+Math.min(s.reps,30)/30));if(!best[e.exerciseId]||estimate>best[e.exerciseId].estimate)best[e.exerciseId]={kg:s.kg,reps:s.reps,estimate,date:dateKey(w.finishedAt)}}return best}
export function strengthSeries(logs:WorkoutLog[],exerciseId:string){return logs.slice().sort((a,b)=>a.finishedAt.localeCompare(b.finishedAt)).flatMap(w=>{const sets=w.exercises.filter(e=>e.exerciseId===exerciseId&&(e.metric||exerciseUnit(e.exerciseId))==='reps').flatMap(e=>e.sets.filter(s=>s.done&&s.kg>0));return sets.length?[{date:dateKey(w.finishedAt),value:Math.max(...sets.map(s=>round(s.kg*(1+Math.min(s.reps,30)/30))))}]:[]})}
export function weeklyVolumes(logs:WorkoutLog[],today:string){return Array.from({length:7},(_,i)=>{const date=dayBefore(today,6-i);return {date,value:logs.filter(l=>dateKey(l.finishedAt)===date).reduce((n,w)=>n+volume(w),0)}})}
export function recovery(logs:WorkoutLog[],now:number){
 const load=Object.fromEntries(groups.map(g=>[g,0])) as Record<Group,number>;
 for(const w of logs){const age=(now-Date.parse(w.finishedAt))/3600000;if(age<0||age>168)continue;for(const item of w.exercises){const e=exerciseById(item.exerciseId);if(e.muscle==='cardio')continue;const primary=groupOf(e);const stimulus=item.sets.filter(s=>s.done).length*13*Math.exp(-age/32);load[primary]+=stimulus;if(primary==='chest'){load.arms+=stimulus*.35;load.shoulders+=stimulus*.3}if(primary==='back')load.arms+=stimulus*.3;if(primary==='legs')load.core+=stimulus*.15}}
 return Object.fromEntries(groups.map(g=>{const score=Math.max(0,Math.round(100-load[g]));return [g,{score,status:score>=80?'fresh':score>=45?'recovering':'fatigued'}]})) as Record<Group,{score:number;status:'fresh'|'recovering'|'fatigued'}>;
}
export function summary(logs:WorkoutLog[],today:string){return {workouts:logs.length,streak:streak(logs,today),volume:round(logs.reduce((n,w)=>n+volume(w),0)),minutes:Math.round(logs.reduce((n,w)=>n+w.duration,0)/60),records:records(logs),weekly:weeklyVolumes(logs,today)}}
