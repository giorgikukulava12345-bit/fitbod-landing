import test from 'node:test';
import assert from 'node:assert/strict';
import {homeExercises} from '../public/home-workout.mjs';
import {homeVideos,homeVideoEmbedUrl} from '../public/home-videos.mjs';
test('every equipment-free movement has its own valid privacy-enhanced video',()=>{
 assert.equal(Object.keys(homeVideos).length,homeExercises.length);
 for(const exercise of homeExercises){const video=homeVideos[exercise.id];assert(video);assert.match(video.youtubeId,/^[A-Za-z0-9_-]{11}$/);assert(video.sourceTitle);const url=new URL(homeVideoEmbedUrl(exercise.id));assert.equal(url.origin,'https://www.youtube-nocookie.com');assert.equal(url.pathname,'/embed/'+video.youtubeId);assert.equal(url.searchParams.get('autoplay'),null);const play=new URL(homeVideoEmbedUrl(exercise.id,true));assert.equal(play.searchParams.get('autoplay'),'1');assert.equal(play.searchParams.get('mute'),'1');}
 assert.throws(()=>homeVideoEmbedUrl('untrusted-id'));
 assert.notEqual(homeVideos.plank.youtubeId,homeVideos['knee-plank'].youtubeId);
});
