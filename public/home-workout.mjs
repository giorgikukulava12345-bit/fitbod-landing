// Every movement uses body weight and floor space only: no furniture, weights or bands.
const exercise=(id,name,area,steps,easier)=>({id,name,area,steps,easier,equipment:'none'});
export const homeExercises=[
 exercise('march','ადგილზე ნაბიჯი','გახურება და გამძლეობა',['დადექი გამართულად და მოდუნებულად.','ადგილზე გადადგი მონაცვლე ნაბიჯები და მსუბუქად ამოძრავე ხელები.','ისუნთქე თავისუფლად; ტემპი შენს შესაძლებლობას მოარგე.'],'შეამცირე ტემპი და მუხლების აწევის სიმაღლე.'),
 exercise('squat','ჩაჯდომა','ფეხები და დუნდულები',['ტერფები მხრების სიგანეზე დადგი.','მენჯი უკან და ქვემოთ წაიღე; მუხლები ტერფების მიმართულებით ამოძრავე.','ქუსლები იატაკზე შეინარჩუნე და კონტროლით წამოდექი.'],'ჩაჯექი ნაკლებ სიღრმეზე.'),
 exercise('knee-pushup','აზიდვა მუხლებზე დაყრდნობით','მკერდი და მკლავები',['ხელისგულები მხრების ქვეშ მოათავსე და დაეყრდენი მუხლებს.','თავიდან მუხლებამდე ტანი ერთ ხაზზე შეინარჩუნე.','იდაყვები ნელა მოხარე და ხელისგულებზე დაყრდნობით ისევ აიწიე.'],'შეამცირე დაშვების სიღრმე ან დაისვენე.'),
 exercise('pushup','აზიდვა','მკერდი, მკლავები და ტანი',['ხელისგულები მხრების ქვეშ მოათავსე; დაეყრდენი ტერფის წვერებს.','დაჭიმე მუცელი და წელი არ ჩაზნიქო.','მკერდი ნელა მიუახლოვე იატაკს, შემდეგ საწყის პოზიციაში დაბრუნდი.'],'დაეყრდენი მუხლებს.'),
 exercise('bridge','მენჯის აწევა','დუნდულები და ბარძაყის უკანა ნაწილი',['დაწექი ზურგზე, მუხლები მოხარე და ტერფები იატაკზე დადგი.','დუნდულები დაჭიმე და მენჯი ნელა ასწიე.','წელი ზედმეტად არ გადაზნიქო; მენჯი კონტროლით დაუშვი.'],'მენჯი ნაკლებ სიმაღლეზე ასწიე.'),
 exercise('bird-dog','ხელისა და საპირისპირო ფეხის გაშლა','ზურგი და ტანის სტაბილურობა',['დადექი ოთხზე: ხელები მხრების, მუხლები მენჯის ქვეშ.','ერთი ხელი და საპირისპირო ფეხი ნელა გაშალე ისე, რომ მენჯი არ შემობრუნდეს.','დაბრუნდი საწყის პოზიციაში და შეცვალე მხარე.'],'ერთ ჯერზე მხოლოდ ხელი ან მხოლოდ ფეხი გაშალე.'),
 exercise('dead-bug','ხელისა და ფეხის მონაცვლე დაშვება','მუცლის კუნთები',['დაწექი ზურგზე, ხელები ზემოთ ასწიე და მუხლები მოხარე.','საპირისპირო ხელი და ფეხი ნელა დაუშვი, წელის აწევის გარეშე.','დააბრუნე საწყის პოზიციაში და შეცვალე მხარე.'],'ფეხი ბოლომდე არ გაშალო; ქუსლი მსუბუქად მიადე იატაკს.'),
 exercise('reverse-lunge','უკან გადაბიჯება და ჩაჯდომა','ფეხები და წონასწორობა',['დადექი ტერფებით მენჯის სიგანეზე.','ერთი ფეხით უკან გადადგი ნაბიჯი და ორივე მუხლი კომფორტულად მოხარე.','წინა ტერფზე დაყრდნობით დაბრუნდი და შეცვალე ფეხი.'],'უკან გადადგი პატარა ნაბიჯი და ნაკლებად ჩაიწიე.'),
 exercise('side-leg','ფეხის გვერდზე აწევა','დუნდულები და წონასწორობა',['დადექი გამართულად და წონა ერთ ტერფზე გადაიტანე.','მეორე ფეხი გვერდზე ნელა ასწიე, ტანის გადახრის გარეშე.','ფეხი დაუშვი და ყოველ გამეორებაზე შეცვალე მხარე.'],'ფეხი ნაკლებად ასწიე; წონასწორობის დაკარგვისას შეჩერდი.'),
 exercise('calf-raise','ქუსლების აწევა','წვივები',['ტერფები მენჯის სიგანეზე დადგი.','ქუსლები ნელა ასწიე და ტერფის წინა ნაწილს დაეყრდენი.','ქუსლები იატაკზე ნელა დააბრუნე.'],'შეამცირე აწევის სიმაღლე და ტემპი.'),
 exercise('knee-plank','პლანკა მუხლებზე დაყრდნობით','მუცელი და ტანის სტაბილურობა',['დაეყრდენი წინამხრებსა და მუხლებს; იდაყვები მხრების ქვეშ მოათავსე.','თავიდან მუხლებამდე ტანი ერთ ხაზზე შეინარჩუნე.','ისუნთქე თავისუფლად და წელი არ ჩაზნიქო.'],'შეასრულე მოკლე მონაკვეთებად და საჭიროებისას დაისვენე.'),
 exercise('plank','პლანკა წინამხრებზე','მუცელი და ტანის სტაბილურობა',['დაეყრდენი წინამხრებსა და ტერფის წვერებს.','თავი, ტანი და ფეხები ერთ ხაზზე შეინარჩუნე.','ისუნთქე თავისუფლად; წელი არ ჩაზნიქო და მენჯი ზედმეტად არ ასწიო.'],'მუხლები იატაკზე დაუშვი.'),
 exercise('climber','მუხლების მონაცვლე მოზიდვა','ტანი და გამძლეობა',['დაეყრდენი ხელისგულებსა და ტერფის წვერებს, როგორც აზიდვის საწყის პოზიციაში.','ერთი მუხლი ნელა მოიზიდე მკერდისკენ და უკან დააბრუნე.','შეცვალე ფეხი; მოძრაობა შეასრულე ნახტომის გარეშე.'],'აირჩიე ნელი ტემპი ან ადგილზე ნაბიჯით ჩაანაცვლე.'),
 exercise('snow-angel','ხელების რკალით მოძრაობა მუცელზე წოლისას','ზურგი და მხრები',['დაწექი მუცელზე და კისერი ნეიტრალურად შეინარჩუნე.','ხელები იატაკიდან ოდნავ ასწიე და გვერდებიდან თავისკენ გაატარე.','კონტროლით დააბრუნე უკან; წელი ზედმეტად არ გადაზნიქო.'],'ხელები ნაკლებ სიმაღლეზე ასწიე და მოძრაობის დიაპაზონი შეამცირე.')
];
const routines={
 beginner:{full:['march','squat','knee-pushup','bridge','bird-dog','knee-plank'],legs:['squat','side-leg','bridge','calf-raise','reverse-lunge','march'],core:['dead-bug','bird-dog','knee-plank','bridge','march','dead-bug']},
 intermediate:{full:['squat','pushup','reverse-lunge','climber','plank','snow-angel'],legs:['reverse-lunge','squat','bridge','calf-raise','side-leg','march'],core:['plank','dead-bug','climber','bird-dog','snow-angel','bridge']}
};
export function buildHomeWorkout({minutes=10,level='beginner',focus='full'}={}){
 if(![10,15,20].includes(minutes)||!routines[level]?.[focus])throw Error('აირჩიე ხანგრძლივობა, დონე და მიმართულება.');
 const ids=routines[level][focus],workSeconds=level==='beginner'?30:40;
 const slots=minutes-2;
 const stages=[{kind:'warmup',seconds:60,exerciseId:'march',title:'გახურება — მსუბუქი ნაბიჯი ადგილზე'}];
 for(let i=0;i<slots;i++){
  stages.push({kind:'work',seconds:workSeconds,exerciseId:ids[i%ids.length],interval:i+1,total:slots,title:homeExercises.find(e=>e.id===ids[i%ids.length]).name});
  stages.push({kind:'rest',seconds:60-workSeconds,nextExerciseId:i+1<slots?ids[(i+1)%ids.length]:null,title:'დასვენება'});
 }
 stages.push({kind:'cooldown',seconds:60,exerciseId:'march',title:'დასრულება — ნელი ნაბიჯი და მშვიდი სუნთქვა'});
 return {stages,exerciseIds:[...new Set(ids)],totalSeconds:minutes*60,workSeconds,restSeconds:60-workSeconds,intervals:slots};
}
// Absolute deadlines keep the clock accurate after backgrounding the tab.
export class WorkoutTimer{
 constructor(stages){if(!Array.isArray(stages)||!stages.length||stages.some(s=>!(s.seconds>0)))throw Error('Invalid stages');this.stages=stages;this.reset();}
 reset(){this.status='idle';this.index=0;this.remaining=this.stages[0].seconds*1000;this.deadline=0;}
 start(now=Date.now()){if(this.status==='running')return;if(this.status==='complete')this.reset();this.deadline=now+this.remaining;this.status='running';}
 pause(now=Date.now()){this.snapshot(now);if(this.status==='running'){this.remaining=Math.max(0,this.deadline-now);this.status='paused';}}
 skip(now=Date.now()){if(!['running','paused'].includes(this.status))return;this.snapshot(now);if(this.status==='complete')return;if(++this.index>=this.stages.length){this.status='complete';this.remaining=0;return;}this.remaining=this.stages[this.index].seconds*1000;if(this.status==='running')this.deadline=now+this.remaining;}
 snapshot(now=Date.now()){
  if(this.status==='running'){
   while(now>=this.deadline){if(++this.index>=this.stages.length){this.status='complete';this.remaining=0;break;}this.deadline+=this.stages[this.index].seconds*1000;}
   if(this.status==='running')this.remaining=Math.max(0,this.deadline-now);
  }
  const done=this.status==='complete',stage=done?null:this.stages[this.index];
  const elapsed=done?this.stages.reduce((s,v)=>s+v.seconds,0):this.stages.slice(0,this.index).reduce((s,v)=>s+v.seconds,0)+(stage.seconds-this.remaining/1000);
  return {status:this.status,index:this.index,stage,secondsLeft:Math.ceil(this.remaining/1000),elapsed};
 }
}
