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

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/rehabilitation"} component={Rehabilitation} />
      <Route path={"/rehab/current"} component={Rehabilitation} />
      <Route path={"/knowledge"} component={Knowledge} />
      <Route path={"/knowledge/exercises"} component={Knowledge} />
      <Route path={"/prosthesis"} component={Prosthesis} />
      <Route path={"/service"} component={Service} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/settings"} component={Settings} />
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
