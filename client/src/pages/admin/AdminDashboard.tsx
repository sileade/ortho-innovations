import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { 
  UsersIcon, 
  CalendarIcon, 
  ChartIcon, 
  ServiceIcon,
  ChevronRightIcon,
  TrophyIcon,
  BellIcon
} from "@/components/NotionIcons";

const stats = [
  { 
    key: "totalPatients", 
    value: "1,247", 
    change: "+12%",
    icon: UsersIcon,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    key: "activeToday", 
    value: "89", 
    change: "+5%",
    icon: ChartIcon,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
  { 
    key: "pendingOrders", 
    value: "23", 
    change: "-3",
    icon: ServiceIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/30"
  },
  { 
    key: "appointmentsToday", 
    value: "15", 
    change: "",
    icon: CalendarIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
];

const recentPatients = [
  { id: 1, name: "Иванов Петр", status: "active", lastVisit: "Сегодня", progress: 78 },
  { id: 2, name: "Сидорова Анна", status: "active", lastVisit: "Вчера", progress: 45 },
  { id: 3, name: "Козлов Михаил", status: "pending", lastVisit: "3 дня назад", progress: 92 },
  { id: 4, name: "Петрова Елена", status: "active", lastVisit: "Сегодня", progress: 33 },
  { id: 5, name: "Николаев Сергей", status: "inactive", lastVisit: "2 недели назад", progress: 67 },
];

const pendingTasks = [
  { id: 1, type: "verification", patient: "Новый пациент #1247", time: "10 мин назад" },
  { id: 2, type: "order", patient: "Заявка на сервис #892", time: "25 мин назад" },
  { id: 3, type: "plan", patient: "План реабилитации для Иванова П.", time: "1 час назад" },
  { id: 4, type: "notification", patient: "Массовая рассылка", time: "2 часа назад" },
];

export default function AdminDashboard() {
  const { t, language } = useLanguage();

  return (
    <AdminLayout title={t("admin.dashboard.title")}>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.key} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t(`admin.stats.${stat.key}`)}
                      </p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      {stat.change && (
                        <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'}`}>
                          {stat.change} {t("admin.stats.vsLastMonth")}
                        </p>
                      )}
                    </div>
                    <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <Icon size={28} className={stat.color} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  {t("admin.dashboard.recentPatients")}
                </CardTitle>
                <Link 
                  href="/admin/patients" 
                  className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                >
                  {t("rehab.viewAll")}
                  <ChevronRightIcon size={16} />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPatients.map((patient) => (
                    <Link key={patient.id} href={`/admin/patients/${patient.id}`}>
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UsersIcon size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${patient.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">{patient.progress}%</span>
                          </div>
                          <span className={`text-xs ${
                            patient.status === 'active' ? 'text-green-600' : 
                            patient.status === 'pending' ? 'text-orange-600' : 'text-muted-foreground'
                          }`}>
                            {patient.status === 'active' ? t("admin.status.active") : 
                             patient.status === 'pending' ? t("admin.status.pending") : t("admin.status.inactive")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Tasks */}
          <div>
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  {t("admin.dashboard.pendingTasks")}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {pendingTasks.length} {t("admin.dashboard.tasks")}
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        task.type === 'verification' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        task.type === 'order' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        task.type === 'plan' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {task.type === 'verification' ? <UsersIcon size={16} className="text-blue-600" /> :
                         task.type === 'order' ? <ServiceIcon size={16} className="text-orange-600" /> :
                         task.type === 'plan' ? <TrophyIcon size={16} className="text-green-600" /> :
                         <BellIcon size={16} className="text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{task.patient}</p>
                        <p className="text-xs text-muted-foreground">{task.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-none shadow-sm mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  {t("dashboard.quickActions")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/patients/new">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <UsersIcon size={20} />
                    <span className="font-medium">{t("admin.actions.addPatient")}</span>
                  </button>
                </Link>
                <Link href="/admin/content/new">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                    <BellIcon size={20} />
                    <span className="font-medium">{t("admin.actions.sendNotification")}</span>
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
