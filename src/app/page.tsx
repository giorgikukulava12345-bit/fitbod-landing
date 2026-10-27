import Script from 'next/script';
import { nutritionMarkup } from '@/components/nutrition-markup';

export default function Page() {
  return <><div dangerouslySetInnerHTML={{ __html: nutritionMarkup }} />
    <Script src="/app.js?v=georgian-dishes-20261027" type="module" strategy="afterInteractive" />
  </>;
}
