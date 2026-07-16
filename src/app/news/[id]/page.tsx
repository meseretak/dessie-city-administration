'use client'
import NewsDetailPage from '@/components/pages/NewsDetailPage';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { lang } = useLang();
  
  // Unwrap the promise for params as required by Next.js 15
  const unwrappedParams = use(params);
  
  const navigateTo = (page: string, extra?: any) => {
    if (page === 'news-detail') {
      router.push(`/news/${encodeURIComponent(extra?.newsId || '')}`);
    } else {
      router.push(`/${page === 'home' ? '' : page}`);
    }
  };

  return <NewsDetailPage newsId={decodeURIComponent(unwrappedParams.id)} navigateTo={navigateTo} lang={lang} />;
}
