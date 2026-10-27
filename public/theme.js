const root=document.documentElement;
const toggle=document.querySelector('#theme-toggle');
const preference=window.matchMedia('(prefers-color-scheme: dark)');
let explicit=null;
try{const saved=localStorage.getItem('giofitness.theme');if(saved==='dark'||saved==='light')explicit=saved;}catch{}
function applyTheme(theme){
 root.dataset.theme=theme;root.style.colorScheme=theme;
 if(toggle){const dark=theme==='dark';toggle.setAttribute('aria-pressed',String(dark));toggle.setAttribute('aria-label',dark?'ნათელი რეჟიმის ჩართვა':'მუქი რეჟიმის ჩართვა');toggle.textContent=dark?'☀ ნათელი რეჟიმი':'☾ მუქი რეჟიმი';}
}
applyTheme(explicit||(preference.matches?'dark':'light'));
toggle?.addEventListener('click',()=>{explicit=root.dataset.theme==='dark'?'light':'dark';applyTheme(explicit);try{localStorage.setItem('giofitness.theme',explicit);}catch{}});
preference.addEventListener('change',event=>{if(!explicit)applyTheme(event.matches?'dark':'light');});
window.addEventListener('storage',event=>{if(event.key==='giofitness.theme'||event.key===null){explicit=['dark','light'].includes(event.newValue)?event.newValue:null;applyTheme(explicit||(preference.matches?'dark':'light'));}});
