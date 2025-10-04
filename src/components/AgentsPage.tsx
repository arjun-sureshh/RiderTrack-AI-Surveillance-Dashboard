import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  Star,
  Award,
  Target,
  Activity,
  Timer,
  Truck,
  Eye,
  Edit,
  Ban,
  UserCheck,
  Download,
  Upload,
  Plus
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface AgentsPageProps {
  selectedStore: string;
}

interface Agent {
  id: string;
  name: string;
  photo?: string;
  status: 'active' | 'idle' | 'delivery' | 'offline' | 'break';
  phone: string;
  email: string;
  joinDate: string;
  rating: number;
  totalDeliveries: number;
  completionRate: number;
  avgDeliveryTime: number;
  idleTime: string;
  currentLocation: string;
  shift: string;
  earnings: number;
  warnings: number;
  badges: string[];
}

export function AgentsPage({ selectedStore }: AgentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock agent data
  const agents: Agent[] = [
    {
      id: 'A001',
      name: 'Raja Iyer',
      status: 'active',
      phone: '+91 98765 43210',
      email: 'raja.i@bigbasket.com',
      joinDate: '2023-06-15',
      rating: 4.8,
      totalDeliveries: 1247,
      completionRate: 96.5,
      avgDeliveryTime: 18,
      idleTime: '2m',
      currentLocation: 'Loading Bay #2',
      shift: '06:00 - 14:00',
      earnings: 45600,
      warnings: 0,
      badges: ['Top Performer', 'Speed Demon']
    },
    {
      id: 'A002',
      name: 'Ekbal Hassan',
      status: 'delivery',
      phone: '+91 98765 43211',
      email: 'ekbal.h@bigbasket.com',
      joinDate: '2023-04-20',
      rating: 4.6,
      totalDeliveries: 1089,
      completionRate: 94.2,
      avgDeliveryTime: 22,
      idleTime: '0m',
      currentLocation: 'Customer Location',
      shift: '14:00 - 22:00',
      earnings: 42300,
      warnings: 1,
      badges: ['Reliable']
    },
    {
      id: 'A003',
      name: 'Bharath Anand',
      status: 'idle',
      phone: '+91 98765 43212',
      email: 'bharath.a@bigbasket.com',
      joinDate: '2023-08-10',
      rating: 4.2,
      totalDeliveries: 756,
      completionRate: 89.1,
      avgDeliveryTime: 28,
      idleTime: '14m',
      currentLocation: 'Waiting Area',
      shift: '22:00 - 06:00',
      earnings: 32800,
      warnings: 2,
      badges: ['Night Shift']
    },
    {
      id: 'A004',
      name: 'Priya Sharma',
      status: 'active',
      phone: '+91 98765 43213',
      email: 'priya.s@bigbasket.com',
      joinDate: '2023-03-05',
      rating: 4.9,
      totalDeliveries: 1456,
      completionRate: 98.1,
      avgDeliveryTime: 16,
      idleTime: '1m',
      currentLocation: 'Exit Gate',
      shift: '06:00 - 14:00',
      earnings: 52400,
      warnings: 0,
      badges: ['Top Performer', 'Customer Favorite', 'Excellence Award']
    },
    {
      id: 'A005',
      name: 'Amit Kumar',
      status: 'break',
      phone: '+91 98765 43214',
      email: 'amit.k@bigbasket.com',
      joinDate: '2023-07-12',
      rating: 4.3,
      totalDeliveries: 892,
      completionRate: 91.3,
      avgDeliveryTime: 25,
      idleTime: '0m',
      currentLocation: 'Break Room',
      shift: '14:00 - 22:00',
      earnings: 38700,
      warnings: 1,
      badges: ['Consistent']
    },
    {
      id: 'A006',
      name: 'Rahul Mehta',
      status: 'offline',
      phone: '+91 98765 43215',
      email: 'rahul.m@bigbasket.com',
      joinDate: '2023-05-18',
      rating: 3.8,
      totalDeliveries: 634,
      completionRate: 85.7,
      avgDeliveryTime: 32,
      idleTime: 'N/A',
      currentLocation: 'Off Duty',
      shift: '22:00 - 06:00',
      earnings: 29500,
      warnings: 3,
      badges: []
    }
  ];

  // Performance data for charts
  const performanceData = [
    { name: 'Mon', deliveries: 24, efficiency: 92 },
    { name: 'Tue', deliveries: 28, efficiency: 95 },
    { name: 'Wed', deliveries: 22, efficiency: 88 },
    { name: 'Thu', deliveries: 31, efficiency: 97 },
    { name: 'Fri', deliveries: 29, efficiency: 94 },
    { name: 'Sat', deliveries: 35, efficiency: 96 },
    { name: 'Sun', deliveries: 26, efficiency: 90 }
  ];

  const agentStatusData = [
    { name: 'Active', value: 12, color: '#22c55e' },
    { name: 'Delivery', value: 8, color: '#3b82f6' },
    { name: 'Idle', value: 4, color: '#f59e0b' },
    { name: 'Break', value: 2, color: '#8b5cf6' },
    { name: 'Offline', value: 6, color: '#6b7280' }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'delivery': return 'bg-blue-500';
      case 'idle': return 'bg-orange-500';
      case 'break': return 'bg-purple-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'delivery': return 'default';
      case 'idle': return 'secondary';
      case 'break': return 'outline';
      case 'offline': return 'secondary';
      default: return 'secondary';
    }
  };

  const AgentCard = ({ agent }: { agent: Agent }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAgent(agent)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(agent.status)}`} />
            </div>
            <div>
              <h3 className="font-medium">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {agent.id}</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(agent.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{agent.rating}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />View Profile</DropdownMenuItem>
              <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />Edit Details</DropdownMenuItem>
              <DropdownMenuItem><Phone className="w-4 h-4 mr-2" />Call Agent</DropdownMenuItem>
              <DropdownMenuItem><Ban className="w-4 h-4 mr-2" />Suspend</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={getStatusBadge(agent.status) as any}>{agent.status}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Location</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-24">{agent.currentLocation}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Deliveries</span>
            <span className="font-medium">{agent.totalDeliveries}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Success Rate</span>
            <span className="font-medium text-green-600">{agent.completionRate}%</span>
          </div>
        </div>

        {agent.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {agent.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Agent Management</h2>
          <p className="text-muted-foreground">{selectedStore} - {filteredAgents.length} agents total</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Agents
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-semibold">32</p>
                <p className="text-xs text-green-600">+2 this month</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Now</p>
                <p className="text-2xl font-semibold text-green-600">20</p>
                <p className="text-xs text-muted-foreground">62.5% utilization</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-semibold text-blue-600">4.5★</p>
                <p className="text-xs text-green-600">+0.2 this week</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-2xl font-semibold text-red-600">3</p>
                <p className="text-xs text-red-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="delivery">On Delivery</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="break">On Break</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    label={{ value: 'Day of Week', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    label={{ value: 'Performance', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="deliveries" stroke="#3b82f6" name="Deliveries" />
                  <Line type="monotone" dataKey="efficiency" stroke="#10b981" name="Efficiency %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Agent Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={agentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={2}
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

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agents
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 5)
                  .map((agent, index) => (
                    <div key={agent.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {index + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{agent.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-muted-foreground">{agent.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{agent.totalDeliveries}</p>
                        <p className="text-xs text-green-600">{agent.completionRate}%</p>
                      </div>
                    </div>
                  ))}
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
                <UserCheck className="w-4 h-4 mr-2" />
                Check In All
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Timer className="w-4 h-4 mr-2" />
                Schedule Shifts
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Truck className="w-4 h-4 mr-2" />
                Assign Deliveries
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg border">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">Agent A003 idle for 15+ minutes</p>
                    <p className="text-xs text-muted-foreground">5 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg border">
                  <Clock className="w-4 h-4 mt-0.5 text-orange-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">Shift change at 14:00</p>
                    <p className="text-xs text-muted-foreground">45 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg border">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">Agent A004 completed 50 deliveries</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}