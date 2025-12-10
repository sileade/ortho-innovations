import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, PlayCircle, Calendar, ChevronRight } from "lucide-react";

const phases = [
  {
    id: 1,
    name: "Early Recovery",
    duration: "Weeks 1-6",
    status: "completed",
    progress: 100,
    tasks: 12,
    completedTasks: 12,
  },
  {
    id: 2,
    name: "Strengthening",
    duration: "Weeks 7-12",
    status: "current",
    progress: 65,
    tasks: 18,
    completedTasks: 12,
  },
  {
    id: 3,
    name: "Advanced Mobility",
    duration: "Weeks 13-24",
    status: "upcoming",
    progress: 0,
    tasks: 24,
    completedTasks: 0,
  },
  {
    id: 4,
    name: "Return to Activity",
    duration: "Month 6-12",
    status: "upcoming",
    progress: 0,
    tasks: 20,
    completedTasks: 0,
  },
];

const todaysTasks = [
  { id: 1, title: "Morning stretching routine", duration: "15 min", completed: true, type: "exercise" },
  { id: 2, title: "Quad strengthening exercises", duration: "20 min", completed: true, type: "exercise" },
  { id: 3, title: "Ice therapy", duration: "15 min", completed: false, type: "therapy" },
  { id: 4, title: "Evening walk", duration: "30 min", completed: false, type: "activity" },
  { id: 5, title: "Range of motion exercises", duration: "10 min", completed: false, type: "exercise" },
];

const upcomingAppointments = [
  { id: 1, title: "Physical Therapy Session", date: "Dec 12, 2025", time: "10:00 AM", doctor: "Dr. Smith" },
  { id: 2, title: "Progress Check-up", date: "Dec 18, 2025", time: "2:30 PM", doctor: "Dr. Johnson" },
];

export default function Rehabilitation() {
  const completedToday = todaysTasks.filter(t => t.completed).length;
  const totalToday = todaysTasks.length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Rehabilitation Plan</h1>
          <p className="text-muted-foreground mt-1">Your personalized recovery journey</p>
        </div>

        {/* Today's Progress */}
        <Card className="border-none shadow-sm bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">Today's Progress</h3>
                <p className="text-sm text-muted-foreground">{completedToday} of {totalToday} tasks completed</p>
              </div>
              <div className="text-3xl font-serif font-semibold text-primary">
                {Math.round((completedToday / totalToday) * 100)}%
              </div>
            </div>
            <Progress value={(completedToday / totalToday) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Today's Tasks</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {todaysTasks.map((task) => (
                <Card key={task.id} className={`border-none shadow-sm transition-all hover:shadow-md ${task.completed ? 'bg-muted/30' : ''}`}>
                  <CardContent className="py-4 flex items-center gap-4">
                    <button className="flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground/50" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{task.duration}</span>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {task.type}
                        </Badge>
                      </div>
                    </div>
                    {!task.completed && task.type === 'exercise' && (
                      <Button size="sm" variant="outline" className="gap-1">
                        <PlayCircle className="w-4 h-4" />
                        Start
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-3 rounded-lg bg-muted/30">
                    <p className="font-medium text-sm">{apt.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{apt.date} at {apt.time}</p>
                    <p className="text-xs text-primary mt-1">{apt.doctor}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Exercises completed</span>
                  <span className="font-semibold">18/24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active minutes</span>
                  <span className="font-semibold">145 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Streak</span>
                  <span className="font-semibold text-primary">🔥 7 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recovery Phases */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold">Recovery Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {phases.map((phase) => (
              <Card 
                key={phase.id} 
                className={`border-none shadow-sm transition-all hover:shadow-md ${
                  phase.status === 'current' ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={phase.status === 'completed' ? 'default' : phase.status === 'current' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {phase.status === 'completed' ? '✓ Completed' : phase.status === 'current' ? 'In Progress' : 'Upcoming'}
                    </Badge>
                  </div>
                  <h3 className="font-medium mt-2">{phase.name}</h3>
                  <p className="text-xs text-muted-foreground">{phase.duration}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{phase.completedTasks}/{phase.tasks} tasks</span>
                      <span className="font-medium">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
