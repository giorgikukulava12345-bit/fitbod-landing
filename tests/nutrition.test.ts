import assert from 'node:assert/strict';
import test from 'node:test';
import {foods,foodCategories,portion,searchFoods,validMealEntries} from '../src/lib/nutrition.ts';
test('food directory has unique IDs, Georgian names and valid per-100g values',()=>{
 assert.ok(foods.length>=90);assert.equal(new Set(foods.map(f=>f.id)).size,foods.length);
 for(const food of foods){assert.match(food.name,/[ა-ჰ]/);assert.ok(food.category in foodCategories);for(const n of [food.kcal,food.protein,food.carbs,food.fat])assert.ok(Number.isFinite(n)&&n>=0);assert.ok(food.kcal<=900);assert.ok(food.protein+food.carbs+food.fat<=101)}
 for(const category of Object.keys(foodCategories))assert.ok(foods.some(f=>f.category===category));
});
test('Georgian search and category filters compose without mutating the directory',()=>{
 assert.equal(searchFoods('  ხინკალი  ').length,1);assert.equal(searchFoods('ხინკალი','fruit').length,0);assert.ok(searchFoods('','fruit').every(f=>f.category==='fruit'));assert.equal(searchFoods('არარსებული').length,0);
});
test('portion calculator scales all nutrients and guards invalid amounts',()=>{
 const food=foods.find(f=>f.name.startsWith('ქათმის მკერდი'))!;
 assert.equal(portion(food,150).kcal,247.5);assert.equal(portion(food,150).protein,46.5);assert.equal(portion(food,0).kcal,0);assert.equal(portion(food,-10).kcal,0);assert.equal(portion(food,NaN).kcal,0);assert.equal(portion(food,4000).kcal,food.kcal*30);
});
test('meal backup validation rejects unknown foods, duplicate IDs and unsafe quantities',()=>{
 const entry={id:'meal-1',foodId:foods[0].id,grams:150};assert.ok(validMealEntries([entry]));assert.ok(!validMealEntries([entry,entry]));assert.ok(!validMealEntries([{...entry,foodId:'unknown'}]));for(const grams of [0,-1,3001,Infinity,'150'])assert.ok(!validMealEntries([{...entry,grams}]));assert.ok(!validMealEntries(null));
});
