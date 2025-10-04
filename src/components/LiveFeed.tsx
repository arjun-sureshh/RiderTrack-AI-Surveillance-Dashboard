import React from 'react';
import { AlertTriangle, CheckCircle, Users, Truck } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function LiveFeed() {
  const cameraFeeds = [
    {
      id: 1,
      name: 'Waiting Area',
      status: 'warning',
      alert: '3 idle flagged',
      icon: Users,
      activeCount: 8,
      background: 'bg-gradient-to-br from-orange-100 to-orange-200'
    },
    {
      id: 2,
      name: 'Loading Bay',
      status: 'active',
      alert: '2 active pickups',
      icon: Truck,
      activeCount: 2,
      background: 'bg-gradient-to-br from-green-100 to-green-200'
    },
    {
      id: 3,
      name: 'Exit Gate',
      status: 'active',
      alert: '1 agent leaving',
      icon: CheckCircle,
      activeCount: 1,
      background: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      id: 4,
      name: 'Entry Gate',
      status: 'normal',
      alert: 'No activity',
      icon: Users,
      activeCount: 0,
      background: 'bg-gradient-to-br from-gray-100 to-gray-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cameraFeeds.map((feed) => (
        <Card key={feed.id} className={`p-4 relative overflow-hidden ${feed.background}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-medium">{feed.name}</h3>
              <p className="text-sm text-muted-foreground">Camera {feed.id}</p>
            </div>
            <Badge 
              variant={feed.status === 'warning' ? 'destructive' : feed.status === 'active' ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              {feed.status === 'warning' && <AlertTriangle className="w-3 h-3" />}
              {feed.activeCount}
            </Badge>
          </div>
          
          {/* Mock camera view */}
          <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center mb-3">
            <feed.icon className="w-8 h-8 text-muted-foreground/50" />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">{feed.alert}</span>
            {feed.status === 'warning' && (
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}