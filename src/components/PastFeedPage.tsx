import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Clock, Settings, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface PastFeedPageProps {
  selectedStore: string;
}

export function PastFeedPage({ selectedStore }: PastFeedPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('14:30');
  const [endTime, setEndTime] = useState('16:30');
  const [activeCamera, setActiveCamera] = useState('waiting-area');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(7200); // 2 hours in seconds
  const [volume, setVolume] = useState([75]);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Camera configurations
  const cameras = [
    { id: 'waiting-area', name: 'Waiting Area', status: 'online', location: 'Zone A', videoUrl: "/videos/footage7.mp4" },
    { id: 'loading-bay', name: 'Loading Bay', status: 'online', location: 'Zone B', videoUrl: "/videos/footage8.mp4" },
    { id: 'exit-gate', name: 'Exit Gate', status: 'online', location: 'Zone C', videoUrl: "/videos/footage9.mp4" },
    { id: 'entry-gate', name: 'Entry Gate', status: 'maintenance', location: 'Zone D', videoUrl: "/videos/footage10.mp4" },
  ];

  const timeSlots = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  const playbackSpeeds = ['0.5x', '1x', '1.5x', '2x'];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleSkipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const handleDownload = () => {
    const camera = cameras.find(c => c.id === activeCamera);
    console.log(`Downloading video clip: ${camera?.name} - ${formatDate(selectedDate)} ${startTime} to ${endTime}`);
  };

  // Mock timeline events for each camera
  const getTimelineEvents = (cameraId: string) => {
    const baseEvents = {
      'waiting-area': [
        { time: 300, type: 'agent-entry', description: 'Agent entered waiting area' },
        { time: 900, type: 'idle-start', description: 'Agent idle period started' },
        { time: 2100, type: 'alert', description: 'Idle alert triggered' },
        { time: 2400, type: 'agent-exit', description: 'Agent left for delivery' },
        { time: 4200, type: 'agent-entry', description: 'New agent arrived' },
      ],
      'loading-bay': [
        { time: 600, type: 'vehicle-arrival', description: 'Delivery vehicle arrived' },
        { time: 1200, type: 'loading-start', description: 'Loading process started' },
        { time: 1800, type: 'loading-complete', description: 'Loading completed' },
        { time: 2400, type: 'vehicle-departure', description: 'Vehicle departed' },
      ],
      'exit-gate': [
        { time: 450, type: 'agent-exit', description: 'Agent departed for delivery' },
        { time: 1800, type: 'agent-return', description: 'Agent returned from delivery' },
        { time: 3600, type: 'shift-change', description: 'Shift change detected' },
      ],
      'entry-gate': [
        { time: 200, type: 'agent-entry', description: 'Agent entered facility' },
        { time: 1500, type: 'visitor-arrival', description: 'Visitor checked in' },
        { time: 3000, type: 'maintenance', description: 'Maintenance activity' },
      ],
    };
    return baseEvents[cameraId as keyof typeof baseEvents] || [];
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const VideoPlayer = ({ cameraId }: { cameraId: string }) => {
    const camera = cameras.find(c => c.id === cameraId);
    const timelineEvents = getTimelineEvents(cameraId);

    return (
      <div className="space-y-6">
        {/* Video Player */}
        <Card>
          <CardContent className="p-0">
            {/* Video Display */}
            <div className="aspect-video bg-black rounded-t-lg relative overflow-hidden">
              {/* Mock video placeholder */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{camera?.name}</h3>
                  <p className="text-sm opacity-75">
                    {formatDate(selectedDate)} | {startTime} - {endTime}
                  </p>
                  <p className="text-xs opacity-50 mt-2">
                    {camera?.status === 'maintenance' ? 'Camera under maintenance' : 'Live feed simulation'}
                  </p>
                  {camera?.status === 'maintenance' && (
                    <Badge variant="destructive" className="mt-2">Maintenance</Badge>
                  )}
                </div>
              </div> */}
              <video
                src={camera?.videoUrl}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
              {/* Overlay info */}
              <div className="absolute top-4 left-4 bg-black/75 text-white px-3 py-1 rounded text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded text-sm">
                {playbackSpeed} | {camera?.location}
              </div>

              {camera?.status === 'online' && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/75 text-white px-3 py-1 rounded text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Recording
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="p-4 space-y-4">
              {/* Seekbar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleSeek}
                  max={duration}
                  step={1}
                  className="w-full"
                  disabled={camera?.status === 'maintenance'}
                />

                {/* Timeline Events */}
                <div className="relative h-6">
                  {timelineEvents.map((event, index) => (
                    <div
                      key={index}
                      className="absolute top-0 w-2 h-full cursor-pointer"
                      style={{ left: `${(event.time / duration) * 100}%` }}
                      onClick={() => setCurrentTime(event.time)}
                    >
                      <div className={`w-2 h-2 rounded-full ${event.type === 'alert' ? 'bg-red-500' :
                          event.type === 'idle-start' ? 'bg-orange-500' :
                            event.type === 'maintenance' ? 'bg-purple-500' :
                              'bg-blue-500'
                        }`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkipBackward}
                    disabled={camera?.status === 'maintenance'}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    disabled={camera?.status === 'maintenance'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkipForward}
                    disabled={camera?.status === 'maintenance'}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>

                  <Separator orientation="vertical" className="h-6 mx-2" />

                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-20"
                      disabled={camera?.status === 'maintenance'}
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Resolution: 1920x1080 | Codec: H.264
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Events */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline Events - {camera?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {timelineEvents.length > 0 ? (
              <div className="space-y-3">
                {timelineEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setCurrentTime(event.time)}
                  >
                    <div className={`w-3 h-3 rounded-full ${event.type === 'alert' ? 'bg-red-500' :
                        event.type === 'idle-start' ? 'bg-orange-500' :
                          event.type === 'maintenance' ? 'bg-purple-500' :
                            'bg-blue-500'
                      }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatTime(event.time)}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.type.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No events recorded for this time period</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Past Feed</h2>
          <p className="text-muted-foreground">{selectedStore} - Historical Video Review</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleDownload}>
          <Download className="w-4 h-4" />
          Export Clip
        </Button>
      </div>

      {/* Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Date Selection with Calendar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Date</span>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {formatDate(selectedDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
                  initialFocus
                  disabled={(date: Date | undefined) => !date || date > new Date() || date < new Date('2024-01-01')}
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Start Time Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Start Time</span>
            </div>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* End Time Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">End Time</span>
            </div>
            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Playback Speed */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Speed</span>
            </div>
            <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {playbackSpeeds.map(speed => (
                  <SelectItem key={speed} value={speed}>
                    {speed}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Camera Tabs */}
      <Tabs value={activeCamera} onValueChange={setActiveCamera} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {cameras.map((camera) => (
            <TabsTrigger
              key={camera.id}
              value={camera.id}
              className="flex items-center gap-2"
              disabled={camera.status === 'maintenance'}
            >
              <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`} />
              {camera.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {cameras.map((camera) => (
          <TabsContent key={camera.id} value={camera.id} className="mt-6">
            <VideoPlayer cameraId={camera.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}