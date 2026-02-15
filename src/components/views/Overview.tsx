"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  generateTrafficData,
  generateTopAvenues,
  generateAccidentZones,
  calculateKPIs,
  TrafficData,
  AvenueData,
  AccidentZone,
  KPIData
} from '@/lib/data';
import TrafficChart from '../charts/TrafficChart';
import TopAvenuesChart from '../charts/TopAvenuesChart';
import AccidentHeatmap from '../charts/AccidentHeatmap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FiActivity, FiAlertTriangle, FiClock, FiMapPin } from 'react-icons/fi';

export default function Overview() {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [avenueData, setAvenueData] = useState<AvenueData[]>([]);
  const [accidentData, setAccidentData] = useState<AccidentZone[]>([]);
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const loadData = () => {
      const traffic = generateTrafficData();
      const avenues = generateTopAvenues();
      const accidents = generateAccidentZones();

      setTrafficData(traffic);
      setAvenueData(avenues);
      setAccidentData(accidents);
      setKpis(calculateKPIs(accidents, avenues));
      setLastUpdated(new Date());
    };

    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!kpis) return <div className="flex h-full items-center justify-center text-primary">Cargando datos...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview</h2>
          <p className="text-muted-foreground mt-1">
            Monitoreo en tiempo real de tráfico y siniestralidad vial en Nuevo León.
          </p>
        </div>
        <div className="text-xs text-muted-foreground flex items-center bg-secondary/50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Actualizado: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Accidentes (24h)"
          value={kpis.totalAccidents}
          icon={FiAlertTriangle}
          trend="+2.5%"
          trendUp={true}
        />
        <KPICard
          title="Velocidad Promedio"
          value={`${kpis.avgSpeed} km/h`}
          icon={FiActivity}
          trend="-4.1%"
          trendUp={false}
        />
        <KPICard
          title="Zona de Mayor Riesgo"
          value={kpis.mostDangerousZone}
          icon={FiMapPin}
          subtext="Alta congestión reportada"
        />
        <KPICard
          title="Alertas Activas"
          value={kpis.activeAlerts}
          icon={FiClock}
          trend="Normal"
          trendUp={true}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Flujo Vehicular por Hora</CardTitle>
            <CardDescription>Volumen de tráfico en las últimas 24 horas.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <TrafficChart data={trafficData} />
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Top Avenidas Congestionadas</CardTitle>
            <CardDescription>Nivel de saturación actual.</CardDescription>
          </CardHeader>
          <CardContent>
            <TopAvenuesChart data={avenueData} />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Mapa de Calor de Riesgo Vial</CardTitle>
          <CardDescription>Concentración de accidentes por zona en tiempo real.</CardDescription>
        </CardHeader>
        <CardContent>
          <AccidentHeatmap data={accidentData} />
        </CardContent>
      </Card>
    </div>
  );
}

function KPICard({ title, value, icon: Icon, trend, trendUp, subtext }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {(trend || subtext) && (
            <p className="text-xs text-muted-foreground mt-1">
              {trend && (
                <span className={trendUp ? "text-primary" : "text-destructive"}>
                  {trend}
                </span>
              )}
              {trend && " vs última hora"}
              {subtext}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
