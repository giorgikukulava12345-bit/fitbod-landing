import assert from 'node:assert/strict';
import {test} from 'node:test';
import {exercises,starterItems,validItems,levelNames,muscleNames,equipmentNames} from '../src/lib/catalog.ts';
test('catalog has 120 unique bilingual exercises covering each level and muscle',()=>{
 assert.equal(exercises.length,120);assert.equal(new Set(exercises.map(e=>e.id)).size,120);
 for(const level of Object.keys(levelNames))assert.ok(exercises.filter(e=>e.level===level).length>=36);
 for(const muscle of Object.keys(muscleNames))assert.ok(exercises.filter(e=>e.muscle===muscle).length>=12);
 for(const e of exercises){assert.match(e.name_ka,/[ა-ჰ]/);assert.ok(e.equipment in equipmentNames);assert.ok(e.cue&&e.cue_ka)}
});
test('all starter routines contain five distinct real exercises and valid set values',()=>{
 for(const level of ['beginner','intermediate','advanced'] as const){const items=starterItems(level);assert.equal(items.length,5);assert.equal(new Set(items.map(i=>i.exerciseId)).size,5);assert.ok(validItems(items));}
});
test('workout validation rejects malformed or out-of-range drafts',()=>{
 const valid=starterItems('beginner');assert.equal(validItems(null),false);assert.equal(validItems({items:valid}),false);assert.equal(validItems([{...valid[0],exerciseId:'missing'}]),false);
 for(const bad of [{sets:0},{sets:11},{sets:1.5},{reps:0},{reps:301},{rest:-1},{rest:601},{unit:'unknown'}])assert.equal(validItems([{...valid[0],...bad}]),false);
 assert.equal(validItems(Array(41).fill(valid[0])),false);assert.equal(validItems(valid),true);
});
