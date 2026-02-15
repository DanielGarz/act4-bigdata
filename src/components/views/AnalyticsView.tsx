"use client";

import React, { useState, useEffect } from 'react';
import { generateTrafficData, generateTopAvenues } from '@/lib/data';
import TrafficChart from '../charts/TrafficChart';
import TopAvenuesChart from '../charts/TopAvenuesChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AnalyticsView() {
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [avenueData, setAvenueData] = useState<any[]>([]);

  useEffect(() => {
    setTrafficData(generateTrafficData());
    setAvenueData(generateTopAvenues());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h2>
        <p className="text-muted-foreground mt-1">
          Análisis histórico y predictivo de patrones de tráfico.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Tendencia de Tráfico Semanal</CardTitle>
            <CardDescription>Comparativa de flujo vehicular vs. semana anterior.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <TrafficChart data={trafficData} />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Avenidas con Mayor Saturación</CardTitle>
              <CardDescription>Ranking de vías que requieren intervención.</CardDescription>
            </CardHeader>
            <CardContent>
              <TopAvenuesChart data={avenueData} />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Reporte Mensual</CardTitle>
              <CardDescription>Resumen de indicadores clave de rendimiento.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Total Incidentes</span>
                  <span className="text-xl font-bold">1,248</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Tiempo Promedio de Respuesta</span>
                  <span className="text-xl font-bold">12 min</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Eficiencia de Rutas</span>
                  <span className="text-xl font-bold text-emerald-500">94%</span>
                </div>
                <button className="w-full py-2 mt-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Descargar Reporte Completo (PDF)
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
