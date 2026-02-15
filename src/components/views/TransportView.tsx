"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FiTruck, FiMapPin, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Mock data for transport units
const routes = [
  { id: 'R-01', name: 'Ruta 1 Directo', status: 'En Ruta', nextStop: 'Alameda', delay: 0 },
  { id: 'R-05', name: 'Ruta 5 Estanzuela', status: 'Retrasado', nextStop: 'Tecnológico', delay: 15 },
  { id: 'R-13', name: 'Ruta 13 Agropecuaria', status: 'En Ruta', nextStop: 'Solidaridad', delay: 2 },
  { id: 'R-23', name: 'Ruta 23 Cedros', status: 'En Taller', nextStop: 'N/A', delay: 0 },
  { id: 'R-113', name: 'Ruta 113 Túnel', status: 'En Ruta', nextStop: 'Valle Oriente', delay: 5 },
  { id: 'R-214', name: 'Ruta 214 Guadalupe', status: 'En Ruta', nextStop: 'Estadio BBVA', delay: 0 },
];

export default function TransportView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Gestión de Transporte</h2>
        <p className="text-muted-foreground mt-1">
          Monitoreo de unidades de transporte público y estado de las rutas.
        </p>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar ruta o unidad..."
          className="w-full md:w-1/3 px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Filtrar
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoutes.map((route) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">
                  {route.id}
                </CardTitle>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  route.status === 'En Ruta' ? 'bg-emerald-500/20 text-emerald-500' :
                  route.status === 'Retrasado' ? 'bg-red-500/20 text-red-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {route.status}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center text-sm">
                    <FiTruck className="mr-2 text-muted-foreground" />
                    <span className="font-medium">{route.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FiMapPin className="mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Próxima parada: </span>
                    <span className="ml-1 font-medium">{route.nextStop}</span>
                  </div>
                  {route.delay > 0 && (
                    <div className="flex items-center text-sm text-red-400">
                      <FiClock className="mr-2" />
                      <span>+{route.delay} min de retraso</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
