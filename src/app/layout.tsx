import type { Metadata } from 'next';
import './nutrition.css';

export const metadata: Metadata = {
  title: 'giofitness — კვება შენს რიტმში',
  description: 'შენზე მორგებული კალორიები, 7-დღიანი კვების გეგმა და ბიუჯეტი ლარში. კლება, მომატება და შენარჩუნება — სრულად ქართულად.',
  metadataBase: new URL('https://giofitness.vercel.app'),
  applicationName: 'Giofitness',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ka"><body>{children}</body></html>;
}
