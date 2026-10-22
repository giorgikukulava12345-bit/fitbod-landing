import type { Metadata } from 'next';
import './globals.css';
import './fitness.css';
import './open.css';
export const metadata: Metadata = {
  title: 'Giofitness — შენი 28-დღიანი ფიტნესგეგმა',
  description: 'სახლისა და დარბაზის ვარჯიშები, 28-დღიანი პროგრამა და 120 სავარჯიშოს ქართული ინსტრუქცია. ააწყვე და შეინახე შენი რუტინა თავისუფლად.',
  metadataBase: new URL('https://giofitness.vercel.app'),
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="ka"><body>{children}</body></html>;
}
