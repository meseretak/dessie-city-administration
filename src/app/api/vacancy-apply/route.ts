import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const cover = formData.get('cover') as string
    const vacancyId = formData.get('vacancyId') as string
    const vacancyTitle = formData.get('vacancyTitle') as string
    const cvFile = formData.get('cv') as File | null

    if (!name || !email || !vacancyId) {
      return NextResponse.json({ error: 'Name, email and vacancy are required' }, { status: 400 })
    }

    // Store CV filename if provided
    let cvFileName = ''
    if (cvFile && cvFile.size > 0) {
      cvFileName = cvFile.name
      // Note: In production, upload to cloud storage (S3/Cloudinary)
      // For now we just store the filename
    }

    // Save application as a ServiceRequest (reusing existing model)
    await db.serviceRequest.create({
      data: {
        name,
        email,
        phone: phone || '',
        serviceType: `Job Application: ${vacancyTitle || vacancyId}`,
        message: `Cover Letter: ${cover || 'N/A'}\n\nCV File: ${cvFileName || 'Not provided'}\n\nVacancy ID: ${vacancyId}`,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Vacancy apply error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
