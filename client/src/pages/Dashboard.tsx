import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Activity, 
  BookOpen, 
  Wrench,
  ChevronRight,
  Play
} from "lucide-react";

const todaysTasks = [
  { id: 1, title: { ru: "Утренняя растяжка", en: "Morning Stretch Routine" }, duration: "15", completed: true },
  { id: 2, title: { ru: "Укрепление квадрицепса", en: "Quad Strengthening" }, duration: "20", completed: true },
  { id: 3, title: { ru: "Ледяная терапия", en: "Ice Therapy" }, duration: "15", completed: false },
  { id: 4, title: { ru: "Вечерняя прогулка", en: "Evening Walk" }, duration: "30", completed: false },
];

export default function Dashboard() {
  const { t, language } = useLanguage();
  const dayNumber = 45;
  const completedTasks = todaysTasks.filter(task => task.completed).length;
  const totalTasks = todaysTasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 lg:space-y-8 max-w-6xl mx-auto">
        {/* Greeting */}
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
            👋 {t("dashboard.greeting")}, Alex
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            {t("dashboard.journey", { day: dayNumber })}
          </p>
        </div>

        {/* Stats Cards - 2 cols mobile, 3 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Next Appointment */}
          <Link href="/rehabilitation">
            <Card className="border-none shadow-sm card-interactive bg-gradient-to-br from-primary/10 to-primary/5 h-full">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="text-xs lg:text-sm font-medium uppercase tracking-wide">
                    {t("dashboard.nextAppointment")}
                  </span>
                </div>
                <p className="font-bold text-lg lg:text-xl">Dr. Smith</p>
                <p className="text-sm text-muted-foreground">{t("dashboard.tomorrow")}, 10:00</p>
              </CardContent>
            </Card>
          </Link>

          {/* Daily Goal */}
          <Link href="/rehabilitation">
            <Card className="border-none shadow-sm card-interactive h-full">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="text-xs lg:text-sm font-medium uppercase tracking-wide">
                    {t("dashboard.dailyGoal")}
                  </span>
                </div>
                <p className="font-bold text-lg lg:text-xl">{progressPercent}% {t("dashboard.complete")}</p>
                <p className="text-sm text-muted-foreground">
                  {totalTasks - completedTasks} {t("dashboard.exercisesRemaining")}
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Prosthesis Status - Full width on mobile */}
          <Link href="/prosthesis" className="col-span-2 lg:col-span-1">
            <Card className="border-none shadow-sm card-interactive bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 h-full">
              <CardContent className="p-4 lg:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {t("dashboard.prosthesisStatus")}
                    </p>
                    <p className="font-bold text-lg lg:text-xl">{t("dashboard.optimal")}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-green-600 font-medium">
                        {t("dashboard.activeWarranty")}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground hidden lg:block" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content Grid - Single column mobile, 2 columns desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Today's Plan - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg lg:text-xl">{t("dashboard.todaysPlan")}</h2>
              <Link 
                href="/rehabilitation" 
                className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
              >
                {t("rehab.viewAll")}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-2">
              {todaysTasks.map((task) => (
                <Link key={task.id} href="/rehabilitation">
                  <Card className={`border-none shadow-sm card-interactive ${task.completed ? 'bg-muted/50' : ''}`}>
                    <CardContent className="p-3 lg:p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${
                        task.completed 
                          ? 'bg-primary/10' 
                          : 'bg-accent/10'
                      }`}>
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                        ) : (
                          <Play className="w-5 h-5 lg:w-6 lg:h-6 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium lg:text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title[language]}
                        </p>
                        <div className="flex items-center gap-1 text-xs lg:text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {task.duration} {t("common.min")}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions - Single column on desktop */}
          <div className="space-y-3">
            <h2 className="font-bold text-lg lg:text-xl">{t("dashboard.quickActions")}</h2>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
              <Link href="/rehabilitation">
                <Card className="border-none shadow-sm card-interactive">
                  <CardContent className="p-4 lg:p-5 flex flex-col lg:flex-row items-center lg:gap-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 lg:mb-0">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs lg:text-base font-medium">{t("dashboard.viewPlan")}</span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/knowledge">
                <Card className="border-none shadow-sm card-interactive">
                  <CardContent className="p-4 lg:p-5 flex flex-col lg:flex-row items-center lg:gap-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-2 lg:mb-0">
                      <BookOpen className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <span className="text-xs lg:text-base font-medium">{t("dashboard.articles")}</span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/service">
                <Card className="border-none shadow-sm card-interactive">
                  <CardContent className="p-4 lg:p-5 flex flex-col lg:flex-row items-center lg:gap-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-2 lg:mb-0">
                      <Wrench className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-xs lg:text-base font-medium">{t("dashboard.bookService")}</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
