import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'delivery';
  idleTime: string;
  location: string;
  profilePic?: string;
}

interface AgentListProps {
  onAgentSelect: (agent: Agent) => void;
}

export function AgentList({ onAgentSelect }: AgentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium mb-3">Agent List</h3>
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
              onClick={() => onAgentSelect(agent)}
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
                  <span className="text-xs text-muted-foreground">{agent.location}</span>
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
  );
}