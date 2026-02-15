"use client";

import React, { useState, useEffect } from 'react';
import { generateAccidentZones, AccidentZone } from '@/lib/data';
import AccidentHeatmap from '../charts/AccidentHeatmap';
import MapWrapper from '../charts/MapWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HeatmapView() {
  const [accidentData, setAccidentData] = useState<AccidentZone[]>([]);

  useEffect(() => {
    const loadData = () => {
      // Now generateAccidentZones returns a full list, no need to manually append
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
          Visualización detallada de las zonas con mayor incidencia de accidentes viales.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Análisis de Riesgo por Zona</CardTitle>
          <CardDescription>
            Visualiza los puntos críticos en el mapa interactivo o como cuadrícula de riesgo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map" className="w-full">
            <div className="flex justify-end mb-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="map">Mapa Interactivo</TabsTrigger>
                <TabsTrigger value="grid">Vista Cuadrícula</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="map" className="mt-0">
              <MapWrapper data={accidentData} />
            </TabsContent>

            <TabsContent value="grid" className="mt-0">
              <div className="min-h-[500px]">
                <AccidentHeatmap data={accidentData} />
              </div>
            </TabsContent>
          </Tabs>
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
