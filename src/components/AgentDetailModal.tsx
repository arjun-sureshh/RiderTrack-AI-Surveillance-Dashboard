import React from 'react';
import { X, MapPin, Clock, Truck, Bell, Flag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'delivery';
  idleTime: string;
  location: string;
}

interface AgentDetailModalProps {
  agent: Agent;
  onClose: () => void;
}

export function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  const timeline = [
    { time: '10:05', event: 'Store Entry', detail: 'Face recognized', icon: MapPin, status: 'completed' },
    { time: '10:08', event: 'Idle in Waiting Area', detail: 'Started waiting', icon: Clock, status: 'warning' },
    { time: '10:30', event: 'Alert triggered', detail: 'Idle >15 minutes', icon: Bell, status: 'alert' },
    { time: '10:45', event: 'Assigned Delivery', detail: 'Order #BB-2024-1234', icon: Truck, status: 'active' },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Agent Details</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Agent Profile */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="text-muted-foreground">Agent ID: {agent.id.padStart(6, 'RDR')}</p>
                  <p className="text-muted-foreground">Store: BB Now #14</p>
                  <Badge 
                    variant={agent.status === 'idle' ? 'secondary' : 'default'}
                    className="mt-2"
                  >
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      item.status === 'completed' ? 'bg-green-100 text-green-600' :
                      item.status === 'warning' ? 'bg-orange-100 text-orange-600' :
                      item.status === 'alert' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.time}</span>
                        <span className="text-sm text-muted-foreground">→</span>
                        <span>{item.event}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-orange-600">25 min</p>
                <p className="text-sm text-muted-foreground">Idle Time Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-green-600">40 min</p>
                <p className="text-sm text-muted-foreground">Active Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-blue-600">3</p>
                <p className="text-sm text-muted-foreground">Deliveries Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1 gap-2">
              <Bell className="w-4 h-4" />
              Notify Agent
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Flag className="w-4 h-4" />
              Flag for Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}