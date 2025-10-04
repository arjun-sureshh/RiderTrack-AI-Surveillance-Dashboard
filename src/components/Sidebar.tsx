import React from 'react';
import { LayoutDashboard, Video, Users, BarChart3, AlertTriangle, History, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'live-feed' | 'agents' | 'reports' | 'alerts' | 'past-feed' | 'help') => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-feed', label: 'Live Feed', icon: Video },
    { id: 'past-feed', label: 'Past Feed', icon: History },
    { id: 'agents', label: 'Agents', icon: Users, badge: 5 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 3, variant: 'destructive' as const },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? 'secondary' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => onViewChange(item.id as any)}
          >
            <item.icon className="w-4 h-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge variant={item.variant || 'secondary'} className="ml-auto">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>
    </aside>
  );
}