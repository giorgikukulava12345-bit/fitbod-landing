import assert from 'node:assert/strict';
import {test} from 'node:test';
import {exercises,validItems} from '../src/lib/catalog.ts';
import {buildPlan,categories,categoryMatch,isHome,matchesPlace,parseRoutineFile,type LocalRoutine} from '../src/lib/program.ts';
import {getDetail} from '../src/lib/exercise-details.ts';
test('six program variants contain 28 unique sequential days, recovery and real exercises',()=>{
 for(const place of ['home','gym']as const)for(const level of ['beginner','intermediate','advanced']as const){const plan=buildPlan(place,level);assert.equal(plan.length,28);assert.deepEqual(plan.map(d=>d.day),Array.from({length:28},(_,i)=>i+1));for(const week of [1,2,3,4]){const days=plan.filter(d=>d.week===week);assert.equal(days.length,7);assert.equal(days.filter(d=>d.kind==='rest').length,1);assert.equal(days.filter(d=>d.kind==='recovery').length,1);}for(const day of plan){assert.ok(validItems(day.items));if(place==='home')for(const item of day.items)assert.ok(isHome(exercises.find(e=>e.id===item.exerciseId)!));}}
});
test('home and gym catalogs cover every exercise without misclassifying pull-up apparatus',()=>{
 const home=exercises.filter(e=>matchesPlace(e,'home')),gym=exercises.filter(e=>matchesPlace(e,'gym'));assert.equal(home.length+gym.length,exercises.length);assert.ok(home.every(e=>e.equipment==='bodyweight'));assert.ok(!home.some(e=>e.id==='pull-up'));for(const category of Object.keys(categories)as (keyof typeof categories)[]){assert.ok(home.some(e=>categoryMatch(e,category)));assert.ok(gym.some(e=>categoryMatch(e,category)));}
});
test('every exercise has Georgian steps, benefit, muscles and an honest empty video slot',()=>{
 for(const e of exercises){const detail=getDetail(e);assert.equal(detail.steps.length,4);assert.ok(detail.steps.every(step=>/[ა-ჰ]/.test(step)));assert.match(detail.benefit,/[ა-ჰ]/);assert.match(detail.primary,/[ა-ჰ]/);assert.ok(detail.secondary.length);assert.equal(detail.videoUrl,null);assert.notEqual(detail.pattern,'cardio',e.id+' needs a specific movement family');}
});
test('routine file import validates content without replacing the original collection',()=>{
 const routine:LocalRoutine={id:'test-routine',name:'ჩემი რუტინა',place:'home',level:'beginner',items:buildPlan('home','beginner')[0].items,updated_at:'2026-10-22T12:00:00Z'};const exported=JSON.stringify({version:1,routines:[routine]});assert.deepEqual(parseRoutineFile(exported),[routine]);assert.throws(()=>parseRoutineFile('{"version":2,"routines":[]}'));assert.throws(()=>parseRoutineFile(JSON.stringify({version:1,routines:[{...routine,items:[{exerciseId:'invalid'}]}]})));assert.throws(()=>parseRoutineFile(JSON.stringify({version:1,routines:[routine,routine]})));assert.throws(()=>parseRoutineFile('{"version":1,"routines":null}'));
});
