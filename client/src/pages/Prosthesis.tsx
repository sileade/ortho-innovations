import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, FileText, QrCode, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

const prosthesisInfo = {
  name: "Zimmer Biomet Persona",
  type: "Total Knee Replacement",
  serialNumber: "ZB-PKA-2024-78542",
  implantDate: "October 15, 2024",
  surgeon: "Dr. Alexander Petrov",
  hospital: "Ortho Innovations Medical Center",
  warrantyExpiry: "October 15, 2034",
  warrantyStatus: "active",
};

const warrantyFeatures = [
  { id: 1, name: "Manufacturing defects", covered: true },
  { id: 2, name: "Material failure", covered: true },
  { id: 3, name: "Revision surgery costs", covered: true },
  { id: 4, name: "Rehabilitation support", covered: true },
  { id: 5, name: "Annual check-ups", covered: true },
  { id: 6, name: "Accidental damage", covered: false },
];

const documents = [
  { id: 1, name: "Implant Certificate", date: "Oct 15, 2024", type: "PDF" },
  { id: 2, name: "Warranty Registration", date: "Oct 16, 2024", type: "PDF" },
  { id: 3, name: "Surgical Report", date: "Oct 15, 2024", type: "PDF" },
  { id: 4, name: "Post-Op Instructions", date: "Oct 15, 2024", type: "PDF" },
];

const maintenanceSchedule = [
  { id: 1, name: "6-Month Check-up", date: "Apr 15, 2025", status: "upcoming" },
  { id: 2, name: "Annual X-Ray", date: "Oct 15, 2025", status: "scheduled" },
  { id: 3, name: "2-Year Assessment", date: "Oct 15, 2026", status: "planned" },
];

export default function Prosthesis() {
  const warrantyYearsLeft = 10;
  const warrantyPercentage = (warrantyYearsLeft / 10) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">My Prosthesis</h1>
          <p className="text-muted-foreground mt-1">Implant information and warranty details</p>
        </div>

        {/* Main Info Card */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  <Shield className="w-3 h-3 mr-1" />
                  Warranty Active
                </Badge>
                <h2 className="font-serif text-2xl font-semibold">{prosthesisInfo.name}</h2>
                <p className="text-muted-foreground">{prosthesisInfo.type}</p>
              </div>
              <Button variant="outline" className="gap-2 w-fit">
                <QrCode className="w-4 h-4" />
                Show QR Code
              </Button>
            </div>
          </div>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Serial Number</p>
                <p className="font-mono text-sm mt-1">{prosthesisInfo.serialNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Implant Date</p>
                <p className="text-sm mt-1">{prosthesisInfo.implantDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Surgeon</p>
                <p className="text-sm mt-1">{prosthesisInfo.surgeon}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Hospital</p>
                <p className="text-sm mt-1">{prosthesisInfo.hospital}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Warranty Status */}
          <Card className="border-none shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Warranty Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Warranty Period</span>
                  <span className="text-sm font-medium">{warrantyYearsLeft} years remaining</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all"
                    style={{ width: `${warrantyPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Valid until {prosthesisInfo.warrantyExpiry}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {warrantyFeatures.map((feature) => (
                  <div 
                    key={feature.id} 
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      feature.covered ? 'bg-primary/5' : 'bg-muted/50'
                    }`}
                  >
                    {feature.covered ? (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.covered ? '' : 'text-muted-foreground'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Schedule */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Maintenance Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {maintenanceSchedule.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge 
                    variant={item.status === 'upcoming' ? 'default' : 'outline'}
                    className="text-xs capitalize"
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Documents */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Documents
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {documents.map((doc) => (
                <div 
                  key={doc.id} 
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="border-none shadow-sm bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg">Need assistance with your prosthesis?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Our support team is available 24/7 to help with any questions or concerns.
                </p>
              </div>
              <Button className="gap-2">
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
