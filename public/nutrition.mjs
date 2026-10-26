// Per 100 g edible ingredient, dry grains/legumes and raw meat.
// Prices are editable estimates in GEL/kg, not live store quotes.
export const foods=[
 ['oats','შვრია',370,13,7,62,6,'gluten'],['rice','ბრინჯი',360,7,1,79,5,''],['buckwheat','წიწიბურა',343,13,3.4,71,7,''],['lentils','ოსპი',352,25,1,60,7,''],['beans','ლობიო',333,21,1,60,6,''],['chicken','ქათმის ფილე',120,23,2.6,0,18,'meat'],['egg','კვერცხი',143,12.6,9.5,0.7,12,'egg'],['yogurt','მაწონი',60,3.5,3.2,4.5,6,'dairy'],['curd','ხაჭო',100,17,3,2,16,'dairy'],['banana','ბანანი',89,1.1,.3,23,5,''],['apple','ვაშლი',52,.3,.2,14,3.5,''],['tomato','პომიდორი',18,.9,.2,3.9,5,''],['cucumber','კიტრი',15,.7,.1,3.6,4,''],['carrot','სტაფილო',41,.9,.2,10,2,''],['cabbage','კომბოსტო',25,1.3,.1,6,2,''],['oil','მცენარეული ზეთი',884,0,100,0,8,''],['walnut','ნიგოზი',654,15,65,14,25,'nuts'],['potato','კარტოფილი',77,2,.1,17,2.5,'']
].map(([id,name,kcal,p,f,c,price,tag])=>({id,name,kcal,p,f,c,price,tag}));
const meal=(name,items,instruction)=>({name,items,instruction});
export const recipes={
 breakfast:[meal('შვრიის ფაფა ბანანით',[['oats',80],['banana',120],['yogurt',150]],'შვრია მოხარშე წყალში. დაუმატე დაჭრილი ბანანი და მაწონი.'),meal('კვერცხი და წიწიბურა',[['egg',100],['buckwheat',70],['tomato',150]],'წიწიბურა მოხარშე. მიირთვი მოხარშულ კვერცხთან და პომიდორთან ერთად.'),meal('შვრია ვაშლითა და ნიგვზით',[['oats',85],['apple',180],['walnut',15]],'შვრია მოხარშე წყალში და დაუმატე ვაშლი და დაჭრილი ნიგოზი.'),meal('შვრიის ფაფა ვაშლით',[['oats',90],['apple',180]],'შვრია მოხარშე წყალში და დაუმატე დაჭრილი ვაშლი.')],
 lunch:[meal('ქათმისა და ბრინჯის თეფში',[['chicken',180],['rice',90],['cucumber',150],['tomato',150],['oil',10]],'ქათამი კარგად შეწვი ან მოხარშე. ბრინჯი მოხარშე; ბოსტნეულს დაუმატე ზეთი.'),meal('ოსპის თბილი ჯამი',[['lentils',110],['rice',50],['carrot',100],['tomato',150],['oil',10]],'ოსპი და ბრინჯი მოხარშე. სტაფილო და პომიდორი მოშუშე მითითებულ ზეთში და შეურიე.'),meal('ლობიო და ბოსტნეულის სალათი',[['beans',120],['potato',180],['cabbage',150],['oil',10]],'ლობიო წინასწარ დაალბე და სრულად მოხარშე. მიაყოლე მოხარშული კარტოფილი და კომბოსტოს სალათი.')],
 dinner:[meal('ქათამი წიწიბურით',[['chicken',150],['buckwheat',75],['cabbage',200],['oil',10]],'ქათამი სრულად მოამზადე. მიირთვი მოხარშულ წიწიბურასა და კომბოსტოს სალათთან.'),meal('ოსპისა და ბოსტნეულის წვნიანი',[['lentils',100],['potato',150],['carrot',100],['oil',10]],'ოსპი და ბოსტნეული მოხარშე წყალში დარბილებამდე. ბოლოს დაუმატე ზეთი.'),meal('ბოსტნეულის ომლეტი',[['egg',150],['potato',220],['tomato',150],['oil',8]],'კარტოფილი მოხარშე. პომიდორი მოშუშე ზეთში, დაუმატე კვერცხი და მოამზადე სრულად.')],
 snack:[meal('მაწონი და ვაშლი',[['yogurt',250],['apple',180]],'მაწონთან ერთად მიირთვი გარეცხილი ვაშლი.'),meal('ხაჭო და ბანანი',[['curd',150],['banana',150]],'ხაჭოს დაუმატე დაჭრილი ბანანი.'),meal('ვაშლი და ნიგოზი',[['apple',200],['walnut',25]],'მიირთვი ერთ წახემსებად.'),meal('ვაშლი და ბანანი',[['apple',200],['banana',180]],'გარეცხე ხილი, დაჭერი და მიირთვი.')]
};
export function calculate(profile){const {age,weight,height,sex,activity,goal}=profile;if(!Number.isFinite(age)||age<18||age>90||!Number.isFinite(weight)||weight<35||weight>250||!Number.isFinite(height)||height<130||height>220||!['male','female'].includes(sex)||![1.2,1.375,1.55,1.725].includes(activity)||!['lose','maintain','gain'].includes(goal))throw Error('შეამოწმე ასაკი (18–90), წონა (35–250) და სიმაღლე (130–220).');const maintenance=Math.round((10*weight+6.25*height-5*age+(sex==='male'?5:-161))*activity);const bmi=weight/(height/100)**2;if(goal==='lose'&&bmi<18.5)throw Error('ამ წონისა და სიმაღლისთვის კლების გეგმას ვერ შევადგენთ. აირჩიე შენარჩუნება ან მიმართე სპეციალისტს.');const target=Math.round(maintenance*({lose:.85,maintain:1,gain:1.1}[goal]));if(target<(sex==='male'?1500:1200))throw Error('გამოთვლილი მიზანი ძალიან დაბალია ავტომატური მენიუსთვის. მიმართე კვების სპეციალისტს.');return {maintenance,target,bmi};}
export function summarize(items,prices={}){return items.reduce((a,[id,g])=>{const food=foods.find(f=>f.id===id);for(const k of ['kcal','p','f','c'])a[k]+=food[k]*g/100;a.cost+=(prices[id]??food.price)*g/1000;return a},{kcal:0,p:0,f:0,c:0,cost:0});}
export function createPlan({target,budget,days=7,diet='all',excluded=[],prices={},seed=0}) {
  if (!Number.isFinite(target) || !Number.isFinite(budget) || target <= 0 || budget <= 0 || ![1,7].includes(days)) throw Error('მიუთითე დადებითი ბიუჯეტი.');
  const order=['breakfast','lunch','snack','dinner'];
  const allowed=order.map(type=>[type,recipes[type].filter(recipe=>recipe.items.every(([id])=>{
    const food=foods.find(f=>f.id===id);
    return !excluded.includes(food.tag) && !(diet==='vegetarian' && food.tag==='meat');
  }))]);
  if (allowed.some(([,list])=>!list.length)) throw Error('ამ შეზღუდვებით სრული მენიუ ვერ შედგა. შეცვალე კვების შეზღუდვები.');
  // Enumerate every available combination, rather than sampling and missing cheaper menus.
  const combinations=allowed.reduce((rows,[type,list])=>rows.flatMap(row=>list.map(recipe=>[...row,{type,...recipe}])) ,[[]]);
  const candidates=combinations.map(meals=>{
    const scale=target/summarize(meals.flatMap(m=>m.items),prices).kcal;
    const scaled=meals.map(m=>({...m,items:m.items.map(([id,g])=>[id,Math.round(g*scale)])}));
    return {meals:scaled,totals:summarize(scaled.flatMap(m=>m.items),prices)};
  });
  const affordable=candidates.filter(day=>day.totals.cost<=budget/days);
  const options=affordable.length?affordable:candidates.sort((a,b)=>a.totals.cost-b.totals.cost).slice(0,1);
  const week=Array.from({length:7},(_,day)=>options[((day+seed)*37)%options.length]);
  const totals=summarize(week.flatMap(d=>d.meals.flatMap(m=>m.items)),prices);
  return {week,totals,affordable:week.every(day=>day.totals.cost<=budget/days),budgetWeekly:budget/days*7};
}
