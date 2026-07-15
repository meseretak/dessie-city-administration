/**
 * Dessie City — Bilingual translations (English / Amharic)
 */

export type Lang = 'en' | 'am'

export const translations = {
  en: {
    // Navigation
    home: 'HOME',
    about: 'ABOUT',
    mayor: 'MAYOR',
    services: 'SERVICES',
    announcements: 'ANNOUNCEMENTS',
    contact: 'CONTACT',
    allServices: 'All Services',
    newsMedia: 'News & Media',
    vacancies: 'Vacancies',
    bidsAndTenders: 'Bids & Tenders',
    cityProjects: 'City Projects',
    tourismCulture: 'Tourism & Culture',
    hotels: 'Hotels',

    // Common
    readMore: 'Read More',
    viewAll: 'View All',
    search: 'Search',
    loading: 'Loading...',
    noResults: 'No results found',
    backToList: 'Back to List',
    postedBy: 'Posted by',
    publishedOn: 'Published on',
    category: 'Category',
    share: 'Share',
    likes: 'Likes',
    comments: 'Comments',
    addComment: 'Add a comment...',
    submitComment: 'Submit',
    relatedNews: 'Related News',
    like: 'Like',
    unlike: 'Unlike',

    // Home
    heroTitle: 'Dessie City Administration',
    heroSubtitle: 'Serving our community with transparency, efficiency, and care.',
    latestNews: 'Latest News',
    latestUpdates: 'Latest Updates',
    quickServices: 'Quick Services',
    cityHighlights: 'City Highlights',

    // News
    newsTitle: 'NEWS & ANNOUNCEMENTS',
    newsSubtitle: 'Latest updates from Dessie City Administration',
    searchNews: 'Search news...',
    allCategories: 'All',
    noArticles: 'No articles found',
    tryDifferent: 'Try a different category or search term',
    upcomingEvents: 'UPCOMING EVENTS',
    mostRecent: 'MOST RECENT',
    readFullArticle: 'Read Full Article',

    // Footer
    footerTagline: 'Serving Dessie City residents with excellence',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    contactUs: 'Contact Us',
    allRightsReserved: '© 2025 Dessie City Administration. All rights reserved.',

    // Language toggle
    switchLang: 'አማርኛ',
  },
  am: {
    // Navigation
    home: 'ዋና ገጽ',
    about: 'ስለ ከተማ',
    mayor: 'ከንቲባ',
    services: 'አገልግሎቶች',
    announcements: 'ማስታወቂያዎች',
    contact: 'ያግኙን',
    allServices: 'ሁሉም አገልግሎቶች',
    newsMedia: 'ዜናና ሚዲያ',
    vacancies: 'የስራ ክፍት ቦታዎች',
    bidsAndTenders: 'ጨረታዎች',
    cityProjects: 'የከተማ ፕሮጀክቶች',
    tourismCulture: 'ቱሪዝምና ባህል',
    hotels: 'ሆቴሎች',

    // Common
    readMore: 'ተጨማሪ አንብብ',
    viewAll: 'ሁሉን ይመልከቱ',
    search: 'ፈልግ',
    loading: 'በመጫን ላይ...',
    noResults: 'ምንም ውጤት አልተገኘም',
    backToList: 'ወደ ዝርዝር ተመለስ',
    postedBy: 'የለጠፈ',
    publishedOn: 'የታተመበት ቀን',
    category: 'ምድብ',
    share: 'አጋራ',
    likes: 'ላይኮች',
    comments: 'አስተያየቶች',
    addComment: 'አስተያየት ይጻፉ...',
    submitComment: 'አስገባ',
    relatedNews: 'ተዛማጅ ዜናዎች',
    like: 'ወደዱ',
    unlike: 'አልወደዱም',

    // Home
    heroTitle: 'የደሴ ከተማ አስተዳደር',
    heroSubtitle: 'ለማህበረሰባችን በግልጽነት፣ በቅልጥፍና እና በእንክብካቤ እናገለግላለን።',
    latestNews: 'የቅርብ ጊዜ ዜናዎች',
    latestUpdates: 'የቅርብ ጊዜ መረጃዎች',
    quickServices: 'ፈጣን አገልግሎቶች',
    cityHighlights: 'የከተማ ሃይላይትስ',

    // News
    newsTitle: 'ዜናዎችና ማስታወቂያዎች',
    newsSubtitle: 'ከደሴ ከተማ አስተዳደር የቅርብ ጊዜ ዝማኔዎች',
    searchNews: 'ዜናዎችን ፈልግ...',
    allCategories: 'ሁሉም',
    noArticles: 'ምንም ጽሁፎች አልተገኙም',
    tryDifferent: 'ሌላ ምድብ ወይም ቃል ይሞክሩ',
    upcomingEvents: 'መጪ ዝግጅቶች',
    mostRecent: 'የቅርብ ጊዜ',
    readFullArticle: 'ሙሉ ጽሁፍ አንብብ',

    // Footer
    footerTagline: 'ለደሴ ከተማ ነዋሪዎች በምርጥ ሁኔታ እናገለግላለን',
    quickLinks: 'ፈጣን አገናኞች',
    followUs: 'ተከተሉን',
    contactUs: 'ያግኙን',
    allRightsReserved: '© 2025 የደሴ ከተማ አስተዳደር። መብቱ በሕግ የተጠበቀ ነው።',

    // Language toggle
    switchLang: 'English',
  },
}

export type TranslationKey = keyof typeof translations['en']

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations['en'][key] ?? key
}
