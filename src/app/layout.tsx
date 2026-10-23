import type { Metadata } from 'next';
import './globals.css';
import './fitness.css';
import './open.css';
import './tracker.css';
import './redesign.css';
export const metadata: Metadata = {
  title: 'giofitness — შენი ვარჯიში, შენი პროგრესი',
  description: 'ივარჯიშე სახლში ან დარბაზში. 120 ვიდეოიანი სავარჯიშო, 28-დღიანი გეგმა, კალორიების ცხრილი და პროგრესის ჟურნალი — სრულად ქართულად, ანგარიშის გარეშე.',
  metadataBase: new URL('https://giofitness.vercel.app'),
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="ka"><body>{children}</body></html>;
}
