'use client';

import {useState} from 'react';
import {RotateCw,Video} from 'lucide-react';
import {translator,type Lang} from '@/lib/tracker-i18n';
import {youtubeEmbedUrl,type ExerciseVideo as Demonstration} from '@/lib/exercise-videos';

export function ExerciseVideo({name,video,lang='ka'}:{name:string;video:Demonstration;lang?:Lang}){
 const t=translator(lang);
 const [attempt,setAttempt]=useState(0);
 return <section className="exercise-video" aria-label={`${name} — ${t('demoVideo')}`}>
  <div className="video-slot video-player">
   <iframe key={`${video.youtubeId}-${attempt}`} src={youtubeEmbedUrl(video.youtubeId,lang)} title={`${name} — ${t('videoTitle')}`} width="720" height="405" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
  </div>
  <div className="video-caption"><span><Video size={14}/>{t('demoVideo')} · YouTube</span><button type="button" onClick={()=>setAttempt(n=>n+1)}><RotateCw size={13}/>{t('resetVideo')}</button></div>
  <p className="video-help">{t('videoHelp')}</p>
 </section>;
}
