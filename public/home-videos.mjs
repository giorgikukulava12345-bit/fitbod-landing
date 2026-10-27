// Public creator-hosted demonstrations; media remains on YouTube.
export const homeVideos={
 'march':{youtubeId:'5euy_1A8uHQ',sourceTitle:'Exercise for Fall Prevention: Marching in place'},
 'squat':{youtubeId:'eFEVKmp3M4g',sourceTitle:'Bodyweight Squat'},
 'knee-pushup':{youtubeId:'RWS6Q4IPO-8',sourceTitle:'Knee Push Up Exercise'},
 'pushup':{youtubeId:'VQKqjHtY8jA',sourceTitle:'The Perfect Push Up'},
 'bridge':{youtubeId:'9TN73n6T31s',sourceTitle:'Glute Bridge: Form and Technique'},
 'bird-dog':{youtubeId:'40a4wZrnCFs',sourceTitle:'Bird Dog Exercise Demonstration'},
 'dead-bug':{youtubeId:'4XLEnwUr1d8',sourceTitle:'Dead Bug'},
 'reverse-lunge':{youtubeId:'7J6gITUqM-A',sourceTitle:'Bodyweight Reverse Lunge'},
 'side-leg':{youtubeId:'eTz7hLdqFW4',sourceTitle:'Standing Side Leg Raises — Rundle Fit'},
 'calf-raise':{youtubeId:'CtpPV2FBkG4',sourceTitle:'Standing Calf Raises Bodyweight Tutorial'},
 'knee-plank':{youtubeId:'UOXuHkBfDhU',sourceTitle:'How to do a kneeling plank — Rehab My Patient'},
 'plank':{youtubeId:'xe2MXatLTUw',sourceTitle:'Plank'},
 'climber':{youtubeId:'uTlRysTx1JU',sourceTitle:'Slow Mountain Climbers'},
 'snow-angel':{youtubeId:'pheTWb7eSko',sourceTitle:'Reverse Snow Angel'}
};
export function homeVideoEmbedUrl(exerciseId,autoplay=false){
 const video=homeVideos[exerciseId];if(!video||!/^[A-Za-z0-9_-]{11}$/.test(video.youtubeId))throw Error('Unknown exercise video');
 return 'https://www.youtube-nocookie.com/embed/'+video.youtubeId+'?hl=ka&rel=0&playsinline=1'+(autoplay?'&autoplay=1&mute=1':'');
}
