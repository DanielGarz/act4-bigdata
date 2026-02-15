"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FiSave, FiMoon, FiSun, FiBell, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SettingsView() {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Ajustes</h2>
        <p className="text-muted-foreground mt-1">
          Configuración general de la plataforma y preferencias de usuario.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Apariencia</CardTitle>
            <CardDescription>Personaliza cómo se ve el dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <FiMoon className="text-primary" />
                <span className="font-medium">Tema Oscuro</span>
              </div>
              <button 
                onClick={() => setTheme('dark')}
                className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${theme === 'dark' ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
              >
                <motion.div layout className="w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <FiSun className="text-muted-foreground" />
                <span className="font-medium text-muted-foreground">Tema Claro (Próximamente)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>Gestiona las alertas que recibes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <FiBell className="text-primary" />
                <span className="font-medium">Alertas de Tráfico Crítico</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${notifications ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
              >
                <motion.div layout className="w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <FiLock className="text-primary" />
                <span className="font-medium">Alertas de Seguridad</span>
              </div>
              <button className="w-12 h-6 rounded-full bg-primary flex items-center px-1 justify-end">
                <div className="w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Perfil de Usuario</CardTitle>
            <CardDescription>Información de la cuenta activa.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <input type="text" defaultValue="Daniel Garza" className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" defaultValue="admin@regiovial.mx" className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="pt-4">
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  <FiSave />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
