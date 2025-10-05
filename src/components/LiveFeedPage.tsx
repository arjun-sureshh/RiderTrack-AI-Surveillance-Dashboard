import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
  CheckCircle,
  Camera,
  Maximize2,
  Volume2,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap,
  MapPin,
  Activity,
  VolumeX
} from 'lucide-react';
import { AgentDetailModal } from './AgentDetailModal';

interface LiveFeedPageProps {
  selectedStore: string;
}

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'delivery';
  idleTime: string;
  location: string;
  profilePic?: string;
}

export function LiveFeedPage({ selectedStore }: LiveFeedPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCamera, setActiveCamera] = useState('waiting-area');
  const [isPlaying, setIsPlaying] = useState(true); // Starts as playing due to autoPlay intent
  const [isMuted, setIsMuted] = useState(true); // Starts as muted

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // Mock data for KPIs
  const kpis = [
    {
      label: 'Total Agents',
      value: '22',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 today'
    },
    {
      label: 'Idle',
      value: '5',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      badge: 'warning',
      change: '3 flagged'
    },
    {
      label: 'Engaged',
      value: '15',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '68% efficiency'
    },
    {
      label: 'Surge Alerts',
      value: '1',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      badge: 'critical',
      change: 'Active now'
    }
  ];

  // Mock data for camera feeds
  const cameraFeeds = [
    {
      id: 'waiting-area',
      name: 'Waiting Area',
      status: 'warning',
      alert: '3 agents idle 15+ mins',
      activeCount: 8,
      background: 'bg-gradient-to-br from-orange-100 to-orange-200',
      location: 'Zone A',
      resolution: '1920x1080',
      videoUrl: "/videos/footage1.mp4"
    },
    {
      id: 'loading-bay-1',
      name: 'Loading Bay #1',
      status: 'active',
      alert: '2 active pickups',
      activeCount: 2,
      background: 'bg-gradient-to-br from-green-100 to-green-200',
      location: 'Zone B',
      resolution: '1920x1080',
      videoUrl: "/videos/footage3.mp4"
    },
    {
      id: 'loading-bay-2',
      name: 'Loading Bay #2',
      status: 'normal',
      alert: 'Ready for pickup',
      activeCount: 0,
      background: 'bg-gradient-to-br from-blue-100 to-blue-200',
      location: 'Zone B',
      resolution: '1920x1080',
      videoUrl: "/videos/footage15.mp4"
    },
    {
      id: 'exit-gate',
      name: 'Exit Gate',
      status: 'active',
      alert: '1 agent departing',
      activeCount: 1,
      background: 'bg-gradient-to-br from-purple-100 to-purple-200',
      location: 'Zone C',
      resolution: '1920x1080',
      videoUrl: "/videos/footage12.mp4"
    },
    {
      id: 'entry-gate',
      name: 'Entry Gate',
      status: 'normal',
      alert: 'No current activity',
      activeCount: 0,
      background: 'bg-gradient-to-br from-gray-100 to-gray-200',
      location: 'Zone D',
      resolution: '1920x1080',
      videoUrl: "/videos/footage14.mp4"
    },
    {
      id: 'parking-area',
      name: 'Parking Area',
      status: 'active',
      alert: '4 vehicles parked',
      activeCount: 4,
      background: 'bg-gradient-to-br from-teal-100 to-teal-200',
      location: 'Zone E',
      resolution: '1920x1080',
      videoUrl: "/videos/footage7.mp4"
    }
  ];

  // Mock data for agents
  const agents: Agent[] = [
    { id: '1', name: 'Raja I', status: 'idle', idleTime: '22 min', location: 'Waiting Area' },
    { id: '2', name: 'Ekbal H', status: 'active', idleTime: '0', location: 'Delivery Run' },
    { id: '3', name: 'Bharath A', status: 'idle', idleTime: '14 min', location: 'Waiting Area' },
    { id: '4', name: 'Priya S', status: 'delivery', idleTime: '0', location: 'En Route' },
    { id: '5', name: 'Amit K', status: 'active', idleTime: '2 min', location: 'Loading Bay' },
    { id: '6', name: 'Rahul M', status: 'idle', idleTime: '8 min', location: 'Waiting Area' },
    { id: '7', name: 'Deepak R', status: 'delivery', idleTime: '0', location: 'Customer Location' },
    { id: '8', name: 'Suresh V', status: 'active', idleTime: '1 min', location: 'Exit Gate' },
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'idle': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'delivery': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'text-orange-600';
      case 'active': return 'text-green-600';
      case 'delivery': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const CameraView = ({ camera }: { camera: any }) => (
    <Card className={`relative overflow-hidden ${camera.background}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-medium">{camera.name}</h3>
            <p className="text-sm text-muted-foreground">{camera.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={camera.status === 'warning' ? 'destructive' : camera.status === 'active' ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              {camera.status === 'warning' && <AlertTriangle className="w-3 h-3" />}
              {camera.activeCount}
            </Badge>
          </div>
        </div>

        {/* Live camera feed mockup */}
        <div className="aspect-video bg-black/90 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br " />
          {/* <Camera className="w-8 h-8 text-white/50 relative z-10" /> */}
          <video
            src={camera.videoUrl}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
          {/* Live indicator */}
          <div className="absolute top-2 left-2 flex items-center gap-2 bg-red-600 px-2 py-1 rounded text-white text-xs">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>

          {/* Camera controls overlay */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
              <Volume2 className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
              <Maximize2 className="w-3 h-3" />
            </Button>
          </div>

          {/* Resolution info */}
          <div className="absolute bottom-2 left-2 text-white text-xs opacity-75">
            {camera.resolution}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">{camera.alert}</span>
          {camera.status === 'warning' && (
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          )}
          {camera.status === 'active' && (
            <Activity className="w-4 h-4 text-green-600" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl">Live Feed Monitor</h2>
            <p className="text-muted-foreground">{selectedStore} - Real-time Surveillance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Camera Settings
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
                    {kpi.badge && (
                      <Badge
                        variant={kpi.badge === 'warning' ? 'secondary' : kpi.badge === 'critical' ? 'destructive' : 'default'}
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

        {/* Live Camera Feeds */}
        <Card>
          <CardHeader>
            <CardTitle>Live Camera Feeds</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeCamera} onValueChange={setActiveCamera}>
              <TabsList className="grid w-full grid-cols-6">
                {cameraFeeds.map((camera) => (
                  <TabsTrigger key={camera.id} value={camera.id} className="text-xs">
                    {camera.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {cameraFeeds.map((camera) => (
                <TabsContent key={camera.id} value={camera.id} className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Main Camera View */}
                    <div className="lg:col-span-2">
                      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            {/* <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" /> */}
                            <video
                              ref={videoRef}
                              src={camera.videoUrl}
                              loop
                              autoPlay
                              playsInline // Good for mobile
                              className="w-full h-full object-cover"
                              onPlay={handlePlay}
                              onPause={handlePause}
                            />
                            <h3 className="text-xl font-medium mb-2">{camera.name}</h3>
                            <p className="text-sm opacity-75">{camera.location} - {camera.resolution}</p>
                            <p className="text-sm opacity-50 mt-2">Live feed simulation</p>
                          </div>
                        </div>

                        {/* Live overlay */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded text-white text-sm">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>

                        {/* Status overlay */}
                        <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded text-sm">
                          {camera.alert}
                        </div>

                        {/* Camera controls */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                          <Button size="sm" variant="secondary" onClick={togglePlayPause}>
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="secondary" onClick={toggleMute}>
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Maximize2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* All Camera Grid View */}
        <Card>
          <CardHeader>
            <CardTitle>All Cameras Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {cameraFeeds.map((camera) => (
                <CameraView key={camera.id} camera={camera} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar - Agent List */}
      <div className="w-80 border-l border-border">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium mb-3">Agent Monitoring</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(agent.status)}
                      <span className="font-medium text-sm truncate">{agent.name}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {agent.location}
                      </span>
                      <Badge
                        variant={agent.status === 'idle' ? 'secondary' : 'outline'}
                        className={`text-xs ${getStatusColor(agent.status)}`}
                      >
                        {agent.idleTime}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}