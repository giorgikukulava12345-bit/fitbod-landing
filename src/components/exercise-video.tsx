'use client';

import {useState} from 'react';
import {RotateCw,Video} from 'lucide-react';
import {youtubeEmbedUrl,type ExerciseVideo as Demonstration} from '@/lib/exercise-videos';

export function ExerciseVideo({name,video}:{name:string;video:Demonstration}){
 const [attempt,setAttempt]=useState(0);
 return <section className="exercise-video" aria-label={`${name} — ვიდეოდემონსტრაცია`}>
  <div className="video-slot video-player">
   <iframe key={`${video.youtubeId}-${attempt}`} src={youtubeEmbedUrl(video.youtubeId)} title={`${name} — შესრულების ვიდეო`} width="720" height="405" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
  </div>
  <div className="video-caption"><span><Video size={14}/>ვიდეოდემონსტრაცია · YouTube</span><button type="button" onClick={()=>setAttempt(n=>n+1)}><RotateCw size={13}/>ხელახლა ჩატვირთვა</button></div>
  <p className="video-help">დასაწყებად დააჭირე დაკვრის ღილაკს. ვიდეოს ყურება და სრული ეკრანის გახსნა აქვე შეგიძლია. ვიდეო შეიძლება უცხო ენაზე იყოს; ქართული ინსტრუქცია იხილე ქვემოთ.</p>
 </section>;
}
