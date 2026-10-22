import {type Exercise,type Level,type WorkoutItem,validItems} from './catalog.ts';
export type Place='home'|'gym';
export type Category='full'|'abs'|'chest'|'arms'|'legs'|'back';
export const categories:Record<Category,string>={full:'მთელი სხეული',abs:'პრესი',chest:'მკერდი',arms:'მკლავები',legs:'ფეხები',back:'ზურგი'};
export const places:Record<Place,string>={home:'სახლში',gym:'დარბაზში'};
const apparatus=new Set(['chair-squat','low-step-up','incline-push-up','assisted-pull-up','inverted-row','pull-up','archer-pull-up','muscle-up','chest-dip','chin-up','hanging-leg-raise','dragon-flag','sliding-leg-curl','nordic-hamstring-curl']);
export const isHome=(e:Exercise)=>e.equipment==='bodyweight'&&!apparatus.has(e.id);
export const matchesPlace=(e:Exercise,place:Place)=>place==='home'?isHome(e):!isHome(e);
export function categoryMatch(e:Exercise,category:Category){
 if(category==='abs')return e.muscle==='core';
 if(category==='chest')return e.muscle==='chest';
 if(category==='arms')return ['arms','shoulders'].includes(e.muscle)||/push-up|chest-press|bench-press/.test(e.id);
 if(category==='legs')return ['quads','hamstrings','glutes'].includes(e.muscle);
 if(category==='back')return e.muscle==='back'||['bird-dog','bodyweight-good-morning'].includes(e.id);
 return e.muscle==='cardio'||/squat|lunge|burpee|bear-crawl|farmer-carry|thruster|deadlift/.test(e.id);
}
export type PlanDay={day:number;week:number;weekday:string;title:string;kind:'strength'|'conditioning'|'recovery'|'rest';minutes:number;items:WorkoutItem[];note:string};
const weekDays=['ორშაბათი','სამშაბათი','ოთხშაბათი','ხუთშაბათი','პარასკევი','შაბათი','კვირა'];
export function buildPlan(place:Place,level:Level):PlanDay[]{
 const home:Record<Level,string[][]>={
 beginner:[['bodyweight-squat','wall-push-up','prone-y-raise','glute-bridge'],['march-in-place','dead-bug','heel-tap'],['bodyweight-reverse-lunge','bodyweight-good-morning','standing-calf-raise','glute-bridge'],[],['wall-push-up','prone-y-raise','scapular-push-up','bird-dog'],['step-jack','forearm-plank','seated-knee-tuck'],[]],
 intermediate:[['bodyweight-squat','push-up','lateral-lunge','bear-crawl'],['jumping-jack','mountain-climber','reverse-crunch'],['bodyweight-forward-lunge','lateral-lunge','bodyweight-good-morning','glute-bridge'],[],['push-up','reverse-snow-angel','scapular-push-up','side-plank'],['high-knees','bear-crawl','reverse-crunch'],[]],
 advanced:[['pistol-squat','archer-push-up','single-leg-hip-thrust','hollow-body-hold'],['burpee','mountain-climber','hollow-body-hold'],['pistol-squat','single-leg-hip-thrust','bodyweight-split-squat','standing-calf-raise'],[],['diamond-push-up','pike-push-up','reverse-snow-angel','side-plank'],['burpee','high-knees','bear-crawl'],[]],
 };
 const gym:Record<Level,string[][]>={
 beginner:[['leg-extension','machine-chest-press','seated-cable-row','seated-leg-curl'],['stationary-bike','dead-bug','heel-tap'],['leg-extension','seated-leg-curl','bodyweight-squat','band-lateral-walk'],[],['machine-chest-press','lat-pulldown','dumbbell-biceps-curl','cable-triceps-pushdown'],['elliptical-trainer','bird-dog','forearm-plank'],[]],
 intermediate:[['goblet-squat','barbell-bench-press','one-arm-dumbbell-row','dumbbell-romanian-deadlift'],['rowing-ergometer','pallof-press','reverse-crunch'],['leg-press','barbell-romanian-deadlift','barbell-hip-thrust','dumbbell-walking-lunge'],[],['barbell-bench-press','bent-over-barbell-row','arnold-press','barbell-curl'],['rowing-ergometer','dumbbell-farmer-carry','pallof-press'],[]],
 advanced:[['barbell-front-squat','pull-up','barbell-overhead-press','barbell-romanian-deadlift'],['kettlebell-swing','hanging-leg-raise','pallof-press'],['barbell-back-squat','bulgarian-split-squat','barbell-sumo-deadlift','seated-leg-curl'],[],['pull-up','incline-barbell-press','barbell-push-press','close-grip-bench-press'],['dumbbell-thruster','dumbbell-farmer-carry','hanging-leg-raise'],[]],
 };
 const schedule=place==='home'?home[level]:gym[level];
 return Array.from({length:28},(_,index)=>{
  const week=Math.floor(index/7)+1,slot=index%7;const kind=slot===6?'rest':slot===3?'recovery':slot===1||slot===5?'conditioning':'strength';
  const sets=week===1?2:week===4?2:3;
  const titles=['მთელი სხეულის ძალა','პრესი და ენერგია','ფეხები და სტაბილურობა','აქტიური აღდგენა','ზედა სხეულის ძალა','მოძრაობა და გამძლეობა','დასვენება'];
  const items=schedule[slot].map(exerciseId=>{const timed=/plank|hold|bike|ergometer|elliptical|march|jack|climber|knees|crawl|carry/.test(exerciseId);return {exerciseId,sets,reps:timed?(week===3?40:30):(week===3?12:10),rest:kind==='conditioning'?60:90,unit:timed?'seconds' as const:'reps' as const}});
  return {day:index+1,week,weekday:weekDays[slot],title:titles[slot],kind,minutes:kind==='rest'?0:kind==='recovery'?15:kind==='conditioning'?20:25+sets*5,items,note:kind==='rest'?'დაიტოვე დრო დასვენებისთვის. სურვილისამებრ გაისეირნე მსუბუქად.':kind==='recovery'?'აირჩიე მსუბუქი სიარული და კომფორტული მობილობის მოძრაობები. დღეს ინტენსიური სესია დაგეგმილი არ არის.':week===4?'შემაჯამებელი კვირა: იმოძრავე კონტროლით და შეინარჩუნე ტექნიკა.':'დაიწყე მსუბუქი გახურებით. სირთულე და დატვირთვა მოარგე შენს შესაძლებლობებს.'};
 });
}
export type LocalRoutine={id:string;name:string;level:Level;place:Place;items:WorkoutItem[];updated_at:string};
export function validRoutine(value:unknown):value is LocalRoutine{if(!value||typeof value!=='object')return false;const r=value as LocalRoutine;return typeof r.id==='string'&&r.id.length<=100&&typeof r.name==='string'&&r.name.trim().length>0&&r.name.length<=80&&['beginner','intermediate','advanced'].includes(r.level)&&['home','gym'].includes(r.place)&&validItems(r.items)&&r.items.length>0&&typeof r.updated_at==='string'&&!Number.isNaN(Date.parse(r.updated_at));}
export function parseRoutineFile(text:string):LocalRoutine[]{const data=JSON.parse(text);if(data.version!==1||!Array.isArray(data.routines)||data.routines.length>100||!data.routines.every(validRoutine))throw new Error('ფაილის ფორმატი არასწორია. გამოიყენე Giofitness-იდან გატანილი JSON ფაილი.');if(new Set(data.routines.map((r:LocalRoutine)=>r.id)).size!==data.routines.length)throw new Error('ფაილში რუტინების კოდები მეორდება.');return data.routines;}
