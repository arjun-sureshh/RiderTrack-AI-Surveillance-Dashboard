import React from 'react';
import { Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function KPICards() {
  const kpis = [
    {
      label: 'Total Agents',
      value: '22',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Idle',
      value: '5',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      badge: 'warning'
    },
    {
      label: 'Engaged',
      value: '15',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Surge Alerts',
      value: '1',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      badge: 'risk'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
                {kpi.badge && (
                  <Badge 
                    variant={kpi.badge === 'warning' ? 'secondary' : 'destructive'} 
                    className="mt-2"
                  >
                    {kpi.badge}
                  </Badge>
                )}
              </div>
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}