"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AccidentZone } from '@/lib/data';
import L from 'leaflet';

// Fix for default markers in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  data: AccidentZone[];
}

// Componente para actualizar la vista cuando cambian los datos
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function LeafletMap({ data }: MapProps) {
  const center: [number, number] = [25.6866, -100.3161]; // Monterrey Centro

  const getColor = (risk: string) => {
    switch (risk) {
      case 'Crítico': return '#ef4444'; // red-500
      case 'Alto': return '#f97316'; // orange-500
      case 'Medio': return '#eab308'; // yellow-500
      default: return '#10b981'; // emerald-500
    }
  };

  const getRadius = (accidents: number) => {
    return Math.max(5, Math.min(20, accidents * 1.5));
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden z-0">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* Dark Matter Theme for "Modern/Cyberpunk" look */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {data.map((zone, index) => (
          <CircleMarker
            key={`${zone.zone}-${index}`}
            center={[zone.lat, zone.lng]}
            pathOptions={{ 
              color: getColor(zone.riskLevel),
              fillColor: getColor(zone.riskLevel),
              fillOpacity: 0.6,
              weight: 2
            }}
            radius={getRadius(zone.accidents)}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="font-bold text-gray-900">{zone.zone}</h3>
                <p className="text-sm text-gray-600">Riesgo: <span style={{ color: getColor(zone.riskLevel), fontWeight: 'bold' }}>{zone.riskLevel}</span></p>
                <p className="text-sm text-gray-600">Accidentes: {zone.accidents}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        <MapUpdater center={center} />
      </MapContainer>
      
      {/* Overlay to simulate "scanline" or "tech" effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[400] bg-[length:100%_2px,3px_100%] opacity-20"></div>
    </div>
  );
}
