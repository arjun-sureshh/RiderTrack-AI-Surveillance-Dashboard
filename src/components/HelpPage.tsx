import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  Book,
  Video,
  Download,
  Send,
  Users,
  Camera,
  Settings,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HelpPageProps {
  selectedStore: string;
}

export function HelpPage({ selectedStore }: HelpPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      questions: [
        {
          q: 'How do I access the RiderTrack surveillance system?',
          a: 'You can access RiderTrack through your web browser using your provided credentials. The system is available 24/7 and supports all modern browsers. Contact your IT administrator if you need login credentials.'
        },
        {
          q: 'What are the different dashboard views available?',
          a: 'RiderTrack offers 5 main views: Dashboard (overview and analytics), Live Feed (real-time camera monitoring), Agents (agent management), Alerts (notification management), Reports (analytics and insights), and Past Feed (historical footage review).'
        },
        {
          q: 'How do I switch between different store locations?',
          a: 'Use the store selector dropdown in the top header to switch between different BigBasket dark store locations. Your permissions determine which stores you can access.'
        }
      ]
    },
    {
      id: 'camera-monitoring',
      title: 'Camera & Monitoring',
      icon: Camera,
      questions: [
        {
          q: 'Why is a camera showing as offline?',
          a: 'Camera offline status can occur due to network connectivity issues, power outages, or hardware failure. Check the system alerts for specific error messages. Contact technical support if the issue persists beyond 5 minutes.'
        },
        {
          q: 'How do I view multiple camera feeds simultaneously?',
          a: 'Use the Live Feed page which displays all active cameras in a grid layout. You can also use the Dashboard page for a thumbnail overview of all cameras with quick status indicators.'
        },
        {
          q: 'Can I control camera settings like zoom or angle?',
          a: 'Camera controls depend on the specific hardware installed. PTZ (Pan-Tilt-Zoom) cameras can be controlled through the camera control panel. Contact your technical administrator for camera-specific capabilities.'
        },
        {
          q: 'How do I review past footage?',
          a: 'Navigate to the Past Feed page where you can select specific cameras, date ranges, and time periods. Use the calendar picker and time controls to find the footage you need. Footage is typically retained for 30 days.'
        }
      ]
    },
    {
      id: 'agent-tracking',
      title: 'Agent Tracking',
      icon: Users,
      questions: [
        {
          q: 'How does the system detect if an agent is idle?',
          a: 'The system uses AI-powered facial recognition and movement detection to identify when agents remain stationary for extended periods. Default idle threshold is 15 minutes, which can be configured in alert settings.'
        },
        {
          q: 'What triggers surge pricing alerts?',
          a: 'Surge pricing alerts are triggered when multiple agents (typically 4+) are simultaneously idle during high-demand periods, or when delivery completion rates drop significantly during adverse conditions like rain or traffic.'
        },
        {
          q: 'How accurate is the agent location tracking?',
          a: 'Location tracking is based on camera coverage areas and has 95%+ accuracy within covered zones. The system can identify agents in Waiting Area, Loading Bays, Exit/Entry Gates, and Parking Areas.'
        },
        {
          q: 'Can I manually override agent status?',
          a: 'Yes, supervisors can manually update agent status through the Agents page. This is useful for correcting false positives or updating status during system maintenance.'
        }
      ]
    },
    {
      id: 'alerts',
      title: 'Alerts & Notifications',
      icon: Bell,
      questions: [
        {
          q: 'How do I configure alert thresholds?',
          a: 'Go to Alerts > Settings tab to configure thresholds for idle time, camera offline duration, performance metrics, and other parameters. Changes take effect immediately.'
        },
        {
          q: 'What notification methods are available?',
          a: 'RiderTrack supports push notifications, email alerts, SMS messages, and in-app audio alerts. You can configure which methods to use for different alert severities in the notification settings.'
        },
        {
          q: 'How do I escalate an alert?',
          a: 'Critical alerts auto-escalate after 10 minutes if unacknowledged. You can also manually escalate any alert by clicking the escalate button in the alert details panel.'
        },
        {
          q: 'Can I create custom alert rules?',
          a: 'Currently, RiderTrack supports predefined alert rules with configurable thresholds. Custom rule creation is available for enterprise accounts through technical support.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: Settings,
      questions: [
        {
          q: 'The system is running slowly. What can I do?',
          a: 'Try refreshing your browser, clearing cache, or switching to a different browser. Ensure you have a stable internet connection with at least 10 Mbps bandwidth for optimal performance.'
        },
        {
          q: 'I\'m not receiving alert notifications. How do I fix this?',
          a: 'Check your notification settings in Alerts > Settings. Verify your email address and phone number are correct. Check spam folders for email alerts and ensure push notifications are enabled in your browser.'
        },
        {
          q: 'Video playback is choppy or not loading.',
          a: 'This usually indicates bandwidth or browser issues. Try reducing the number of simultaneous camera feeds, refresh the page, or contact IT support to check network connectivity.'
        },
        {
          q: 'I can\'t access certain features or stores.',
          a: 'Feature access is role-based. Contact your system administrator to verify your user permissions and access levels. Some features may require manager-level access.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      title: 'Technical Support',
      description: '24/7 technical assistance for system issues',
      icon: Phone,
      contact: '+91 80-4040-1234',
      hours: 'Available 24/7',
      response: 'Immediate'
    },
    {
      title: 'Email Support',
      description: 'Detailed technical queries and documentation',
      icon: Mail,
      contact: 'ridertrack-support@patternai.com',
      hours: 'Mon-Fri, 9 AM - 6 PM',
      response: 'Within 4 hours'
    },
    {
      title: 'Live Chat',
      description: 'Quick answers and real-time assistance',
      icon: MessageSquare,
      contact: 'Available in-app',
      hours: 'Mon-Fri, 9 AM - 9 PM',
      response: 'Within 2 minutes'
    }
  ];

  const resources = [
    {
      title: 'User Manual',
      description: 'Complete system documentation',
      icon: Book,
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step training videos',
      icon: Video,
      type: 'Video Series',
      size: '12 videos'
    },
    {
      title: 'Quick Reference Guide',
      description: 'Essential features and shortcuts',
      icon: Download,
      type: 'PDF',
      size: '890 KB'
    }
  ];

  const systemStatus = [
    { service: 'Camera Feeds', status: 'operational', uptime: '99.9%' },
    { service: 'Alert System', status: 'operational', uptime: '99.8%' },
    { service: 'Data Processing', status: 'operational', uptime: '99.7%' },
    { service: 'Mobile App', status: 'maintenance', uptime: '98.5%' }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'maintenance': return 'text-orange-600';
      case 'issues': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'maintenance': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'issues': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl mb-2">Help & Support</h2>
        <p className="text-muted-foreground">Get assistance with RiderTrack surveillance system</p>
      </div>

      {/* Quick Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <HelpCircle className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <p className="text-2xl font-semibold">150+</p>
            <p className="text-sm text-muted-foreground">FAQ Articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <p className="text-2xl font-semibold">&lt; 2min</p>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <p className="text-2xl font-semibold">99.8%</p>
            <p className="text-sm text-muted-foreground">Issue Resolution Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQ articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {filteredFAQs.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    {category.title}
                    <Badge variant="secondary">{category.questions.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Support Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Get in Touch</h3>
              {contactMethods.map((method, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <method.icon className="w-5 h-5 mt-1 text-blue-500" />
                      <div className="flex-1">
                        <h4 className="font-medium">{method.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Contact:</span> {method.contact}</p>
                          <p><span className="font-medium">Hours:</span> {method.hours}</p>
                          <p><span className="font-medium">Response:</span> {method.response}</p>
                        </div>
                      </div>
                      <Button size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Ticket Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={ticketCategory} onValueChange={setTicketCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="account">Account & Access</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="training">Training & Documentation</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />

                <Textarea
                  placeholder="Describe your issue in detail..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows={6}
                />

                <div className="text-xs text-muted-foreground">
                  <p>Store: {selectedStore}</p>
                  <p>User ID: Current user will be automatically included</p>
                </div>

                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <resource.icon className="w-8 h-8 text-blue-500" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          <p>{resource.type}</p>
                          <p>{resource.size}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Pattern AI Labs Website</p>
                    <p className="text-sm text-muted-foreground">Learn more about our AI solutions</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Training Portal</p>
                    <p className="text-sm text-muted-foreground">Interactive training modules and certifications</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Community Forum</p>
                    <p className="text-sm text-muted-foreground">Connect with other RiderTrack users</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                          {service.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{service.uptime}</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">System Maintenance Completed</p>
                    <p className="text-xs text-muted-foreground">All services restored - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Zap className="w-4 h-4 mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Performance Improvements</p>
                    <p className="text-xs text-muted-foreground">Dashboard loading speed increased by 30% - 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Shield className="w-4 h-4 mt-0.5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Security Update</p>
                    <p className="text-xs text-muted-foreground">Enhanced encryption for agent data - 3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}