export type PageId =
  | 'home'
  | 'about'
  | 'mayor'
  | 'services'
  | 'service-detail'
  | 'announcements'
  | 'vacancy'
  | 'vacancy-detail'
  | 'news'
  | 'news-detail'
  | 'bids'
  | 'bids-detail'
  | 'tourism'
  | 'projects'
  | 'transparency'
  | 'hotels'
  | 'contact'
  | 'admin'

export interface NavItem {
  id: PageId
  label: string
  children?: { id: PageId; label: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'mayor', label: 'MAYOR' },
  {
    id: 'services',
    label: 'SERVICES',
    children: [
      { id: 'services', label: 'All Services' },
      { id: 'service-detail', label: 'Birth Registration' },
      { id: 'service-detail', label: 'Business License' },
      { id: 'service-detail', label: 'Building Permit' },
      { id: 'service-detail', label: 'Land Services' },
      { id: 'service-detail', label: 'Tax Payment' },
      { id: 'service-detail', label: 'Marriage Registration' },
      { id: 'service-detail', label: 'Health Services' },
      { id: 'service-detail', label: 'Education' },
      { id: 'service-detail', label: 'Transportation' },
      { id: 'service-detail', label: 'Water & Electricity' },
      { id: 'service-detail', label: 'Complaints' },
      { id: 'service-detail', label: 'Appointments' },
      { id: 'tourism', label: '── Tourism & Culture' },
      { id: 'projects', label: '── City Projects' },
    ],
  },
  {
    id: 'announcements',
    label: 'ANNOUNCEMENTS',
    children: [
      { id: 'news', label: 'News & Media' },
      { id: 'vacancy', label: 'Vacancies' },
      { id: 'bids', label: 'Bids & Tenders' },
    ],
  },
  { id: 'contact', label: 'CONTACT' },
]

export interface ServiceDetail {
  id: string
  title: string
  icon: string
  description: string
  requirements: string[]
  process: string[]
  documents: string[]
  fees: string
  timeline: string
  office: string
  contact: string
}

export interface VacancyItem {
  id: string
  title: string
  department: string
  type: string
  salary: string
  deadline: string
  status: 'Open' | 'Closed'
  requirements: string[]
  description: string
}

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  image?: string
}

export interface BidItem {
  id: string
  title: string
  reference: string
  category: string
  deadline: string
  status: 'Open' | 'Closed' | 'Awarded'
  description: string
  budget: string
  requirements: string[]
}