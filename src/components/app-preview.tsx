'use client';
import { useState } from 'react';
import { Activity, ArrowUpRight, BatteryFull, ChevronDown, Dumbbell, Flame, Plus, Signal, Wifi } from 'lucide-react';
import { MuscleMap } from './muscle-map';
const workouts = [['Barbell Bench Press','4 sets · 8–10 reps','chest'],['Incline Dumbbell Press','3 sets · 10–12 reps','incline'],['Cable Chest Fly','3 sets · 12–15 reps','fly']];
function StatusBar(){return <div className="status-bar"><b>9:41</b><span><Signal size={12}/><Wifi size={12}/><BatteryFull size={17}/></span></div>}
export function AppPreview(){
  const [tab,setTab]=useState<'Front'|'Back'>('Front');
  const [started,setStarted]=useState(false);
  return <div className="preview-stage" aria-label="Interactive workout app preview">
    <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="stage-label"><span/> BUILT AROUND YOU</div>
    <div className="phone phone-recovery"><StatusBar/><div className="phone-content"><div className="flex items-center justify-between"><span className="phone-eyebrow">YOUR BODY, DECODED</span><Activity size={15}/></div><h3>Ready for your<br/>next best.</h3><p className="phone-muted">Muscle recovery</p><div className="map-switch">{(['Front','Back'] as const).map(t=><button key={t} onClick={()=>setTab(t)} aria-pressed={tab===t} className={tab===t?'selected':''}>{t}</button>)}</div><MuscleMap back={tab==='Back'}/><div className="recovery-key"><span><i/>Fresh</span><span><i/>Recovering</span><span><i/>Fatigued</span></div><div className="recovery-meter"><span>Overall recovery</span><b>86<span>%</span></b><div><i/></div></div></div><div className="home-indicator"/></div>
    <div className="phone phone-workout"><StatusBar/><div className="phone-content"><div className="flex items-center justify-between"><span className="phone-eyebrow">LET’S GET STRONGER</span><div className="mini-avatar">G</div></div><h3>Your next<br/><em>level starts here.</em></h3><div className="workout-heading"><b>Today’s workout <ChevronDown size={12}/></b><span>Upper body</span></div><div className="workout-stats"><span><Dumbbell size={13}/> 6 exercises</span><span><Flame size={13}/> 55–65 min</span></div><div className="exercise-list">{workouts.map(([name,reps,type],i)=><div className="exercise" key={name}><div className={`exercise-art ${type}`}><Dumbbell size={30}/><span>0{i+1}</span></div><div><b>{name}</b><p>{reps}</p></div><Plus size={13}/></div>)}</div><button className="phone-start" onClick={()=>setStarted(!started)}>{started?'Workout in progress · Pause':'Start workout'} <ArrowUpRight size={15}/></button><p className="phone-demo">Interactive product concept</p><div className="phone-tabs"><span className="active"><Dumbbell size={17}/>Workout</span><span><Activity size={17}/>Recovery</span><span><Flame size={17}/>Progress</span></div></div><div className="home-indicator"/></div>
    <div className="floating-note"><span className="note-icon"><Activity size={20}/></span><div><b>A plan that adapts.</b><p>Every workout. Every rep. You.</p></div><span className="note-check">✓</span></div>
  </div>
}
