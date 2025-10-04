import React from 'react';
import { Bell, BarChart3, Users, AlertTriangle, Menu, LayoutDashboard, Video, History, HelpCircle, ChevronDown, Clock, MapPin, Activity, TrendingUp, Eye, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from './ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface MobileViewProps {
  selectedStore: string;
  currentView: 'dashboard' | 'live-feed' | 'agents' | 'reports' | 'alerts' | 'past-feed' | 'help';
  onViewChange: (view: 'dashboard' | 'live-feed' | 'agents' | 'reports' | 'alerts' | 'past-feed' | 'help') => void;
  onStoreChange: (store: string) => void;
}

// Mobile-optimized components
function MobileDashboard({ selectedStore }: { selectedStore: string }) {
  return (
    <div className="space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">22</div>
            <div className="text-sm text-muted-foreground">Total Agents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-sm text-muted-foreground">Idle Agents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">HIGH</div>
            <div className="text-sm text-muted-foreground">Surge Risk</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">78%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Live Camera Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Waiting Area', 'Loading Bay', 'Exit Gate'].map((area, i) => (
            <div key={area} className="flex items-center justify-between p-3 bg-muted/50 rounded">
              <span className="text-sm">{area}</span>
              <Badge variant={i === 0 ? 'destructive' : i === 1 ? 'default' : 'secondary'}>
                {i === 0 ? '3 idle' : i === 1 ? '2 active' : '1 normal'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">3 agents idle &gt;15 min detected</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm">Agent Raj M. completed delivery</p>
              <p className="text-xs text-muted-foreground">5 minutes ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MobileLiveFeed({ selectedStore }: { selectedStore: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Camera Feed</h2>
        <Badge variant="outline">3 cameras</Badge>
      </div>
      
      {['Waiting Area', 'Loading Bay', 'Exit Gate'].map((area, i) => (
        <Card key={area}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              {area}
              <Badge variant={i === 0 ? 'destructive' : i === 1 ? 'default' : 'secondary'}>
                {i === 0 ? 'Alert' : i === 1 ? 'Active' : 'Normal'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded mb-3 flex items-center justify-center">
              <Video className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex justify-between text-sm">
              <span>Agents detected: {i === 0 ? '5' : i === 1 ? '2' : '1'}</span>
              <span className="text-muted-foreground">Live</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MobileAgents({ selectedStore }: { selectedStore: string }) {
  const agents = [
    { name: 'Raj M.', status: 'active', location: 'Loading Bay', idle: 0 },
    { name: 'Priya S.', status: 'idle', location: 'Waiting Area', idle: 18 },
    { name: 'Amit K.', status: 'idle', location: 'Waiting Area', idle: 22 },
    { name: 'Neha R.', status: 'active', location: 'Exit Gate', idle: 0 },
    { name: 'Rohit P.', status: 'idle', location: 'Waiting Area', idle: 15 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Agent Status</h2>
        <Badge variant="outline">{agents.length} agents</Badge>
      </div>
      
      <div className="space-y-3">
        {agents.map((agent, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{agent.name}</div>
                <Badge variant={agent.status === 'active' ? 'default' : 'destructive'}>
                  {agent.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {agent.location}
                </div>
                {agent.idle > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {agent.idle}m idle
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MobileAlerts({ selectedStore }: { selectedStore: string }) {
  const alerts = [
    { type: 'urgent', title: '3 agents idle &gt;15 min', desc: 'Surge risk detected', time: '2 min ago' },
    { type: 'warning', title: 'Agent Raja I - idle 22 min', desc: 'Waiting area', time: '5 min ago' },
    { type: 'info', title: 'Peak hour approaching', desc: 'Lunch time 12-2 PM', time: '10 min ago' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        <Badge variant="destructive">3 urgent</Badge>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <Card key={i} className={alert.type === 'urgent' ? 'border-red-200 bg-red-50' : alert.type === 'warning' ? 'border-orange-200 bg-orange-50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-4 h-4 mt-0.5 ${alert.type === 'urgent' ? 'text-red-600' : alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'}`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <div className="text-sm text-muted-foreground">{alert.desc}</div>
                  <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MobileReports({ selectedStore }: { selectedStore: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Reports & Analytics</h2>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Today
        </Button>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Total Deliveries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold">23 min</div>
            <div className="text-sm text-muted-foreground">Avg Idle Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Delivery Efficiency</span>
                <span>78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Agent Utilization</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>On-time Rate</span>
                <span>92%</span>
              </div>
              <Progress value={92} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MobilePastFeed({ selectedStore }: { selectedStore: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Past Recordings</h2>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Select Date
        </Button>
      </div>
      
      <div className="space-y-3">
        {[
          { time: '2:30 PM', event: 'Agent idle detected', camera: 'Waiting Area' },
          { time: '1:45 PM', event: 'Delivery completed', camera: 'Exit Gate' },
          { time: '12:20 PM', event: 'Peak hour started', camera: 'Loading Bay' },
          { time: '11:30 AM', event: 'Agent arrived', camera: 'Waiting Area' },
        ].map((record, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">{record.time}</div>
                <Badge variant="outline">{record.camera}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{record.event}</div>
              <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                <Eye className="w-3 h-3 mr-1" />
                View Recording
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MobileHelp({ selectedStore }: { selectedStore: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Help & Support</h2>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-16 flex-col">
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-xs">Call Support</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col">
          <Mail className="w-5 h-5 mb-1" />
          <span className="text-xs">Email Help</span>
        </Button>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frequently Asked</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <div className="font-medium mb-1">How to reset agent alerts?</div>
            <div className="text-muted-foreground">Go to Alerts → Select alert → Mark as resolved</div>
          </div>
          <Separator />
          <div className="text-sm">
            <div className="font-medium mb-1">Camera not working?</div>
            <div className="text-muted-foreground">Check network connection and contact IT support</div>
          </div>
          <Separator />
          <div className="text-sm">
            <div className="font-medium mb-1">Export daily reports?</div>
            <div className="text-muted-foreground">Reports → Select date range → Export button</div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>Support: +91-80-1234-5678</div>
          <div>Email: support@ridertrack.ai</div>
          <div>Hours: 24/7 Technical Support</div>
        </CardContent>
      </Card>
    </div>
  );
}

export function MobileView({ selectedStore, currentView, onViewChange, onStoreChange }: MobileViewProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-feed', label: 'Live Feed', icon: Video },
    { id: 'past-feed', label: 'Past Feed', icon: History },
    { id: 'agents', label: 'Agents', icon: Users, badge: 5 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 3, variant: 'destructive' as const },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const stores = [
    'BB Now #14',
    'BB Now #22', 
    'BB Now #7',
    'BB Now #31',
    'BB Now #18'
  ];

  const getCurrentViewTitle = () => {
    const item = menuItems.find(item => item.id === currentView);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <header className="bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-40 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access different sections of the RiderTrack surveillance system
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-2">
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
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm">RiderTrack</h1>
              <span className="text-xs text-muted-foreground">by Pattern AI Labs</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">{getCurrentViewTitle()}</p>
              <span className="text-xs text-muted-foreground">•</span>
              <Select value={selectedStore} onValueChange={onStoreChange}>
                <SelectTrigger className="h-6 text-xs border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:w-3 [&>svg]:h-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store} value={store} className="text-xs">
                      {store}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="relative flex-shrink-0">
          <Bell className="w-5 h-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0" />
        </Button>
      </header>

      {/* Mobile Content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-4 space-y-4 w-full max-w-full">
          {currentView === 'dashboard' && <MobileDashboard selectedStore={selectedStore} />}
          {currentView === 'reports' && <MobileReports selectedStore={selectedStore} />}
          {currentView === 'past-feed' && <MobilePastFeed selectedStore={selectedStore} />}
          {currentView === 'live-feed' && <MobileLiveFeed selectedStore={selectedStore} />}
          {currentView === 'agents' && <MobileAgents selectedStore={selectedStore} />}
          {currentView === 'alerts' && <MobileAlerts selectedStore={selectedStore} />}
          {currentView === 'help' && <MobileHelp selectedStore={selectedStore} />}
        </div>
      </main>
    </div>
  );
}