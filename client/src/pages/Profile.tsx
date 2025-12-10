import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit2, 
  FileText,
  Activity,
  Award
} from "lucide-react";

const patientData = {
  medicalId: "PT-2024-78542",
  dateOfBirth: "March 15, 1975",
  bloodType: "A+",
  emergencyContact: "+971 50 987 6543",
  emergencyName: "Sarah Johnson (Spouse)",
  address: "456 Palm Jumeirah, Dubai, UAE",
  insuranceProvider: "Emirates Insurance",
  insuranceNumber: "EI-2024-456789",
};

const achievements = [
  { id: 1, name: "First Steps", description: "Completed first walking session", icon: "🚶", date: "Oct 20, 2024" },
  { id: 2, name: "Week Warrior", description: "7-day exercise streak", icon: "🔥", date: "Nov 5, 2024" },
  { id: 3, name: "Milestone Master", description: "Completed Phase 1 recovery", icon: "🏆", date: "Nov 25, 2024" },
  { id: 4, name: "Knowledge Seeker", description: "Read 10 articles", icon: "📚", date: "Dec 1, 2024" },
];

const healthMetrics = [
  { label: "Recovery Progress", value: "65%", trend: "+5% this week" },
  { label: "Exercises Completed", value: "156", trend: "18 this week" },
  { label: "Days Since Surgery", value: "56", trend: "" },
  { label: "Next Appointment", value: "Dec 12", trend: "in 2 days" },
];

export default function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Your personal information and health data</p>
        </div>

        {/* Profile Card */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                <AvatarImage src="" alt={user?.name || "Patient"} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || "P"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-2xl font-semibold">{user?.name || "Patient Name"}</h2>
                <p className="text-muted-foreground">Patient ID: {patientData.medicalId}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="w-3 h-3" />
                    Verified Patient
                  </Badge>
                  <Badge variant="outline">Total Knee Replacement</Badge>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Health Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                <p className="text-2xl font-serif font-semibold mt-1">{metric.value}</p>
                {metric.trend && (
                  <p className="text-xs text-primary mt-1">{metric.trend}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="border-none shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm">{user?.email || "patient@example.com"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm">+971 50 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date of Birth</p>
                    <p className="text-sm">{patientData.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Type</p>
                    <p className="text-sm">{patientData.bloodType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 md:col-span-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm">{patientData.address}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Emergency Contact</h4>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <Phone className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">{patientData.emergencyName}</p>
                    <p className="text-xs text-muted-foreground">{patientData.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Provider</p>
                <p className="font-medium">{patientData.insuranceProvider}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Policy Number</p>
                <p className="font-mono text-sm">{patientData.insuranceNumber}</p>
              </div>
              <div className="pt-2">
                <Badge variant="secondary" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Active Coverage
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Insurance Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-medium text-sm">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  <p className="text-xs text-primary mt-2">{achievement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
