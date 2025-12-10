import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight
} from "lucide-react";

const serviceRequests = [
  {
    id: 1,
    type: "Adjustment",
    description: "Minor discomfort during extended walking",
    status: "in_progress",
    createdAt: "Dec 5, 2024",
    scheduledDate: "Dec 12, 2024",
    technician: "Dr. Maria Santos",
  },
  {
    id: 2,
    type: "Check-up",
    description: "Routine 6-month maintenance check",
    status: "scheduled",
    createdAt: "Nov 28, 2024",
    scheduledDate: "Dec 18, 2024",
    technician: "Dr. Alexander Petrov",
  },
  {
    id: 3,
    type: "Consultation",
    description: "Questions about physical activity limitations",
    status: "completed",
    createdAt: "Nov 15, 2024",
    completedAt: "Nov 20, 2024",
    technician: "Dr. Elena Volkov",
  },
];

const serviceTypes = [
  {
    id: 1,
    name: "Adjustment",
    description: "Fine-tuning and comfort optimization",
    icon: "🔧",
    estimatedTime: "30-60 min",
  },
  {
    id: 2,
    name: "Check-up",
    description: "Routine maintenance and inspection",
    icon: "🔍",
    estimatedTime: "45 min",
  },
  {
    id: 3,
    name: "Repair",
    description: "Component replacement or repair",
    icon: "🛠️",
    estimatedTime: "1-2 hours",
  },
  {
    id: 4,
    name: "Consultation",
    description: "Expert advice and guidance",
    icon: "💬",
    estimatedTime: "30 min",
  },
];

const clinicInfo = {
  name: "Ortho Innovations Medical Center",
  address: "123 Medical Plaza, Dubai Healthcare City",
  phone: "+971 4 123 4567",
  hours: "Sun-Thu: 8:00 AM - 6:00 PM",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="secondary" className="gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          In Progress
        </Badge>
      );
    case "scheduled":
      return (
        <Badge variant="outline" className="gap-1">
          <Clock className="w-3 h-3" />
          Scheduled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          Pending
        </Badge>
      );
  }
};

export default function Service() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">Service Center</h1>
            <p className="text-muted-foreground mt-1">Maintenance and support for your prosthesis</p>
          </div>
          <Button className="gap-2 w-fit">
            <Plus className="w-4 h-4" />
            New Service Request
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceTypes.map((service) => (
            <Card 
              key={service.id} 
              className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                <p className="text-xs text-primary mt-2">{service.estimatedTime}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Requests */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              Service Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-3">
                {serviceRequests
                  .filter(r => r.status !== "completed")
                  .map((request) => (
                    <div 
                      key={request.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{request.type}</span>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {request.scheduledDate}
                          </span>
                          <span>{request.technician}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-3">
                {serviceRequests
                  .filter(r => r.status === "completed")
                  .map((request) => (
                    <div 
                      key={request.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{request.type}</span>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed {request.completedAt}
                          </span>
                          <span>{request.technician}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-3">
                {serviceRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{request.type}</span>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {request.scheduledDate || request.completedAt}
                        </span>
                        <span>{request.technician}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Clinic Info */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Service Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{clinicInfo.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{clinicInfo.address}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{clinicInfo.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{clinicInfo.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="gap-2 justify-start">
                  <Phone className="w-4 h-4" />
                  Call Clinic
                </Button>
                <Button variant="outline" className="gap-2 justify-start">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="gap-2 justify-start">
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
