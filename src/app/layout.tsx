import type { Metadata } from 'next';
import './globals.css';
import './fitness.css';
import './open.css';
import './tracker.css';
export const metadata: Metadata = {
  title: 'giofitness — Your training. Your progress.',
  description: 'Track workouts, build routines, explore 120 exercises and understand your progress. Georgian and English fitness dashboard. ვარჯიშის ჟურნალი და პროგრესი ქართულად.',
  metadataBase: new URL('https://giofitness.vercel.app'),
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
