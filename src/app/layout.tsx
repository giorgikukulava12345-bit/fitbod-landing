import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Giofitness — Less planning. More progress.',
  description: 'Make every rep count. Discover a smarter approach to strength with workouts built around your goals, equipment, and recovery.',
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
