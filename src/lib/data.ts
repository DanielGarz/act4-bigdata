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
  lat: number;
  lng: number;
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
    // Monterrey Centro y Alrededores
    { zone: "Centro", base: 18, lat: 25.6714, lng: -100.3086 },
    { zone: "Obispado", base: 12, lat: 25.6738, lng: -100.3400 },
    { zone: "Mitras Centro", base: 10, lat: 25.6920, lng: -100.3450 },
    { zone: "Col. Moderna", base: 8, lat: 25.6880, lng: -100.2950 },
    { zone: "Satélite", base: 9, lat: 25.6150, lng: -100.2750 },

    // Poniente
    { zone: "San Jerónimo", base: 8, lat: 25.6744, lng: -100.3547 },
    { zone: "Cumbres 1er Sec", base: 14, lat: 25.7050, lng: -100.3650 },
    { zone: "Cumbres Elite", base: 11, lat: 25.7283, lng: -100.3950 },
    { zone: "Vista Hermosa", base: 7, lat: 25.6850, lng: -100.3550 },

    // Sur / Carretera Nacional
    { zone: "Tecnológico", base: 6, lat: 25.6517, lng: -100.2933 },
    { zone: "Contry", base: 9, lat: 25.6350, lng: -100.2800 },
    { zone: "Estanzuela", base: 13, lat: 25.5650, lng: -100.2500 },
    { zone: "La Rioja", base: 7, lat: 25.5500, lng: -100.2350 },

    // San Pedro
    { zone: "Valle Oriente", base: 7, lat: 25.6422, lng: -100.3333 },
    { zone: "Casco Urbano", base: 5, lat: 25.6567, lng: -100.4017 },
    { zone: "San Agustín", base: 12, lat: 25.6480, lng: -100.3500 },
    { zone: "Chipinque", base: 4, lat: 25.6200, lng: -100.3650 },

    // Guadalupe
    { zone: "Guadalupe Centro", base: 12, lat: 25.6775, lng: -100.2600 },
    { zone: "Expo Gpe", base: 15, lat: 25.6700, lng: -100.2450 },
    { zone: "Linda Vista", base: 11, lat: 25.6950, lng: -100.2650 },
    { zone: "Estadio BBVA", base: 8, lat: 25.6800, lng: -100.2350 },

    // San Nicolás
    { zone: "San Nicolás Centro", base: 9, lat: 25.7558, lng: -100.2869 },
    { zone: "Anáhuac", base: 7, lat: 25.7350, lng: -100.3100 },
    { zone: "Las Puentes", base: 10, lat: 25.7450, lng: -100.2650 },
    { zone: "Universidad", base: 14, lat: 25.7250, lng: -100.3050 },

    // Apodaca y Escobedo
    { zone: "Apodaca Centro", base: 11, lat: 25.7817, lng: -100.1886 },
    { zone: "Huinalá", base: 16, lat: 25.7600, lng: -100.1500 },
    { zone: "Escobedo Centro", base: 13, lat: 25.7933, lng: -100.3083 },
    { zone: "Sendero", base: 15, lat: 25.7700, lng: -100.2900 },

    // Santa Catarina
    { zone: "Santa Catarina", base: 10, lat: 25.6767, lng: -100.4617 },
    { zone: "La Fama", base: 12, lat: 25.6700, lng: -100.4300 },
    { zone: "Puerta del Sol", base: 9, lat: 25.6900, lng: -100.4500 },

    // Juárez
    { zone: "Juárez Centro", base: 17, lat: 25.6483, lng: -100.0967 },
    { zone: "Vistas del Río", base: 14, lat: 25.6300, lng: -100.1200 }
  ];

  return zones.map(z => {
    // Variación aleatoria de +/- 3 accidentes
    const accidents = Math.max(2, Math.floor(z.base + Math.random() * 6 - 3));
    let riskLevel: AccidentZone['riskLevel'] = 'Bajo';
    if (accidents >= 15) riskLevel = 'Crítico';
    else if (accidents >= 10) riskLevel = 'Alto';
    else if (accidents >= 6) riskLevel = 'Medio';

    return {
      zone: z.zone,
      accidents,
      riskLevel,
      lat: z.lat,
      lng: z.lng
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
    activeAlerts: zones.filter(z => z.riskLevel === 'Crítico').length
  };
};
