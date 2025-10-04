import React, { useState } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ReportsPageProps {
  selectedStore: string;
}

export function ReportsPage({ selectedStore }: ReportsPageProps) {
  const [dateRange, setDateRange] = useState('7-days');

  // Mock data for charts
  const idleVsEngagedData = [
    { day: 'Mon', idle: 15, engaged: 85 },
    { day: 'Tue', idle: 20, engaged: 80 },
    { day: 'Wed', idle: 12, engaged: 88 },
    { day: 'Thu', idle: 18, engaged: 82 },
    { day: 'Fri', idle: 25, engaged: 75 },
    { day: 'Sat', idle: 30, engaged: 70 },
    { day: 'Sun', idle: 22, engaged: 78 },
  ];

  const costSavingsData = [
    { day: 'Mon', savings: 1200 },
    { day: 'Tue', savings: 1800 },
    { day: 'Wed', savings: 2200 },
    { day: 'Thu', savings: 1600 },
    { day: 'Fri', savings: 2800 },
    { day: 'Sat', savings: 3200 },
    { day: 'Sun', savings: 2400 },
  ];

  const productivityData = [
    { name: 'High Performers', value: 60, color: '#10b981' },
    { name: 'Average', value: 30, color: '#f59e0b' },
    { name: 'Needs Improvement', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reports & Analytics</h2>
          <p className="text-muted-foreground">{selectedStore} - Performance Overview</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-days">7 Days</SelectItem>
              <SelectItem value="30-days">30 Days</SelectItem>
              <SelectItem value="90-days">90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg Idle Time / Agent</p>
            <p className="text-2xl font-semibold mt-1">12 min</p>
            <p className="text-xs text-green-600 mt-1">↓ 15% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Surge Incidents Prevented</p>
            <p className="text-2xl font-semibold mt-1">4</p>
            <p className="text-xs text-green-600 mt-1">↑ 2 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Cost Savings</p>
            <p className="text-2xl font-semibold mt-1">₹1.3L</p>
            <p className="text-xs text-green-600 mt-1">↑ 28% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">NPS Gain</p>
            <p className="text-2xl font-semibold mt-1">+8%</p>
            <p className="text-xs text-green-600 mt-1">↑ 3% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Idle vs Engaged Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Idle vs Engaged Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={idleVsEngagedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="idle" fill="#f59e0b" name="Idle %" />
                <Bar dataKey="engaged" fill="#10b981" name="Engaged %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Savings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Savings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Savings']} />
                <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Productivity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Productivity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {productivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Agents Monitored</span>
              <span className="font-semibold">154</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Response Time</span>
              <span className="font-semibold">2.3 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">System Uptime</span>
              <span className="font-semibold text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">False Positives</span>
              <span className="font-semibold">0.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}