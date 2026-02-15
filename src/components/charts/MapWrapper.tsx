"use client";

import dynamic from 'next/dynamic';
import { AccidentZone } from '@/lib/data';

const LeafletMap = dynamic(
  () => import('./LeafletMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-secondary/20 animate-pulse rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    )
  }
);

interface MapWrapperProps {
  data: AccidentZone[];
}

export default function MapWrapper({ data }: MapWrapperProps) {
  return <LeafletMap data={data} />;
}
