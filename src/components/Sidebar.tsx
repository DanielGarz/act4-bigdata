"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiPieChart,
  FiMap,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiTruck,
  FiX
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import { cn } from '@/components/ui/card';

export type ViewType = 'overview' | 'heatmap' | 'transport' | 'analytics' | 'settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors duration-200 group",
        active
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <Icon className={cn("w-5 h-5 mr-3", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
      <span className="font-medium text-sm">{label}</span>
    </motion.button>
  );
};

export default function Sidebar({ isOpen, onClose, currentView, onNavigate }: SidebarProps) {

  const handleNavigation = (view: ViewType) => {
    onNavigate(view);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FaCar className="text-primary-foreground w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Regio<span className="text-primary">Vial</span></h1>
          </div>
          <button onClick={onClose} className="md:hidden text-muted-foreground hover:text-foreground">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Dashboards</h3>
            <SidebarItem
              icon={FiHome}
              label="Overview"
              active={currentView === 'overview'}
              onClick={() => handleNavigation('overview')}
            />
            <SidebarItem
              icon={FiMap}
              label="Mapa de Calor"
              active={currentView === 'heatmap'}
              onClick={() => handleNavigation('heatmap')}
            />
            <SidebarItem
              icon={FiTruck}
              label="Transporte"
              active={currentView === 'transport'}
              onClick={() => handleNavigation('transport')}
            />
            <SidebarItem
              icon={FiPieChart}
              label="Analytics"
              active={currentView === 'analytics'}
              onClick={() => handleNavigation('analytics')}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Configuración</h3>
            <SidebarItem
              icon={FiSettings}
              label="Ajustes"
              active={currentView === 'settings'}
              onClick={() => handleNavigation('settings')}
            />
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <div className="bg-secondary/50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Estado del sistema</span>
              <span className="text-xs font-bold text-primary">En línea</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full w-[98%]"></div>
            </div>
          </div>
          <SidebarItem icon={FiLogOut} label="Cerrar Sesión" onClick={() => {}} />
        </div>
      </div>
    </>
  );
}
