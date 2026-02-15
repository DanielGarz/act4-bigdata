// Simulación de datos para el dashboard
import { format, subHours, subDays } from 'date-fns';

export interface TrafficData {
  time: string;
  count: number;
}

export interface AvenueData {
  name: string;
  congestion: number; // 0-100
  speed: number; // km/h
}

export interface AccidentZone {
  zone: string;
  accidents: number;
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
}

export interface KPIData {
  totalAccidents: number;
  avgSpeed: number;
  mostDangerousZone: string;
  activeAlerts: number;
}

// Generar datos de tráfico por hora (últimas 24h)
export const generateTrafficData = (): TrafficData[] => {
  const data: TrafficData[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = subHours(now, i);
    // Simular pico en horas pico (8am y 6pm)
    const hour = time.getHours();
    let baseCount = 500;
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      baseCount = 1200;
    } else if (hour >= 23 || hour <= 4) {
      baseCount = 100;
    }

    // Añadir aleatoriedad
    const count = Math.floor(baseCount + Math.random() * 300 - 150);

    data.push({
      time: format(time, 'HH:mm'),
      count: Math.max(0, count),
    });
  }
  return data;
};

// Generar top avenidas congestionadas
export const generateTopAvenues = (): AvenueData[] => {
  const avenues = [
    "Av. Constitución",
    "Av. Morones Prieto",
    "Av. Garza Sada",
    "Av. Lazaro Cárdenas",
    "Av. Gonzalitos",
    "Av. Leones",
    "Av. Universidad"
  ];

  return avenues.map(name => ({
    name,
    congestion: Math.floor(Math.random() * 40) + 60, // 60-100% congestion simulada
    speed: Math.floor(Math.random() * 40) + 10, // 10-50 km/h
  })).sort((a, b) => b.congestion - a.congestion).slice(0, 5);
};

// Generar zonas de accidentes
export const generateAccidentZones = (): AccidentZone[] => {
  const zones = [
    { zone: "Centro", base: 15 },
    { zone: "San Jerónimo", base: 8 },
    { zone: "Cumbres", base: 10 },
    { zone: "Tecnológico", base: 5 },
    { zone: "Valle Oriente", base: 7 },
    { zone: "Guadalupe Centro", base: 12 },
    { zone: "San Nicolás", base: 9 },
    { zone: "Apodaca", base: 11 }
  ];

  return zones.map(z => {
    const accidents = Math.floor(z.base + Math.random() * 5);
    let riskLevel: AccidentZone['riskLevel'] = 'Bajo';
    if (accidents > 15) riskLevel = 'Crítico';
    else if (accidents > 10) riskLevel = 'Alto';
    else if (accidents > 5) riskLevel = 'Medio';

    return {
      zone: z.zone,
      accidents,
      riskLevel
    };
  }).sort((a, b) => b.accidents - a.accidents);
};

export const calculateKPIs = (zones: AccidentZone[], avenues: AvenueData[]): KPIData => {
  const totalAccidents = zones.reduce((acc, curr) => acc + curr.accidents, 0);
  const avgSpeed = Math.floor(avenues.reduce((acc, curr) => acc + curr.speed, 0) / avenues.length);
  const mostDangerousZone = zones[0]?.zone || "N/A";

  return {
    totalAccidents,
    avgSpeed,
    mostDangerousZone,
    activeAlerts: Math.floor(Math.random() * 5)
  };
};
