import React from 'react';
import { ChevronDown, Settings, User, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface HeaderProps {
  selectedStore: string;
  onStoreChange: (store: string) => void;
}

export function Header({ selectedStore, onStoreChange }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">RiderTrack</h1>
            <p className="text-xs text-muted-foreground">by Pattern AI Labs</p>
          </div>
        </div>
        
        <div className="w-px h-8 bg-border"></div>
        
        <Select value={selectedStore} onValueChange={onStoreChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BB Now #14">BB Now #14</SelectItem>
            <SelectItem value="BB Now #18">BB Now #18</SelectItem>
            <SelectItem value="BB Now #22">BB Now #22</SelectItem>
            <SelectItem value="BB Now #35">BB Now #35</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0">
            <span className="sr-only">3 alerts</span>
          </Badge>
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}