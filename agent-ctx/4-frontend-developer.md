---
Task ID: 4
Agent: frontend-developer
Task: Create AnnouncementsPage.tsx — unified tabbed page combining News, Vacancies, and Bids & Tenders

Work Log:
- Read existing page components (NewsPage, VacancyPage, BidsPage) and UI components (tabs, card, badge, button) to match project patterns
- Read /lib/types.ts to understand PageId type and navigateTo prop signature
- Created /src/components/pages/AnnouncementsPage.tsx as a 'use client' component
- Implemented page banner with #0d4a28 background, "ANNOUNCEMENTS" title, and breadcrumb navigation
- Built tabbed interface using shadcn/ui Tabs, TabsList, TabsTrigger, TabsContent with government green (#1a6b3c) active state
- News tab: 6 card grid (1 col mobile, 2 cols md) with FileText icon, category badge, date, excerpt, and "READ MORE" button calling navigateTo('news-detail')
- Vacancies tab: 5 card grid (1 col mobile, 2 cols lg) with department, type badge, salary, deadline, status badge (Open/Closed), and "VIEW DETAILS" button
- Bids tab: 4 card grid (1 col mobile, 2 cols lg) with reference number, category badge, budget, deadline, status badge (Open/Closed/Awarded), and "VIEW DETAILS" button
- Implemented framer-motion animations: fadeInUp variant (opacity 0, y 30 → 1, 0) and staggerContainer for staggered children
- Status badges: Open = green #1a6b3c, Closed = gray, Awarded = gold #c8a415
- Category badges: subtle green background with green text
- Cards have hover:shadow-lg effect
- Disabled "VIEW DETAILS" button for Closed vacancies and non-Open bids
- Used "gov-section-title" class for section titles
- Zero lint errors, dev server compiled successfully

Stage Summary:
- AnnouncementsPage.tsx created at /src/components/pages/AnnouncementsPage.tsx
- Complete tabbed announcements page with News (6 items), Vacancies (5 items), Bids (4 items)
- All data hardcoded as specified, all navigateTo calls match required signatures
- Production-ready with animations, responsive grids, and consistent government styling