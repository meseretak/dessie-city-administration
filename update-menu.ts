import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Create or update City Admin menu
  const cityAdmin = await db.menuItem.upsert({
    where: { id: 'menu-city-admin' },
    update: { label: 'City Admin', order: 1, isVisible: true },
    create: {
      id: 'menu-city-admin',
      label: 'City Admin',
      pageId: '#',
      order: 1,
      isVisible: true,
      approvalStatus: 'approved'
    }
  })

  // Set About, Mayor, Structure, Cabinet, Smart City as children of cityAdmin
  await db.menuItem.upsert({
    where: { id: 'menu-about' },
    update: { parentId: 'menu-city-admin', order: 1 },
    create: { id: 'menu-about', label: 'About Us', pageId: 'about', parentId: 'menu-city-admin', order: 1, isVisible: true, approvalStatus: 'approved' }
  })
  
  await db.menuItem.upsert({
    where: { id: 'menu-mayor' },
    update: { label: 'Mayor\'s Office', pageId: 'mayor', parentId: 'menu-city-admin', order: 2, isVisible: true },
    create: { id: 'menu-mayor', label: 'Mayor\'s Office', pageId: 'mayor', parentId: 'menu-city-admin', order: 2, isVisible: true, approvalStatus: 'approved' }
  })

  await db.menuItem.upsert({
    where: { id: 'sub-mayor-structure' },
    update: { parentId: 'menu-city-admin', order: 3 },
    create: { id: 'sub-mayor-structure', label: 'Structure', pageId: 'structure', parentId: 'menu-city-admin', order: 3, isVisible: true, approvalStatus: 'approved' }
  })

  await db.menuItem.upsert({
    where: { id: 'sub-mayor-cabinet' },
    update: { parentId: 'menu-city-admin', order: 4 },
    create: { id: 'sub-mayor-cabinet', label: 'Cabinet Members', pageId: 'cabinet', parentId: 'menu-city-admin', order: 4, isVisible: true, approvalStatus: 'approved' }
  })

  await db.menuItem.upsert({
    where: { id: 'sub-mayor-smart' },
    update: { parentId: 'menu-city-admin', order: 5 },
    create: { id: 'sub-mayor-smart', label: 'Smart City', pageId: 'smart-city', parentId: 'menu-city-admin', order: 5, isVisible: true, approvalStatus: 'approved' }
  })

  console.log('Done restructuring City Admin menus.')
}

main().catch(console.error).finally(() => db.$disconnect())
