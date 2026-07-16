import { MetadataRoute } from 'next'

const baseUrl = 'https://dessiecity.gov.et'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/mayor`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/cabinet`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/structure`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/news`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/announcements`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/vacancies`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/bids`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/tourism`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/projects`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/transparency`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/hotels`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/smart-city`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  return staticPages.map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
