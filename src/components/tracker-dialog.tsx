'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import {X} from 'lucide-react';
export function TrackerDialog({children,onClose,label,closeLabel,wide=false}:{children:ReactNode;onClose:()=>void;label:string;closeLabel:string;wide?:boolean}){const ref=useRef<HTMLDialogElement>(null);useEffect(()=>{const node=ref.current;node?.showModal();return()=>node?.close()},[]);return <dialog ref={ref} className={`tf-dialog ${wide?'wide':''}`} aria-label={label} onCancel={event=>{event.preventDefault();onClose()}} onClick={event=>{if(event.target===event.currentTarget)onClose()}}><button className="tf-dialog-close tf-icon" aria-label={closeLabel} onClick={onClose}><X size={20}/></button>{children}</dialog>}
