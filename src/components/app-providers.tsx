'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import type {Language} from '@/lib/catalog';
import {supabase} from '@/lib/supabase';
const AppContext=createContext<{session:Session|null;ready:boolean;lang:Language;setLang:(lang:Language)=>void}>({session:null,ready:false,lang:'en',setLang:()=>{}});
export const useApp=()=>useContext(AppContext);
export function AppProviders({children}:{children:React.ReactNode}){
 const [session,setSession]=useState<Session|null>(null);const [ready,setReady]=useState(false);const [lang,setLanguage]=useState<Language>('en');const [languageReady,setLanguageReady]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem('giofitness.language');if(saved==='ka'||saved==='en')setLanguage(saved);}catch{}setLanguageReady(true)},[]);
 useEffect(()=>{if(!languageReady)return;document.documentElement.lang=lang;try{localStorage.setItem('giofitness.language',lang)}catch{}},[lang,languageReady]);
 useEffect(()=>{
  if(!supabase){setReady(true);return;}
  let active=true;let authEventSeen=false;
  // Synchronous callback: awaiting Auth APIs here can deadlock the client lock.
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{if(active){authEventSeen=true;setSession(next);setReady(true);}});
  supabase.auth.getSession().then(({data,error})=>{if(active&&!authEventSeen){setSession(error?null:data.session);setReady(true);}}).catch(()=>{if(active&&!authEventSeen)setReady(true)});
  return ()=>{active=false;subscription.unsubscribe()};
 },[]);
 return <AppContext.Provider value={{session,ready,lang,setLang:setLanguage}}>{children}</AppContext.Provider>
}
