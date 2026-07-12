---
Task ID: 3c
Agent: fullstack-developer
Task: Rewrite VacancyPage.tsx with 20 vacancies, pagination, urgent badges, filters, and grid layout

Work Log:
- Read worklog.md, types.ts, existing VacancyPage.tsx, and UI components (badge, select) for context
- Completely rewrote `/home/z/my-project/src/components/pages/VacancyPage.tsx` with:
  - 20 vacancy entries across 6 departments (Engineering, IT, Health, Finance, Education, Administration)
  - Mix of Permanent (10), Contract (5), Temporary (3) types; 3 with status "Closed"
  - Dates set relative to mid-July 2025 so ~8 vacancies have urgent deadlines (within 15 days)
  - Pagination: 5 items per page, green-themed circular buttons (#1a6b3c), ChevronLeft/ChevronRight arrows, numbered circles with scale-105 active state, ellipsis support
  - Results info: "Showing 1–5 of 20 vacancies" and "Page 1 of 4"
  - Pulsing red URGENT badge (animate-pulse) for deadlines within 15 days
  - Filters: Category dropdown (7 options), Type dropdown (4 options), Search input — all reset pagination to page 1
  - Grid layout: 1 col mobile, 2 cols tablet (md), 3 cols desktop (lg)
  - Each card: title, department badge (green), type badge (blue/amber/gray), salary, deadline with Clock icon, status badge (Open=green, Closed=gray), "VIEW DETAILS" button
  - `useMemo` for filtered results and page numbers (no side effects)
  - `useCallback` for filter handlers that reset page
- Lint passes clean with zero errors
- Dev server compiles without issues

Stage Summary:
- VacancyPage.tsx fully rewritten with all 20 vacancies, pagination, filters, urgent badges, and responsive grid
- Zero lint errors, zero compilation errors