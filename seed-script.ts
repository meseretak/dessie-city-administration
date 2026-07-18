import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('Seeding data...')
  
  // 1. Seed Hero Sliders
  const heroSlides = [
    { image: '/dessie-city-hall.png', title: 'ደሴ ከተማ አስተዳደር', subtitle: 'Welcome to Dessie City Administration — Serving 500,000+ Citizens with Excellence', tag: 'GOVERNANCE' },
    { image: '/dessie-smart-center.png', title: 'Dessie Smart City 2025', subtitle: 'Advanced Digital Control Center — Real-Time City Monitoring & Governance', tag: 'TECHNOLOGY' },
    { image: '/heritage-landscape.png', title: 'ደሴ — የባህልና ቅርስ ከተማ', subtitle: 'Rich Amhara Culture, Ancient Heritage & Highland Traditions of Dessie', tag: 'CULTURE & HERITAGE' },
    { image: '/heritage-church.png', title: 'ቅዱስ ቦታዎችና ታሪክ', subtitle: 'Historic Ethiopian Orthodox Churches & Sacred Sites of Wollo — Centuries of Faith', tag: 'HISTORY' },
    { image: '/heritage-market.png', title: 'ደሴ ገበያ — ባህላዊ ሕይወት', subtitle: 'The Vibrant Dessie Merkato — Traditional Trade, Crafts & Community Life', tag: 'CULTURE' },
    { image: '/project-smart-city.png', title: 'Digital Dessie — ዲጂታል ደሴ', subtitle: 'Smart Governance, E-Services & IoT Infrastructure for 450,000+ Residents', tag: 'TECHNOLOGY' },
    { image: '/news-smart-city.png', title: 'ቴክኖሎጂ ለሁሉም — Tech For All', subtitle: 'Smart City Sensors, Digital Kiosks & Modern Governance Across Dessie City', tag: 'TECHNOLOGY' },
    { image: '/dessie-service-center.png', title: 'ዘመናዊ አገልግሎት ማዕከል', subtitle: 'Integrated One-Stop Service Hall — All Government Services Under One Roof', tag: 'SERVICES' },
    { image: '/news-infrastructure.png', title: 'Building the Future of ደሴ', subtitle: 'Modern Roads, Water Systems & Urban Infrastructure for All 12 Kebeles', tag: 'INFRASTRUCTURE' }
  ]

  await db.sliderImage.deleteMany({ where: { sliderType: 'hero' } })
  for (const [index, slide] of heroSlides.entries()) {
    await db.sliderImage.create({
      data: {
        ...slide,
        sliderType: 'hero',
        order: index,
        isActive: true,
        approvalStatus: 'approved'
      }
    })
  }

  // 2. Seed Promo Sliders
  const promoSlides = [
    { image: '/promo-cbe-real.png', title: 'Commercial Bank of Ethiopia', subtitle: 'Get your CBE card + 500 Birr Bonus! Full range of banking services at your nearest branch.', tag: 'BANKING', accentColor: '#6B21A8' },
    { image: '/promo-awash-real.png', title: 'Awash Bank', subtitle: '24/7 e-Branch ATM service across Dessie. Nurturing like the river — your trusted banking partner.', tag: 'BANKING', accentColor: '#1D4ED8' },
    { image: '/promo-dashen-real.png', title: 'Dashen Bank', subtitle: 'Pay with ease, shop with confidence. Visa card and modern digital banking solutions.', tag: 'BANKING', accentColor: '#1E3A5F' },
    { image: '/promo-ethiotel-real.jpeg', title: 'Ethio Telecom', subtitle: '50% discount on mobile transactions! Fast 4G/LTE and fiber internet keeping Dessie connected.', tag: 'TELECOM', accentColor: '#166534' },
    { image: '/promo-smart-city.png', title: 'Smart Dessie 2025', subtitle: 'Digital transformation is here — access all city services online with our new Smart City platform.', tag: 'GOVERNMENT', accentColor: '#0d4a28' },
    { image: '/promo-invest.png', title: 'Invest in Dessie', subtitle: 'New 500-hectare industrial zone with tax incentives. Join 15,000+ businesses thriving here.', tag: 'INVESTMENT', accentColor: '#92400E' },
    { image: '/promo-tourism.png', title: 'Visit Dessie', subtitle: 'Explore heritage sites, highland landscapes, and vibrant culture in the heart of Amhara Region.', tag: 'TOURISM', accentColor: '#0d4a28' }
  ]

  await db.sliderImage.deleteMany({ where: { sliderType: 'promo' } })
  for (const [index, slide] of promoSlides.entries()) {
    await db.sliderImage.create({
      data: {
        ...slide,
        sliderType: 'promo',
        order: index,
        isActive: true,
        approvalStatus: 'approved'
      }
    })
  }

  // 3. Seed Projects
  const projects = [
    { title: 'Smart City', description: 'Digital transformation of all city services and citizen engagement platforms.', image: '/project-smart-city.png', category: 'technology', status: 'In Progress', startDate: '2024-01-01', endDate: '2025-12-31' },
    { title: 'Industrial Zone', description: '500 Haktar zone to attract manufacturing investment and create jobs.', image: '/project-industrial.png', category: 'economy', status: 'In Progress', startDate: '2023-06-01', endDate: '2026-06-01' },
    { title: 'Road Network', description: 'Expanding arterial roads, walkways, and modern traffic management.', image: '/project-road.png', category: 'infrastructure', status: 'Completed', startDate: '2022-01-01', endDate: '2024-12-31' },
    { title: 'Water & Sanitation', description: 'Modern water supply and sanitation infrastructure for all residents.', image: '/project-water.png', category: 'infrastructure', status: 'In Progress', startDate: '2024-03-01', endDate: '2025-10-01' },
    { title: 'Education Hub', description: 'New schools, vocational centers, and digital learning programs.', image: '/project-education.png', category: 'education', status: 'Planned', startDate: '2025-09-01', endDate: '2027-09-01' },
    { title: 'Healthcare', description: 'Upgrading hospitals, clinics, and community health programs citywide.', image: '/project-healthcare.png', category: 'health', status: 'In Progress', startDate: '2023-01-01', endDate: '2025-06-01' },
    { title: 'Housing', description: 'Affordable housing projects and urban development for growing families.', image: '/project-housing.png', category: 'housing', status: 'In Progress', startDate: '2022-05-01', endDate: '2026-05-01' },
    { title: 'Green Energy', description: 'Solar and renewable energy installations to power the city sustainably.', image: '/promo-invest.png', category: 'energy', status: 'Planned', startDate: '2026-01-01', endDate: '2028-01-01' }
  ]

  await db.project.deleteMany({})
  for (const project of projects) {
    await db.project.create({
      data: {
        ...project,
        approvalStatus: 'approved'
      }
    })
  }

  // 4. Seed Hotels
  const hotels = [
    { name: 'Dessie Grand Hotel', rating: 4, priceRange: 'ETB 3,500-8,000', location: 'City Center', phone: '+251 33 111 2233', email: 'info@dessiegrand.com', description: 'The premier hotel in Dessie offering luxury rooms, conference facilities, and fine dining with panoramic city views.', image: '/hotel-building.png' },
    { name: 'Mountain View Lodge', rating: 4, priceRange: 'ETB 2,800-6,500', location: 'Hillside', phone: '+251 33 111 4455', email: 'booking@mviewlodge.com', description: 'A peaceful hillside retreat with stunning mountain views, spa services, and traditional Ethiopian cuisine.', image: '/hotel-lobby.png' },
    { name: 'Blue Nile Hotel', rating: 3, priceRange: 'ETB 1,800-4,000', location: 'Piazza', phone: '+251 33 111 6677', email: 'reservations@blueniledessie.com', description: 'Conveniently located near the city center with comfortable rooms, free parking, and a popular restaurant.', image: '/hotel-room.png' },
    { name: 'Tana International', rating: 4, priceRange: 'ETB 2,500-5,500', location: 'Bole Road', phone: '+251 33 111 8899', email: 'info@tanaintl.com', description: 'Modern international-standard hotel with business center, fitness facility, and 24-hour room service.', image: '/hotel-food.png' },
    { name: 'Wollo Heritage Hotel', rating: 3, priceRange: 'ETB 1,500-3,500', location: 'Old Town', phone: '+251 33 111 1100', email: 'stay@wolloheritage.com', description: 'A charming hotel showcasing Wollo cultural heritage with traditional architecture and warm hospitality.', image: '/hotel-building.png' },
    { name: 'Starlight Resort & Spa', rating: 5, priceRange: 'ETB 5,000-15,000', location: 'Kombolcha Road', phone: '+251 33 111 3344', email: 'luxury@starlightdessie.com', description: 'The finest 5-star resort in the region featuring a full spa, infinity pool, gourmet dining, and event venues.', image: '/hotel-room.png' }
  ]

  await db.hotel.deleteMany({})
  for (const hotel of hotels) {
    await db.hotel.create({
      data: {
        ...hotel,
        approvalStatus: 'approved'
      }
    })
  }

  console.log('Seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
