import type { Metadata } from 'next';
import './nutrition.css';

export const metadata: Metadata = {
  title: 'giofitness — კვება შენს რიტმში',
  description: 'შენზე მორგებული კალორიები, 7-დღიანი კვების გეგმა და ბიუჯეტი ლარში. კლება, მომატება და შენარჩუნება — სრულად ქართულად.',
  metadataBase: new URL('https://giofitness.vercel.app'),
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ka" suppressHydrationWarning><head><script id="theme-boot" dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('giofitness.theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}" }} /></head><body>{children}</body></html>;
}
