import test from 'node:test';
import assert from 'node:assert/strict';
import {buildHomeWorkout,homeExercises,WorkoutTimer} from '../public/home-workout.mjs';
test('all routine choices fit their duration and require no equipment',()=>{
 for(const minutes of [10,15,20])for(const level of ['beginner','intermediate'])for(const focus of ['full','legs','core']){
  const routine=buildHomeWorkout({minutes,level,focus});assert.equal(routine.stages.reduce((s,v)=>s+v.seconds,0),minutes*60);
  assert.equal(routine.stages[0].kind,'warmup');assert.equal(routine.stages.at(-1).kind,'cooldown');
  for(const stage of routine.stages.filter(s=>s.exerciseId)){const e=homeExercises.find(e=>e.id===stage.exerciseId);assert(e);assert.equal(e.equipment,'none');assert(e.steps.length>=3);}
 }
 assert.throws(()=>buildHomeWorkout({minutes:12}));
});
test('clock pauses and resumes without counting paused time',()=>{
 const timer=new WorkoutTimer([{seconds:60},{seconds:30}]);timer.start(1000);timer.pause(11000);assert.equal(timer.snapshot(99000).secondsLeft,50);timer.start(99000);assert.equal(timer.snapshot(109000).secondsLeft,40);
});
test('clock catches up across multiple stages after backgrounding',()=>{
 const timer=new WorkoutTimer([{seconds:60},{seconds:30},{seconds:20}]);timer.start(1000);const state=timer.snapshot(96000);assert.equal(state.index,2);assert.equal(state.secondsLeft,15);assert.equal(state.elapsed,95);assert.equal(timer.snapshot(111000).status,'complete');
});
test('skip works while paused, reset stops the session, completion can restart',()=>{
 const timer=new WorkoutTimer([{seconds:60},{seconds:30}]);timer.start(0);timer.pause(10000);timer.skip(20000);assert.equal(timer.snapshot(50000).status,'paused');assert.equal(timer.snapshot(50000).secondsLeft,30);timer.reset();assert.equal(timer.snapshot().status,'idle');timer.start(0);timer.snapshot(90000);timer.start(100000);assert.equal(timer.snapshot(100000).secondsLeft,60);
});
test('pausing at a phase boundary does not lose or add a second',()=>{
 const timer=new WorkoutTimer([{seconds:2},{seconds:3}]);timer.start(0);timer.pause(2000);assert.equal(timer.snapshot(9000).index,1);assert.equal(timer.snapshot(9000).secondsLeft,3);timer.start(10000);assert.equal(timer.snapshot(13000).status,'complete');
});
