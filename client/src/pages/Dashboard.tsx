import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Calendar, CheckCircle2, Clock, PlayCircle, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Header with Cover Image Style */}
      <div className="mb-8 group relative">
        <div className="h-48 w-full rounded-lg bg-gradient-to-r from-neutral-100 to-neutral-200 overflow-hidden mb-6">
          <img 
            src="/images/dashboard-hero.png" 
            alt="Dashboard Cover" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="flex items-center gap-4 mb-2">
          <div className="text-4xl">👋</div>
          <h1 className="text-4xl font-serif font-bold text-foreground">Good Morning, Alex</h1>
        </div>
        <p className="text-muted-foreground text-lg ml-14">
          You're on day 45 of your rehabilitation journey. Keep it up!
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-none shadow-sm bg-card hover:bg-accent/30 transition-colors cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-semibold mb-1">Dr. Smith</div>
            <div className="text-sm text-muted-foreground mb-4">Tomorrow, 10:00 AM</div>
            <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card hover:bg-accent/30 transition-colors cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Daily Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-semibold mb-1">85% Complete</div>
            <div className="text-sm text-muted-foreground mb-4">3 exercises remaining</div>
            <Progress value={85} className="h-1" />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card hover:bg-accent/30 transition-colors cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4" /> Prosthesis Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-serif font-semibold mb-1">Optimal</div>
            <div className="text-sm text-muted-foreground mb-4">Next service in 24 days</div>
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
              Active Warranty
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area - Notion Style List */}
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2 border-b border-border pb-2">
            <span className="text-xl">📋</span> Today's Plan
          </h2>
          <div className="space-y-2">
            {[
              { title: "Morning Stretch Routine", time: "15 min", status: "completed" },
              { title: "Gait Training Level 2", time: "30 min", status: "completed" },
              { title: "Balance Exercises", time: "20 min", status: "pending" },
              { title: "Evening Massage", time: "10 min", status: "pending" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-accent/50 rounded-md group transition-colors">
                <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${item.status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 hover:border-primary'}`}>
                  {item.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className={`flex-1 font-medium ${item.status === 'completed' ? 'text-muted-foreground line-through decoration-muted-foreground/50' : 'text-foreground'}`}>
                  {item.title}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 bg-secondary px-2 py-1 rounded">
                  <Clock className="w-3 h-3" /> {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2 border-b border-border pb-2">
            <span className="text-xl">📚</span> Recommended Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/knowledge/article-1">
              <a className="block p-4 rounded-lg border border-border hover:bg-accent/30 transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">🦶</div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif font-medium text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">
                  Understanding Phantom Limb Sensation
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Learn about the causes and effective management techniques for phantom sensations during early recovery.
                </p>
              </a>
            </Link>
            
            <Link href="/knowledge/article-2">
              <a className="block p-4 rounded-lg border border-border hover:bg-accent/30 transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">🔧</div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif font-medium text-lg mb-1 group-hover:underline decoration-1 underline-offset-4">
                  Daily Prosthesis Care Guide
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Essential maintenance tips to keep your prosthesis in top condition and extend its lifespan.
                </p>
              </a>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
