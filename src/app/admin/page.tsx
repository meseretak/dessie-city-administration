
export const metadata = {
  title: 'Admin Dashboard - Dessie City',
  description: 'Secure administration portal for Dessie City content management.',
};

'use client'

import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('@/components/pages/AdminPanel').catch(() => {
  return { default: () => <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Admin panel failed to load. Please refresh.</p></div> }
}), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0d4a28]" />
    </div>
  ),
})

export default function Admin() {
  return <AdminPanel />
}
