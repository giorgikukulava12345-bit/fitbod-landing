import {NextResponse} from 'next/server';
import {foodCategories,searchFoods} from '@/lib/nutrition';
export function GET(request:Request){const params=new URL(request.url).searchParams;const category=params.get('category')||'all';if(category!=='all'&&!Object.hasOwn(foodCategories,category))return NextResponse.json({error:'უცნობი კატეგორია'},{status:400});const results=searchFoods((params.get('q')||'').slice(0,200),category);return NextResponse.json({basis:'100 გრამი',approximate:true,total:results.length,foods:results},{headers:{'Cache-Control':'public, max-age=3600'}})}
