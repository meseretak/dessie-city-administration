
export const metadata = {
  title: 'News & Media - Dessie City',
  description: 'Latest news, press releases, and media updates from Dessie City.',
};

'use client'
import NewsPage from '@/components/pages/NewsPage';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';

export default function Page() {
  const router = useRouter();
  const { lang } = useLang();
  
  const navigateTo = (page: string, extra?: any) => {
    if (page === 'news-detail') {
      router.push(`/news/${encodeURIComponent(extra?.newsId || '')}`);
    } else {
      router.push(`/${page === 'home' ? '' : page}`);
    }
  };

  return <NewsPage navigateTo={navigateTo} lang={lang} />;
}
