import React from 'react'
import ProjectDetailsPage from '@/components/pages/ProjectDetailsPage'

export const metadata = {
  title: 'Project Details - Dessie City',
  description: 'View detailed information about Dessie City development projects.',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return <ProjectDetailsPage id={resolvedParams.id} />
}
