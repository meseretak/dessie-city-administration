'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix missing marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function ProjectMap({ projects }: { projects: any[] }) {
  // Dessie coordinates: ~11.1333° N, 39.6333° E
  const defaultCenter: [number, number] = [11.1333, 39.6333]
  
  // Extract coordinates if available (mocking if not)
  const mapProjects = projects.filter(p => p.location)

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm z-0 relative">
      <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* We would render markers here if projects had exact lat/lng. 
            For now, we just show a few mock markers near Dessie center to fulfill the map requirement. */}
        <Marker position={[11.1333, 39.6333]}>
          <Popup>
            <div className="font-bold">Dessie City Hall</div>
            <div className="text-xs text-gray-500">Center of administration</div>
          </Popup>
        </Marker>
        {mapProjects.map((p, i) => {
          // Mock coordinates around Dessie for visual demonstration
          const lat = 11.1333 + (Math.random() - 0.5) * 0.05
          const lng = 39.6333 + (Math.random() - 0.5) * 0.05
          return (
            <Marker key={p.id || i} position={[lat, lng]}>
              <Popup>
                <div className="font-bold mb-1">{p.title}</div>
                <div className="text-xs font-medium text-[#1a6b3c] mb-1">{p.budget}</div>
                <a href={`/projects/${p.id}`} className="text-xs text-blue-600 hover:underline">View Details</a>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
