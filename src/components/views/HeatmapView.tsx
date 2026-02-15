"use client";

import React, { useState, useEffect } from 'react';
import { generateAccidentZones, AccidentZone } from '@/lib/data';
import MapWrapper from '../charts/MapWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HeatmapView() {
  const [accidentData, setAccidentData] = useState<AccidentZone[]>([]);

  useEffect(() => {
    const loadData = () => {
      const baseData = generateAccidentZones();
      setAccidentData(baseData);
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Mapa de Calor de Riesgo</h2>
        <p className="text-muted-foreground mt-1">
          Visualización geoespacial detallada de las zonas con mayor incidencia de accidentes viales.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Análisis Geoespacial de Riesgo</CardTitle>
          <CardDescription>
            Monitoreo en tiempo real de puntos críticos en el Área Metropolitana de Monterrey.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative">
          <div className="absolute inset-0 rounded-b-xl overflow-hidden">
            <MapWrapper data={accidentData} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-500">Zona Crítica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Más de 15 accidentes reportados. Se recomienda evitar la zona y desplegar unidades de tránsito.</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-orange-500">Riesgo Alto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Entre 10 y 15 accidentes. Tráfico lento y alta probabilidad de colisiones menores.</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-emerald-500">Riesgo Bajo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Menos de 5 accidentes. Flujo vehicular normal y condiciones seguras.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
