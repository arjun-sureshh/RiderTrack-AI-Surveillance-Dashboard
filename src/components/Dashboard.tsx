import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Users,
  Camera,
  AlertTriangle,
  TrendingUp,
  Clock,
  MapPin,
  Activity,
  Shield,
  Eye,
  Timer,
  CheckCircle,
  XCircle,
  Zap,
  BarChart3,
  Settings
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  selectedStore: string;
}

export function Dashboard({ selectedStore }: DashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Mock data for dashboard
  const kpiData = {
    totalAgents: 24,
    activeAgents: 18,
    idleAgents: 6,
    alerts: 3,
    avgDeliveryTime: 28,
    efficiencyScore: 87,
    camerasOnline: 12,
    totalCameras: 15
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'idle',
      message: 'Agent ID #A127 idle for 15+ minutes',
      time: '2 min ago',
      severity: 'high',
      camera: 'Waiting Area'
    },
    {
      id: 2,
      type: 'system',
      message: 'Camera offline: Loading Bay #2',
      time: '5 min ago',
      severity: 'medium',
      camera: 'Loading Bay'
    },
    {
      id: 3,
      type: 'surge',
      message: 'Potential surge pricing detected',
      time: '12 min ago',
      severity: 'high',
      camera: 'Multiple'
    }
  ];

  const hourlyData = [
    { hour: '00:00', agents: 8, deliveries: 12, efficiency: 85 },
    { hour: '04:00', agents: 6, deliveries: 8, efficiency: 82 },
    { hour: '08:00', agents: 15, deliveries: 45, efficiency: 90 },
    { hour: '12:00', agents: 22, deliveries: 78, efficiency: 88 },
    { hour: '16:00', agents: 18, deliveries: 65, efficiency: 87 },
    { hour: '20:00', agents: 12, deliveries: 32, efficiency: 85 }
  ];

  const agentStatusData = [
    { name: 'Active', value: 18, color: '#22c55e' },
    { name: 'Idle', value: 6, color: '#f59e0b' },
    { name: 'Offline', value: 3, color: '#ef4444' }
  ];

  const cameraFeeds = [
    { id: 1, name: 'Waiting Area', status: 'online', alerts: 1, location: 'Zone A', videoUrl: "/videos/footage1.mp4" },
    { id: 2, name: 'Loading Bay #1', status: 'online', alerts: 0, location: 'Zone B', videoUrl: "/videos/footage6.mp4" },
    { id: 3, name: 'Loading Bay #2', status: 'offline', alerts: 1, location: 'Zone B', videoUrl: "/videos/footage3.mp4" },
    { id: 4, name: 'Exit Gate', status: 'online', alerts: 0, location: 'Zone C', videoUrl: "/videos/footage4.mp4" },
    { id: 5, name: 'Entry Gate', status: 'online', alerts: 0, location: 'Zone D', videoUrl: "/videos/footage5.mp4" },
    { id: 6, name: 'Parking Area', status: 'maintenance', alerts: 0, location: 'Zone E', videoUrl: "/videos/footage2.mp4" }
  ];

  const systemHealth = {
    server: 98,
    network: 95,
    storage: 78,
    cameras: 89
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'idle': return Timer;
      case 'system': return Settings;
      case 'surge': return TrendingUp;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Dashboard</h2>
          <p className="text-muted-foreground">{selectedStore} - Real-time Operations Monitor</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All Cameras
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Full Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-semibold">{kpiData.totalAgents}</p>
                <p className="text-xs text-green-600">+2 from yesterday</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-semibold text-green-600">{kpiData.activeAgents}</p>
                <p className="text-xs text-muted-foreground">{kpiData.idleAgents} idle</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-semibold text-red-600">{kpiData.alerts}</p>
                <p className="text-xs text-red-600">Requires attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency Score</p>
                <p className="text-2xl font-semibold text-blue-600">{kpiData.efficiencyScore}%</p>
                <p className="text-xs text-green-600">+3% from last week</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Overview</CardTitle>
                <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="24h">24H</TabsTrigger>
                    <TabsTrigger value="7d">7D</TabsTrigger>
                    <TabsTrigger value="30d">30D</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    label={{ value: 'Time (Hours)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="deliveries" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="agents" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Live Camera Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Live Camera Feed Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {cameraFeeds.slice(0, 6).map((camera) => (
                  <div key={camera.id} className="relative">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        {/* <Camera className="w-6 h-6 text-white opacity-50" /> */}
                        <video
                          src={camera.videoUrl}
                          autoPlay
                          muted
                          loop
                          preload="none"   // 👈 important
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' :
                          camera.status === 'offline' ? 'bg-red-500' : 'bg-orange-500'
                          }`} />
                        <span className="text-white text-xs">{camera.name}</span>
                      </div>
                      {camera.alerts > 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="destructive" className="text-xs">{camera.alerts}</Badge>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 text-white text-xs opacity-75">
                        {camera.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Alerts and Status */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Alerts</CardTitle>
                <Badge variant="destructive">{recentAlerts.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => {
                const IconComponent = getSeverityIcon(alert.type);
                return (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <IconComponent className="w-4 h-4 mt-0.5 text-red-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {alert.camera}
                      </p>
                    </div>
                  </div>
                );
              })}
              <Button variant="outline" className="w-full" size="sm">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Agent Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={agentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {agentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {agentStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Server</span>
                  </div>
                  <span className="text-sm font-medium">{systemHealth.server}%</span>
                </div>
                <Progress value={systemHealth.server} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Network</span>
                  </div>
                  <span className="text-sm font-medium">{systemHealth.network}%</span>
                </div>
                <Progress value={systemHealth.network} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Storage</span>
                  </div>
                  <span className="text-sm font-medium">{systemHealth.storage}%</span>
                </div>
                <Progress value={systemHealth.storage} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Cameras</span>
                  </div>
                  <span className="text-sm font-medium">{kpiData.camerasOnline}/{kpiData.totalCameras}</span>
                </div>
                <Progress value={(kpiData.camerasOnline / kpiData.totalCameras) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All Cameras
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Manage Agents
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alert Settings
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}