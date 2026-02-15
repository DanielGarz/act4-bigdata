"use client";

import { motion } from 'framer-motion';
import { AccidentZone } from '@/lib/data';
import { clsx } from 'clsx';

interface AccidentHeatmapProps {
  data: AccidentZone[];
}

export default function AccidentHeatmap({ data }: AccidentHeatmapProps) {
  // Ordenar por accidentes para el gradiente visual
  const maxAccidents = Math.max(...data.map(d => d.accidents));

  const getIntensityColor = (accidents: number) => {
    const intensity = accidents / maxAccidents;
    if (intensity > 0.8) return "bg-red-500/80 hover:bg-red-500";
    if (intensity > 0.6) return "bg-orange-500/80 hover:bg-orange-500";
    if (intensity > 0.4) return "bg-yellow-500/80 hover:bg-yellow-500";
    return "bg-emerald-500/80 hover:bg-emerald-500";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[300px]">
      {data.map((zone, index) => (
        <motion.div
          key={zone.zone}
          layoutId={zone.zone}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={clsx(
            "relative rounded-xl p-4 flex flex-col justify-between overflow-hidden cursor-pointer transition-colors",
            getIntensityColor(zone.accidents)
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          <div className="z-10">
            <h4 className="font-bold text-white text-lg">{zone.zone}</h4>
            <span className="text-xs text-white/80 font-medium uppercase tracking-wider">{zone.riskLevel} Risk</span>
          </div>

          <div className="z-10 flex items-end justify-end">
            <span className="text-3xl font-bold text-white">{zone.accidents}</span>
            <span className="text-xs text-white/70 ml-1 mb-1">accidentes</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
