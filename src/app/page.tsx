import Script from 'next/script';
import { nutritionMarkup } from '@/components/nutrition-markup';

export default function Page() {
  return <><div dangerouslySetInnerHTML={{ __html: nutritionMarkup }} />
    <Script src="/app.js" type="module" strategy="afterInteractive" />
  </>;
}
