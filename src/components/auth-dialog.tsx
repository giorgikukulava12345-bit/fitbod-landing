'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
export function AuthDialog({ mode, onClose }: { mode: 'signup'|'login'; onClose:()=>void }) {
  const dialog=useRef<HTMLDialogElement>(null);
  const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [success,setSuccess]=useState(false);
  useEffect(()=>{const el=dialog.current;el?.showModal();return ()=>el?.close()},[]);
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault(); if(busy)return;
    if(!supabase){setMessage('Account setup is unavailable. Please try again later.');return;}
    setBusy(true);setMessage('');const data=new FormData(event.currentTarget);
    try {
      const credentials={email:String(data.get('email')).trim(),password:String(data.get('password'))};
      const {data:result,error}=mode==='signup'?await supabase.auth.signUp(credentials):await supabase.auth.signInWithPassword(credentials);
      if(error)throw error;
      setSuccess(true);setMessage(mode==='signup'&&!result.session?'Check your email to confirm your account.':mode==='signup'?'Your account is ready. Welcome to Giofitness.':'You’re signed in to Giofitness.');
    }catch(error){setMessage(error instanceof Error?error.message:'Something went wrong. Please try again.')}finally{setBusy(false)}
  }
  return <dialog ref={dialog} className="auth-dialog" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}} aria-labelledby="auth-title"><button className="dialog-close" onClick={onClose} aria-label="Close account dialog"><X/></button><span className="eyebrow">YOUR STRONGER STARTS HERE</span><h2 id="auth-title">{mode==='signup'?'Make your first move.':'Welcome back.'}</h2><p>Create a Giofitness account to begin your journey.</p>{success?<div className="success-message" role="status"><CheckCircle2/>{message}<button className="cta mt-6" onClick={onClose}>Done <ArrowRight size={18}/></button></div>:<form onSubmit={submit} className="mt-7 grid gap-5"><label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254}/></label><label>Password<input required name="password" type="password" minLength={8} maxLength={128} autoComplete={mode==='login'?'current-password':'new-password'} placeholder="At least 8 characters"/></label><p aria-live="polite" className="form-error">{message}</p><button className="cta" disabled={busy}>{busy?<LoaderCircle className="animate-spin" size={18}/>:mode==='signup'?'Create free account':'Log in'}<ArrowRight size={18}/></button><small>Your account is free. No payment details required.</small></form>}</dialog>
}
