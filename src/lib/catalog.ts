export type Language='en'|'ka';
export type Level='beginner'|'intermediate'|'advanced';
export type Muscle='chest'|'back'|'shoulders'|'quads'|'hamstrings'|'glutes'|'arms'|'core'|'cardio';
export type Equipment='bodyweight'|'dumbbell'|'barbell'|'machine'|'cable'|'band'|'kettlebell';
export type Exercise={id:string;name:string;name_ka:string;muscle:Muscle;level:Level;equipment:Equipment;cue:string;cue_ka:string};
export const levelNames:Record<Level,[string,string]>={beginner:['Beginner','დამწყები'],intermediate:['Intermediate','საშუალო'],advanced:['Advanced','მოწინავე']};
export const muscleNames:Record<Muscle,[string,string]>={chest:['Chest','მკერდი'],back:['Back','ზურგი'],shoulders:['Shoulders','მხრები'],quads:['Quadriceps','ბარძაყის წინა მხარე'],hamstrings:['Hamstrings','ბარძაყის უკანა მხარე'],glutes:['Glutes','დუნდულები'],arms:['Arms','მკლავები'],core:['Core','პრესის კუნთები'],cardio:['Conditioning','კონდიცია']};
export const equipmentNames:Record<Equipment,[string,string]>={bodyweight:['Bodyweight','საკუთარი წონა'],dumbbell:['Dumbbell','ჰანტელი'],barbell:['Barbell','შტანგა'],machine:['Machine','ტრენაჟორი'],cable:['Cable','ბლოკი'],band:['Resistance band','რეზინი'],kettlebell:['Kettlebell','გირი']};
export const localName=(names:[string,string],lang:Language)=>names[lang==='ka'?1:0];
// Each muscle group has four beginner, four intermediate and four advanced exercises.
// Format: English name | Georgian name | equipment. Stable IDs are derived from English names.
const groups:Record<Muscle,string>={
chest:`Wall Push-up|კედელზე აზიდვა|bodyweight
Incline Push-up|შემაღლებაზე აზიდვა|bodyweight
Knee Push-up|მუხლებზე აზიდვა|bodyweight
Machine Chest Press|მკერდის პრესი ტრენაჟორზე|machine
Dumbbell Floor Press|ჰანტელების პრესი იატაკზე|dumbbell
Push-up|აზიდვა|bodyweight
Barbell Bench Press|შტანგის წოლჭიმი|barbell
Cable Chest Fly|მკერდის გაშლა ბლოკზე|cable
Incline Barbell Press|შტანგის პრესი დახრილ სკამზე|barbell
Chest Dip|ჩაჯდომა ორძელზე მკერდისთვის|bodyweight
Archer Push-up|მშვილდოსნის აზიდვა|bodyweight
Plyometric Push-up|ფეთქებადი აზიდვა|bodyweight`,
back:`Band Row|მოქაჩვა რეზინით|band
Seated Cable Row|მოქაჩვა ბლოკზე ჯდომით|cable
Lat Pulldown|ზედა ბლოკის ჩამოქაჩვა|machine
Assisted Pull-up|აზიდვა დამხმარე ტრენაჟორით|machine
Chest-supported Dumbbell Row|ჰანტელების მოქაჩვა მკერდის საყრდენით|dumbbell
One-arm Dumbbell Row|ჰანტელის მოქაჩვა ერთი ხელით|dumbbell
Bent-over Barbell Row|შტანგის მოქაჩვა დახრით|barbell
Inverted Row|ჰორიზონტალური აზიდვა|bodyweight
Pull-up|ტურნიკზე აზიდვა|bodyweight
Pendlay Row|პენდლის მოქაჩვა|barbell
Archer Pull-up|აზიდვა ხელის გვერდზე გაშლით|bodyweight
Muscle-up|ძალით ასვლა ტურნიკზე|bodyweight`,
shoulders:`Band Pull-apart|რეზინის გაშლა|band
Seated Dumbbell Press|ჰანტელების პრესი ჯდომით|dumbbell
Machine Shoulder Press|მხრების პრესი ტრენაჟორზე|machine
Dumbbell Lateral Raise|ჰანტელების გვერდზე აწევა|dumbbell
Dumbbell Front Raise|ჰანტელების წინ აწევა|dumbbell
Face Pull|ბლოკის სახისკენ მოქაჩვა|cable
Arnold Press|არნოლდის პრესი|dumbbell
Reverse Dumbbell Fly|ჰანტელების უკუგაშლა|dumbbell
Barbell Overhead Press|შტანგის თავსზემოთ პრესი|barbell
Pike Push-up|აზიდვა აწეული მენჯით|bodyweight
Barbell Push Press|შტანგის პრესი ბიძგით|barbell
Wall Handstand Push-up|კედელთან ხელზე დგომით აზიდვა|bodyweight`,
quads:`Chair Squat|სკამზე ჩაჯდომა|bodyweight
Bodyweight Squat|ჩაჯდომა საკუთარი წონით|bodyweight
Wall Sit|კედელთან ჩაჯდომის დაჭერა|bodyweight
Leg Extension|ფეხის გაშლა ტრენაჟორზე|machine
Low Step-up|დაბალ საფეხურზე ასვლა|bodyweight
Goblet Squat|გობლეტ ჩაჯდომა|dumbbell
Leg Press|ფეხის პრესი|machine
Dumbbell Walking Lunge|ნაბიჯით ლანჯი ჰანტელებით|dumbbell
Barbell Back Squat|ჩაჯდომა შტანგით ზურგზე|barbell
Barbell Front Squat|ჩაჯდომა შტანგით წინ|barbell
Pistol Squat|ჩაჯდომა ერთ ფეხზე|bodyweight
Overhead Squat|ჩაჯდომა შტანგით თავს ზემოთ|barbell`,
hamstrings:`Standing Band Leg Curl|ფეხის მოხრა რეზინით დგომით|band
Seated Leg Curl|ფეხის მოხრა ჯდომით|machine
Lying Leg Curl|ფეხის მოხრა წოლით|machine
Bodyweight Good Morning|დახრა საკუთარი წონით|bodyweight
Heel-dig Bridge|ხიდი ქუსლებზე დაყრდნობით|bodyweight
Dumbbell Romanian Deadlift|რუმინული ამოწევა ჰანტელებით|dumbbell
Barbell Romanian Deadlift|რუმინული ამოწევა შტანგით|barbell
Single-leg Romanian Deadlift|რუმინული ამოწევა ერთ ფეხზე|dumbbell
Sliding Leg Curl|ფეხის მოხრა სრიალით|bodyweight
Nordic Hamstring Curl|ნორდიკული მოხრა|bodyweight
Barbell Good Morning|დახრა შტანგით|barbell
Snatch-grip Romanian Deadlift|რუმინული ამოწევა ფართო მოჭიდებით|barbell`,
glutes:`Glute Bridge|დუნდულების ხიდი|bodyweight
Clamshell|მუხლების გვერდზე გაშლა|bodyweight
Band Lateral Walk|გვერდზე სიარული რეზინით|band
Donkey Kick|ფეხის უკან აწევა ოთხზე დგომით|bodyweight
Standing Hip Abduction|ფეხის გვერდზე გაწევა|band
Barbell Hip Thrust|მენჯის აწევა შტანგით|barbell
Dumbbell Sumo Squat|სუმო ჩაჯდომა ჰანტელით|dumbbell
Reverse Lunge|უკან ლანჯი|dumbbell
Cable Pull-through|ბლოკის მოქაჩვა ფეხებს შორის|cable
Bulgarian Split Squat|ბულგარული ჩაჯდომა|dumbbell
Single-leg Hip Thrust|მენჯის აწევა ერთ ფეხზე|bodyweight
Barbell Sumo Deadlift|სუმო ამოწევა შტანგით|barbell`,
arms:`Dumbbell Biceps Curl|ბიცეფსის მოხრა ჰანტელებით|dumbbell
Hammer Curl|ჩაქუჩისებრი მოხრა|dumbbell
Cable Triceps Pushdown|ტრიცეფსის გაშლა ბლოკზე|cable
Band Biceps Curl|ბიცეფსის მოხრა რეზინით|band
Dumbbell Triceps Kickback|ტრიცეფსის გაშლა უკან ჰანტელით|dumbbell
Barbell Curl|ბიცეფსის მოხრა შტანგით|barbell
Incline Dumbbell Curl|მოხრა დახრილ სკამზე|dumbbell
Overhead Triceps Extension|ტრიცეფსის გაშლა თავს უკან|dumbbell
Cable Rope Hammer Curl|ჩაქუჩისებრი მოხრა ბლოკზე|cable
Close-grip Bench Press|წოლჭიმი ვიწრო მოჭიდებით|barbell
Chin-up|ტურნიკზე აზიდვა შებრუნებული მოჭიდებით|bodyweight
Diamond Push-up|აზიდვა ვიწრო ხელებით|bodyweight`,
core:`Dead Bug|საპირისპირო ხელ-ფეხის გაშლა წოლით|bodyweight
Bird Dog|საპირისპირო ხელ-ფეხის გაშლა ოთხზე|bodyweight
Forearm Plank|პლანკა იდაყვებზე|bodyweight
Knee Side Plank|გვერდითი პლანკა მუხლებზე|bodyweight
Heel Tap|ქუსლზე შეხება|bodyweight
Side Plank|გვერდითი პლანკა|bodyweight
Reverse Crunch|უკუ პრესი|bodyweight
Pallof Press|პალოფის პრესი|cable
Dumbbell Farmer Carry|სიარული ჰანტელებით|dumbbell
Hanging Leg Raise|ფეხების აწევა დაკიდებით|bodyweight
Hollow Body Hold|ტანის დაჭერა გაშლილი კიდურებით|bodyweight
Dragon Flag|დრაკონის დროშა|bodyweight`,
cardio:`March in Place|ადგილზე სიარული|bodyweight
Step Jack|გვერდზე ნაბიჯი ხელების აწევით|bodyweight
Stationary Bike|ველოტრენაჟორი|machine
Elliptical Trainer|ელიფსური ტრენაჟორი|machine
Low-impact Mountain Climber|ნელი მთამსვლელი|bodyweight
Jumping Jack|ხტომა ხელ-ფეხის გაშლით|bodyweight
Mountain Climber|მთამსვლელი|bodyweight
Rowing Ergometer|ნიჩბოსნობის ტრენაჟორი|machine
Kettlebell Swing|გირის ქნევა|kettlebell
Burpee|ბერპირი|bodyweight
Dumbbell Thruster|ჩაჯდომა ჰანტელების პრესით|dumbbell
Kettlebell Snatch|გირის ატაცი|kettlebell`
};
const cues:Record<Muscle,[string,string]>={chest:['Keep your shoulders stable and your torso controlled. Use a comfortable range without bouncing.','მხრები სტაბილურად გეჭიროთ და აკონტროლეთ ტანი. იმოძრავეთ კომფორტულ დიაპაზონში, ინერციის გარეშე.'],back:['Brace your trunk and keep your neck neutral. Pull with control and return slowly.','დაჭიმეთ ტანის კუნთები და შეინარჩუნეთ კისრის ნეიტრალური პოზიცია. მოქაჩეთ კონტროლით და ნელა დაბრუნდით.'],shoulders:['Keep your ribs controlled and avoid shrugging. Move through a comfortable range without swinging.','აკონტროლეთ ტანი და არ ასწიოთ მხრები ყურებთან. იმოძრავეთ კომფორტულ დიაპაზონში, ქნევის გარეშე.'],quads:['Keep your knees tracking in line with your feet. Lower with control and keep your feet stable.','მუხლები ტერფების მიმართულებით ამოძრავეთ. დაეშვით კონტროლით და მყარად დაეყრდენით ტერფებს.'],hamstrings:['Control the movement and keep your back neutral. Reduce your range if you cannot maintain your position.','აკონტროლეთ მოძრაობა და ზურგის ნეიტრალური პოზიცია. შეამცირეთ დიაპაზონი, თუ პოზიციას ვეღარ ინარჩუნებთ.'],glutes:['Keep your pelvis stable and drive through your feet. Avoid overextending your lower back.','შეინარჩუნეთ მენჯის სტაბილურობა და დაეყრდენით ტერფებს. მოძრაობის ბოლოს არ გადახაროთ წელი.'],arms:['Keep your elbows controlled and avoid swinging your torso. Move slowly through a comfortable range.','აკონტროლეთ იდაყვები და არ აქანაოთ ტანი. იმოძრავეთ ნელა, კომფორტულ დიაპაზონში.'],core:['Brace your trunk and breathe steadily. End the set when you cannot maintain a controlled position.','დაჭიმეთ ტანის კუნთები და ისუნთქეთ თანაბრად. შეწყვიტეთ სერია, როცა პოზიციას ვეღარ აკონტროლებთ.'],cardio:['Start at a manageable pace and control your movement. Rest between efforts as needed.','დაიწყეთ თქვენთვის მისაღები ტემპით და აკონტროლეთ მოძრაობა. საჭიროებისამებრ დაისვენეთ.']};
export const exercises:Exercise[]=Object.entries(groups).flatMap(([group,rows])=>rows.split('\n').map((row,index)=>{const [name,name_ka,equipment]=row.split('|');const muscle=group as Muscle;return {id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),name,name_ka,muscle,level:(['beginner','intermediate','advanced'] as const)[Math.floor(index/4)],equipment:equipment as Equipment,cue:cues[muscle][0],cue_ka:cues[muscle][1]}}));
export type WorkoutItem={exerciseId:string;sets:number;reps:number;rest:number;unit:'reps'|'seconds'};
export type Workout={id:string;user_id:string;name:string;level:Level;items:WorkoutItem[];updated_at:string};
export const starterItems=(level:Level):WorkoutItem[]=>{
 const ids=level==='beginner'?['bodyweight-squat','incline-push-up','band-row','glute-bridge','dead-bug']:level==='intermediate'?['goblet-squat','barbell-bench-press','one-arm-dumbbell-row','dumbbell-romanian-deadlift','reverse-crunch']:['barbell-front-squat','pull-up','barbell-overhead-press','bulgarian-split-squat','hanging-leg-raise'];
 return ids.map(exerciseId=>({exerciseId,sets:3,reps:level==='beginner'?10:8,rest:90,unit:'reps'}));
};
export function validItems(value:unknown):value is WorkoutItem[]{return Array.isArray(value)&&value.length<=40&&value.every(item=>item&&exercises.some(e=>e.id===item.exerciseId)&&Number.isInteger(item.sets)&&item.sets>=1&&item.sets<=10&&Number.isInteger(item.reps)&&item.reps>=1&&item.reps<=300&&Number.isInteger(item.rest)&&item.rest>=0&&item.rest<=600&&['reps','seconds'].includes(item.unit));}
