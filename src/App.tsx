import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ReportsPage } from './components/ReportsPage';
import { PastFeedPage } from './components/PastFeedPage';
import { LiveFeedPage } from './components/LiveFeedPage';
import { AgentsPage } from './components/AgentsPage';
import { AlertsPage } from './components/AlertsPage';
import { HelpPage } from './components/HelpPage';
import { MobileView } from './components/MobileView';
import { useMediaQuery } from './components/hooks/useMediaQuery';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'live-feed' | 'agents' | 'reports' | 'alerts' | 'past-feed' | 'help'>('dashboard');
  const [selectedStore, setSelectedStore] = useState('BB Now #14');
  const isMobile = useMediaQuery('(max-width: 768px)');


  if (isMobile) {
    return (
      <MobileView 
        selectedStore={selectedStore}
        currentView={currentView}
        onViewChange={setCurrentView}
        onStoreChange={setSelectedStore}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedStore={selectedStore} 
        onStoreChange={setSelectedStore} 
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        
        <main className="flex-1 overflow-auto">
          {currentView === 'dashboard' && <Dashboard selectedStore={selectedStore} />}
          {currentView === 'reports' && <ReportsPage selectedStore={selectedStore} />}
          {currentView === 'past-feed' && <PastFeedPage selectedStore={selectedStore} />}
          {currentView === 'live-feed' && <LiveFeedPage selectedStore={selectedStore} />}
          {currentView === 'agents' && <AgentsPage selectedStore={selectedStore} />}
          {currentView === 'alerts' && <AlertsPage selectedStore={selectedStore} />}
          {currentView === 'help' && <HelpPage selectedStore={selectedStore} />}
        </main>
      </div>
    </div>
  );
}