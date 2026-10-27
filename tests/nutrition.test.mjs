import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,createPlan,summarize,foods,recipes,costSummary} from '../public/nutrition.mjs';
const base={age:28,weight:75,height:175,sex:'male',activity:1.375,goal:'lose'};
test('goals relate correctly to maintenance',()=>{const a=calculate(base),b=calculate({...base,goal:'maintain'}),c=calculate({...base,goal:'gain'});assert(a.target<b.target);assert.equal(b.target,b.maintenance);assert(c.target>b.target);assert.throws(()=>calculate({...base,age:17}));assert.throws(()=>calculate({...base,age:NaN}));assert.throws(()=>calculate({...base,weight:40}));});
test('plan meets calorie target and budget without shrinking food',()=>{const plan=createPlan({target:2000,budget:120});assert.equal(plan.week.length,7);assert(plan.affordable);assert(plan.totals.cost<=120);for(const day of plan.week){assert(Math.abs(day.totals.kcal-2000)<15);assert.deepEqual(day.totals,summarize(day.meals.flatMap(m=>m.items)))}const low=createPlan({target:2000,budget:1});assert(!low.affordable);assert(low.week.every(d=>d.totals.kcal>1985));});
test('daily and weekly budgets are equivalent',()=>{assert.deepEqual(createPlan({target:2000,budget:20,days:1}),createPlan({target:2000,budget:140,days:7}));});
test('restrictions and editable prices are respected',()=>{const plan=createPlan({target:2000,budget:200,diet:'vegetarian',excluded:['dairy','nuts','egg']});for(const d of plan.week)for(const m of d.meals)for(const [id] of m.items)assert(!['meat','dairy','nuts','egg'].includes(foods.find(f=>f.id===id).tag));const changed=createPlan({target:2000,budget:200,prices:Object.fromEntries(foods.map(f=>[f.id,100]))});assert(changed.totals.cost>plan.totals.cost);assert.throws(()=>createPlan({target:2000,budget:0}));assert.throws(()=>createPlan({target:2000,budget:100,excluded:['dairy','egg','gluten','nuts']}));});
test('cost summary switches periods and follows the selected day and edited budget',()=>{
 const plan=createPlan({target:2153,budget:20,days:1});
 const daily=costSummary(plan,1,3),weekly=costSummary(plan,7,3);
 assert.equal(daily.cost,plan.week[3].totals.cost);
 assert.equal(daily.budget,20);
 assert.equal(weekly.cost,plan.totals.cost);
 assert.equal(weekly.budget,140);
 assert.equal(daily.remaining,20-daily.cost);
 const edited=createPlan({target:2153,budget:5,days:1});
 assert.equal(costSummary(edited,1).budget,5);
 assert.notEqual(costSummary(edited,1).remaining,costSummary(plan,1).remaining);
 assert.equal(costSummary(edited,1).label,'დღის სავარაუდო ღირებულება');
});
test('expanded Georgian-market recipes have valid food data and exclude fish for vegetarians',()=>{
 assert(foods.length>=35);
 assert.equal(new Set(foods.map(f=>f.id)).size,foods.length);
 for(const list of Object.values(recipes)){assert(list.length>=8);for(const recipe of list){assert(recipe.instruction);for(const [id,g] of recipe.items){assert(foods.some(f=>f.id===id));assert(g>0)}const stats=summarize(recipe.items);assert(stats.kcal>0&&stats.cost>0);}}
 const plan=createPlan({target:2200,budget:250,diet:'vegetarian'});
 for(const day of plan.week)for(const meal of day.meals)for(const [id] of meal.items)assert(!['meat','fish'].includes(foods.find(f=>f.id===id).tag));
});
