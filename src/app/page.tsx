"use client";

import { useState } from "react";
import Sidebar, { ViewType } from "@/components/Sidebar";
import Overview from "@/components/views/Overview";
import HeatmapView from "@/components/views/HeatmapView";
import TransportView from "@/components/views/TransportView";
import AnalyticsView from "@/components/views/AnalyticsView";
import SettingsView from "@/components/views/SettingsView";
import { FiMenu } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('overview');

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Overview />;
      case 'heatmap':
        return <HeatmapView />;
      case 'transport':
        return <TransportView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Overview />;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden p-4 border-b border-border flex items-center justify-between bg-card sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
             <FaCar className="text-primary-foreground w-4 h-4" />
          </div>
          <span className="font-bold">RegioVial</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-muted-foreground hover:bg-secondary rounded-lg"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <div className="flex-1 w-full md:ml-64 p-4 md:p-8 overflow-y-auto h-[calc(100vh-65px)] md:h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
