import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Dashboard from "./pages/Dashboard";
import Rehabilitation from "./pages/Rehabilitation";
import Knowledge from "./pages/Knowledge";
import Prosthesis from "./pages/Prosthesis";
import Service from "./pages/Service";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminContent from "./pages/admin/AdminContent";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminRehabilitation from "./pages/admin/AdminRehabilitation";

function Router() {
  return (
    <Switch>
      {/* Patient App Routes */}
      <Route path={"/"} component={Dashboard} />
      <Route path={"/rehabilitation"} component={Rehabilitation} />
      <Route path={"/rehab/current"} component={Rehabilitation} />
      <Route path={"/knowledge"} component={Knowledge} />
      <Route path={"/knowledge/exercises"} component={Knowledge} />
      <Route path={"/prosthesis"} component={Prosthesis} />
      <Route path={"/service"} component={Service} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/settings"} component={Settings} />
      
      {/* Admin Panel Routes */}
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/patients"} component={AdminPatients} />
      <Route path={"/admin/patients/:id"} component={AdminPatients} />
      <Route path={"/admin/rehabilitation"} component={AdminRehabilitation} />
      <Route path={"/admin/content"} component={AdminContent} />
      <Route path={"/admin/orders"} component={AdminOrders} />
      <Route path={"/admin/calendar"} component={AdminCalendar} />
      <Route path={"/admin/notifications"} component={AdminNotifications} />
      <Route path={"/admin/analytics"} component={AdminAnalytics} />
      <Route path={"/admin/settings"} component={Settings} />
      
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
