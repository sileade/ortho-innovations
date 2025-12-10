import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Bell, 
  Lock, 
  Globe, 
  Moon, 
  Smartphone, 
  Mail, 
  Shield,
  LogOut,
  ChevronRight,
  HelpCircle,
  FileText,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true,
    updates: false,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        {/* Notifications */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-notif" className="font-medium">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch 
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="push-notif" className="font-medium">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                </div>
              </div>
              <Switch 
                id="push-notif"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="reminder-notif" className="font-medium">Exercise Reminders</Label>
                  <p className="text-xs text-muted-foreground">Daily reminders for your exercises</p>
                </div>
              </div>
              <Switch 
                id="reminder-notif"
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reminders: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="update-notif" className="font-medium">Product Updates</Label>
                  <p className="text-xs text-muted-foreground">News and feature announcements</p>
                </div>
              </div>
              <Switch 
                id="update-notif"
                checked={notifications.updates}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Moon className="w-4 h-4 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Use dark theme</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your password</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm">Help Center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm">Contact Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm">Terms & Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <Button 
              variant="destructive" 
              className="w-full gap-2"
              onClick={() => logout()}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Ortho Innovations Patient App</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
