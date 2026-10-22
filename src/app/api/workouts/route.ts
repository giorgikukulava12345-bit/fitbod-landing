import {validWorkout,volume,completedSets} from '@/lib/tracker';
// Public validation endpoint. Personal logs stay on the requesting device.
export async function POST(request:Request){
 try{
  if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'JSON required'},{status:415});
  const raw=await request.text();if(raw.length>200000)return Response.json({error:'Payload too large'},{status:413});
  const workout:unknown=JSON.parse(raw);
  if(!validWorkout(workout)||Date.parse(workout.finishedAt)>Date.now()+600000)return Response.json({error:'Invalid workout'},{status:400});
  return Response.json({workout,summary:{volumeKg:volume(workout),completedSets:completedSets(workout)},storage:'device'},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Invalid JSON'},{status:400})}
}
