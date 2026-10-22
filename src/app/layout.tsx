import type { Metadata } from 'next';
import './globals.css';
import './fitness.css';
export const metadata: Metadata = {
  title: 'Giofitness — Exercise Library & Workout Builder',
  description: 'Explore 108 exercises by level and muscle group. Build, customize, and save your workouts. Available in English and Georgian.',
  metadataBase: new URL('https://giofitness.vercel.app'),
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
