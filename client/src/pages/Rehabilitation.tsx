import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { AddToCalendar } from "@/components/AddToCalendar";
import { createAppointmentEvent } from "@/lib/calendar";
import { 
  CheckIcon, 
  ClockIcon, 
  PlayIcon, 
  ChevronRightIcon,
  TrophyIcon,
  FireIcon,
  CalendarIcon,
  TargetIcon
} from "@/components/NotionIcons";

const phases = [
  { id: 1, title: { ru: "Начальное восстановление", en: "Initial Recovery" }, status: "completed", progress: 100, tasks: 12 },
  { id: 2, title: { ru: "Укрепление мышц", en: "Muscle Strengthening" }, status: "completed", progress: 100, tasks: 18 },
  { id: 3, title: { ru: "Тренировка походки", en: "Gait Training" }, status: "in-progress", progress: 65, tasks: 24 },
  { id: 4, title: { ru: "Продвинутая мобильность", en: "Advanced Mobility" }, status: "upcoming", progress: 0, tasks: 20 },
];

const todaysTasks = [
  { id: 1, title: { ru: "Утренняя растяжка", en: "Morning Stretch" }, duration: "15", completed: true, type: "exercise" },
  { id: 2, title: { ru: "Укрепление квадрицепса", en: "Quad Strengthening" }, duration: "20", completed: true, type: "exercise" },
  { id: 3, title: { ru: "Тренировка баланса", en: "Balance Training" }, duration: "15", completed: false, type: "exercise" },
  { id: 4, title: { ru: "Ледяная терапия", en: "Ice Therapy" }, duration: "15", completed: false, type: "therapy" },
  { id: 5, title: { ru: "Вечерняя прогулка", en: "Evening Walk" }, duration: "30", completed: false, type: "cardio" },
];

const appointments = [
  { 
    id: 1, 
    title: { ru: "Осмотр у Dr. Smith", en: "Check-up with Dr. Smith" }, 
    date: "Dec 11", 
    time: "10:00",
    doctor: "Dr. Smith",
    dateObj: new Date(2024, 11, 11, 10, 0)
  },
  { 
    id: 2, 
    title: { ru: "Физиотерапия", en: "Physical Therapy" }, 
    date: "Dec 13", 
    time: "14:00",
    doctor: "Physical Therapist",
    dateObj: new Date(2024, 11, 13, 14, 0)
  },
];

export default function Rehabilitation() {
  const { t, language } = useLanguage();
  const completedTasks = todaysTasks.filter(task => task.completed).length;
  const totalTasks = todaysTasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 lg:space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold">{t("rehab.title")}</h1>
          <p className="text-muted-foreground text-sm lg:text-base">{t("rehab.subtitle")}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <TrophyIcon size={22} className="text-primary" />
              </div>
              <p className="text-xl lg:text-2xl font-bold">156</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{t("rehab.exercisesCompleted")}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <ClockIcon size={22} className="text-accent" />
              </div>
              <p className="text-xl lg:text-2xl font-bold">2,340</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{t("rehab.activeMinutes")}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-2">
                <FireIcon size={22} className="text-orange-500" />
              </div>
              <p className="text-xl lg:text-2xl font-bold">12</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{t("rehab.streak")} {t("rehab.days")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress Card */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TargetIcon size={20} className="text-primary" />
                    <span className="font-semibold">{t("rehab.todaysProgress")}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasks}/{totalTasks} {t("rehab.tasksCompleted")}
                </p>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">{t("rehab.todaysTasks")}</h2>
              </div>

              <div className="space-y-2">
                {todaysTasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className={`border-none shadow-sm card-interactive ${task.completed ? 'bg-muted/50' : ''}`}
                  >
                    <CardContent className="p-3 lg:p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${
                        task.completed 
                          ? 'bg-primary/10' 
                          : 'bg-accent/10'
                      }`}>
                        {task.completed ? (
                          <CheckIcon size={22} className="text-primary" />
                        ) : (
                          <PlayIcon size={22} className="text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title[language]}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <ClockIcon size={12} />
                          {task.duration} {t("common.min")}
                        </div>
                      </div>
                      {!task.completed && (
                        <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                          {t("rehab.start")}
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">{t("rehab.upcomingAppointments")}</h2>
              <div className="space-y-2">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <CalendarIcon size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{apt.title[language]}</p>
                          <p className="text-xs text-muted-foreground">{apt.date} · {apt.time}</p>
                        </div>
                      </div>
                      <AddToCalendar 
                        event={createAppointmentEvent(apt.doctor, apt.dateObj, 60, "Ortho Innovations Clinic")}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recovery Phases */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">{t("rehab.recoveryPhases")}</h2>
              <div className="space-y-2">
                {phases.map((phase) => (
                  <Card 
                    key={phase.id} 
                    className={`border-none shadow-sm ${phase.status === 'in-progress' ? 'ring-2 ring-primary' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{phase.title[language]}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          phase.status === 'completed' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : phase.status === 'in-progress'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {phase.status === 'completed' ? t("rehab.completed") : 
                           phase.status === 'in-progress' ? t("rehab.inProgress") : 
                           t("rehab.upcoming")}
                        </span>
                      </div>
                      <Progress value={phase.progress} className="h-1.5 mb-1" />
                      <p className="text-xs text-muted-foreground">{phase.tasks} {t("rehab.tasks")}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
