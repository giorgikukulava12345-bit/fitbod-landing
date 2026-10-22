import {TrackerApp} from '@/components/tracker-app';
export const dynamic='force-dynamic';
export default function Page(){return <TrackerApp today={new Date().toISOString().slice(0,10)}/>};
