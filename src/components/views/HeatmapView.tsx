"use client";

import React, { useState, useEffect } from 'react';
import { generateAccidentZones, AccidentZone } from '@/lib/data';
import AccidentHeatmap from '../charts/AccidentHeatmap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HeatmapView() {
  const [accidentData, setAccidentData] = useState<AccidentZone[]>([]);

  useEffect(() => {
    // Generate more data for the detailed view
    const loadData = () => {
      // Create a larger dataset for the full view
      const baseData = generateAccidentZones();
      const extendedData = [
        ...baseData,
        { zone: "San Pedro", accidents: 4, riskLevel: 'Bajo' as const },
        { zone: "Santa Catarina", accidents: 9, riskLevel: 'Medio' as const },
        { zone: "Escobedo", accidents: 13, riskLevel: 'Alto' as const },
        { zone: "Juárez", accidents: 16, riskLevel: 'Crítico' as const },
      ];
      setAccidentData(extendedData);
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
          Visualización detallada de las zonas con mayor incidencia de accidentes viales.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Análisis de Riesgo por Zona</CardTitle>
          <CardDescription>
            Los colores indican el nivel de criticidad basado en el número de reportes activos en la última hora.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[500px]">
            <AccidentHeatmap data={accidentData} />
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
