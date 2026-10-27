import {homeVideos,homeVideoEmbedUrl} from './home-videos.mjs';
import {homeExercises,buildHomeWorkout,WorkoutTimer} from './home-workout.mjs';
const section=document.querySelector('#home-workout');
if(section){
 const $=selector=>section.querySelector(selector);
 const format=seconds=>String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
 const getExercise=id=>homeExercises.find(e=>e.id===id);
 let routine,timer,lastStageKey='',ticker,videoExercise='';
 function renderVideo(exerciseId,autoplay=false,force=false){
  if(videoExercise===exerciseId&&!force)return;
  const exercise=getExercise(exerciseId),video=homeVideos[exerciseId];if(!exercise||!video)return;
  videoExercise=exerciseId;$('#home-video-panel').hidden=false;
  $('#home-video-name').textContent='ვიდეო: '+exercise.name;
  $('#home-video-open').href='https://www.youtube.com/watch?v='+video.youtubeId;
  const frame=document.createElement('iframe');frame.src=homeVideoEmbedUrl(exerciseId,autoplay);frame.title=exercise.name+' — შესრულების ვიდეო';frame.width='720';frame.height='405';frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation');frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;
  $('#home-video').replaceChildren(frame);
 }
 function pauseForVideo(){timer.pause();clearInterval(ticker);render();}

 function prepare(){
  clearInterval(ticker);videoExercise='';
  routine=buildHomeWorkout({minutes:Number($('#home-minutes').value),level:$('#home-level').value,focus:$('#home-focus').value});
  timer=new WorkoutTimer(routine.stages);lastStageKey='';
  $('#home-length').textContent=Number($('#home-minutes').value)+' წუთი';
  $('#home-work-rest').textContent=routine.workSeconds+' წმ ვარჯიში / '+routine.restSeconds+' წმ დასვენება';
  $('#home-intervals').textContent=routine.intervals+' ინტერვალი + გახურება და დასრულება';
  $('#home-exercises').innerHTML=routine.exerciseIds.map((id,i)=>{const e=getExercise(id);return '<details class="home-exercise"><summary><span>'+String(i+1).padStart(2,'0')+'</span><div><strong>'+e.name+'</strong><small>'+e.area+'</small></div><b aria-hidden="true">⌄</b></summary><ol>'+e.steps.map(step=>'<li>'+step+'</li>').join('')+'</ol><p><strong>უფრო მარტივად:</strong> '+e.easier+'</p><button type="button" class="text-button home-exercise-video" data-home-video="'+e.id+'">▶ შესრულების ვიდეო</button></details>';}).join('');
  render();
 }
 function render(){
  const state=timer.snapshot(),active=['running','paused'].includes(state.status);
  ['#home-minutes','#home-level','#home-focus'].forEach(id=>$(id).disabled=active);
  $('#home-start').disabled=state.status==='running';
  $('#home-start').textContent=state.status==='paused'?'გაგრძელება':state.status==='complete'?'თავიდან დაწყება':'ვარჯიშის დაწყება';
  $('#home-pause').disabled=state.status!=='running';$('#home-next').disabled=!active;
  $('#home-clock').textContent=state.status==='complete'?'✓':format(state.secondsLeft);
  $('#home-progress').value=Math.min(routine.totalSeconds,state.elapsed);$('#home-progress').max=routine.totalSeconds;
  $('#home-progress-label').textContent=format(Math.min(routine.totalSeconds,Math.floor(state.elapsed)))+' / '+format(routine.totalSeconds);
  const key=state.status+':'+state.index;
  if(key===lastStageKey)return;lastStageKey=key;
  if(state.status==='complete'){
   $('#home-video').replaceChildren();$('#home-video-panel').hidden=true;videoExercise='';$('#home-phase').textContent='სესია დასრულდა';$('#home-current').textContent='კარგი დასასრული — დაისვენე';$('#home-instructions').innerHTML='<li>აღიდგინე სუნთქვა და დალიე წყალი სურვილისამებრ.</li><li>შემდეგი სესია დაგეგმე შენი თვითშეგრძნების მიხედვით.</li>';$('#home-easier').textContent='';$('#home-up-next').textContent='სურვილისამებრ შეგიძლია გეგმა თავიდან დაიწყო.';clearInterval(ticker);return;
  }
  const stage=state.stage;
  renderVideo(stage.kind==='rest'?(stage.nextExerciseId||'march'):stage.exerciseId);
  const phase={warmup:'გახურება',work:'ვარჯიში',rest:'დასვენება',cooldown:'დასრულება'}[stage.kind];
  $('#home-phase').textContent=(state.status==='paused'?'პაუზა · ':state.status==='idle'?'მზად ხარ? · ':'')+phase;
  $('#home-current').textContent=stage.title;
  if(stage.kind==='rest'){
   $('#home-instructions').innerHTML='<li>დაისვენე და თავისუფლად ისუნთქე.</li><li>შემდეგ მოძრაობას შენთვის კომფორტულ ტემპში შეუდექი.</li>';$('#home-easier').textContent='საჭიროებისას ტაიმერი დააპაუზე და დასვენება გაახანგრძლივე.';
  }else{
   const e=getExercise(stage.exerciseId);
   $('#home-instructions').innerHTML=(stage.kind==='cooldown'?['ადგილზე ნელა იარე და თანდათან შეანელე ტემპი.','მხრები მოადუნე და მშვიდად ისუნთქე.']:e.steps).map(step=>'<li>'+step+'</li>').join('');
   $('#home-easier').textContent=stage.kind==='work'?'უფრო მარტივად: '+e.easier:'ვარჯიშისთვის გჭირდება მხოლოდ თავისუფალი ადგილი და მყარი, არამცურავი იატაკი.';
  }
  const next=stage.kind==='rest'?(stage.nextExerciseId?getExercise(stage.nextExerciseId).name:'ნელი ნაბიჯი და სუნთქვა'):stage.kind==='warmup'?getExercise(routine.stages[1].exerciseId).name:stage.kind==='cooldown'?'დასრულება':'დასვენება';
  $('#home-up-next').textContent=(stage.kind==='work'?'ინტერვალი '+stage.interval+'/'+stage.total+' · ':'')+'შემდეგ: '+next;
 }
 $('#home-start').addEventListener('click',()=>{timer.start();clearInterval(ticker);ticker=setInterval(render,200);render();});
 $('#home-pause').addEventListener('click',()=>{timer.pause();clearInterval(ticker);render();});
 $('#home-next').addEventListener('click',()=>{timer.skip();render();});
 $('#home-reset').addEventListener('click',()=>{clearInterval(ticker);timer.reset();videoExercise='';render();});
 ['#home-minutes','#home-level','#home-focus'].forEach(id=>$(id).addEventListener('change',prepare));
 $('#home-video-pause').addEventListener('click',()=>{const exerciseId=videoExercise;pauseForVideo();renderVideo(exerciseId,true,true);});
 $('#home-video-reload').addEventListener('click',()=>{const exerciseId=videoExercise;pauseForVideo();renderVideo(exerciseId,false,true);});
 section.addEventListener('click',event=>{const button=event.target.closest('[data-home-video]');if(!button)return;pauseForVideo();renderVideo(button.dataset.homeVideo,false,true);$('#home-video-panel').scrollIntoView({behavior:'smooth',block:'center'});});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
 window.addEventListener('pagehide',()=>clearInterval(ticker));
 prepare();
}
