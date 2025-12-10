import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { getTimeBasedGreeting, getMotivationalMessage } from "@/lib/greeting";
import { 
  CalendarIcon, 
  CheckIcon, 
  ClockIcon, 
  ShieldIcon, 
  RehabIcon, 
  BookIcon, 
  ServiceIcon,
  ChevronRightIcon,
  PlayIcon,
  ProfileIcon,
  PhoneIcon,
  MapPinIcon
} from "@/components/NotionIcons";

const todaysTasks = [
  { id: 1, title: { ru: "Утренняя растяжка", en: "Morning Stretch Routine" }, duration: "15", completed: true },
  { id: 2, title: { ru: "Укрепление квадрицепса", en: "Quad Strengthening" }, duration: "20", completed: true },
  { id: 3, title: { ru: "Ледяная терапия", en: "Ice Therapy" }, duration: "15", completed: false },
  { id: 4, title: { ru: "Вечерняя прогулка", en: "Evening Walk" }, duration: "30", completed: false },
];

const teamMembers = [
  { 
    id: 1, 
    role: { ru: "Личный менеджер", en: "Personal Manager" },
    name: "Анна Петрова",
    phone: "+7 (495) 123-45-67",
    hours: { ru: "Пн-Пт 9:00-18:00", en: "Mon-Fri 9:00-18:00" }
  },
  { 
    id: 2, 
    role: { ru: "Протезист", en: "Prosthetist" },
    name: "Иван Сидоров",
    phone: "+7 (495) 123-45-68",
    hours: { ru: "Пн-Сб 10:00-19:00", en: "Mon-Sat 10:00-19:00" }
  },
  { 
    id: 3, 
    role: { ru: "Врач ЛФК", en: "Rehab Doctor" },
    name: "Dr. Smith",
    phone: "+7 (495) 123-45-69",
    hours: { ru: "Пн-Пт 8:00-17:00", en: "Mon-Fri 8:00-17:00" }
  },
];

export default function Dashboard() {
  const { t, language } = useLanguage();
  const dayNumber = 45;
  const completedTasks = todaysTasks.filter(task => task.completed).length;
  const totalTasks = todaysTasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);
  
  // Dynamic greeting based on time of day
  const greetingData = getTimeBasedGreeting();
  const motivationalMessage = getMotivationalMessage(dayNumber, language);

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 lg:space-y-8 max-w-6xl mx-auto">
        {/* Greeting */}
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
            {greetingData.emoji} {greetingData.greeting[language]}, Alex
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            {language === 'ru' ? `День ${dayNumber} вашего пути восстановления.` : `Day ${dayNumber} of your recovery journey.`} {motivationalMessage}
          </p>
        </div>

        {/* Stats Cards - 2 cols mobile, 3 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Next Appointment */}
          <Link href="/rehabilitation">
            <Card className="border-none shadow-sm card-interactive bg-gradient-to-br from-primary/10 to-primary/5 h-full">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CalendarIcon size={18} />
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
                  <CheckIcon size={18} />
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
                    <ShieldIcon size={24} className="text-green-600" />
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
                <ChevronRightIcon size={20} className="text-muted-foreground hidden lg:block" />
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
                <ChevronRightIcon size={16} />
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
                          <CheckIcon size={22} className="text-primary" />
                        ) : (
                          <PlayIcon size={22} className="text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium lg:text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title[language]}
                        </p>
                        <div className="flex items-center gap-1 text-xs lg:text-sm text-muted-foreground">
                          <ClockIcon size={12} />
                          {task.duration} {t("common.min")}
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-muted-foreground/50" />
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
                      <RehabIcon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs lg:text-base font-medium">{t("dashboard.viewPlan")}</span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/knowledge">
                <Card className="border-none shadow-sm card-interactive">
                  <CardContent className="p-4 lg:p-5 flex flex-col lg:flex-row items-center lg:gap-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-2 lg:mb-0">
                      <BookIcon size={24} className="text-secondary-foreground" />
                    </div>
                    <span className="text-xs lg:text-base font-medium">{t("dashboard.articles")}</span>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/service">
                <Card className="border-none shadow-sm card-interactive">
                  <CardContent className="p-4 lg:p-5 flex flex-col lg:flex-row items-center lg:gap-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-2 lg:mb-0">
                      <ServiceIcon size={24} className="text-accent" />
                    </div>
                    <span className="text-xs lg:text-base font-medium">{t("dashboard.bookService")}</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg lg:text-xl">{t("dashboard.yourTeam")}</h2>
            <Link 
              href="/profile" 
              className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              {t("rehab.viewAll")}
              <ChevronRightIcon size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border-none shadow-sm card-interactive">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ProfileIcon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        {member.role[language]}
                      </p>
                      <p className="font-semibold truncate">{member.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <ClockIcon size={12} />
                        {member.hours[language]}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex gap-2">
                    <a 
                      href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      <PhoneIcon size={16} />
                      {t("common.call")}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Center */}
        <Link href="/service">
          <Card className="border-none shadow-sm card-interactive bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon size={28} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {t("dashboard.nearestCenter")}
                  </p>
                  <p className="font-semibold text-lg">{t("dashboard.serviceCenterName")}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {t("dashboard.serviceCenterAddress")}
                  </p>
                </div>
                <ChevronRightIcon size={24} className="text-muted-foreground hidden md:block" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </AppLayout>
  );
}
