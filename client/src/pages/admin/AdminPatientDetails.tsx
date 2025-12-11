import { useParams, useLocation } from "wouter";
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Activity,
  FileText,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Edit,
  Bell,
  QrCode,
  MapPin,
  Plus
} from "lucide-react";
import { toast } from "sonner";

export default function AdminPatientDetails() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const patientId = useMemo(() => parseInt(id || "0"), [id]);

  // Fetch patient data with full details
  const { data: patient, isLoading: patientLoading } = trpc.admin.getPatient.useQuery(
    { id: patientId },
    { enabled: patientId > 0, staleTime: 30000 }
  );

  // Fetch service requests
  const { data: allOrders, isLoading: ordersLoading } = trpc.admin.getOrders.useQuery(
    undefined,
    { staleTime: 30000 }
  );

  // Fetch rehabilitation plans
  const { data: allPlans, isLoading: plansLoading } = trpc.admin.getRehabPlans.useQuery(
    undefined,
    { staleTime: 30000 }
  );

  const patientOrders = useMemo(() => 
    allOrders?.filter((o: any) => o.patientId === patientId) || [],
    [allOrders, patientId]
  );
  const patientPlans = useMemo(() => 
    allPlans?.filter((p: any) => p.patientId === patientId) || [],
    [allPlans, patientId]
  );
  const patientAppointments = patient?.appointments || [];

  const isLoading = patientLoading || ordersLoading || plansLoading;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Ожидает</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Подтверждено</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">В работе</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Завершено</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Отменено</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Action handlers
  const handleSendNotification = () => {
    toast.info('Функция в разработке');
  };

  const handleCreateAppointment = () => {
    toast.info('Функция в разработке');
  };

  const handleEdit = () => {
    toast.info('Функция в разработке');
  };

  const handleDownloadQR = () => {
    toast.info('Функция в разработке');
  };

  if (isLoading) {
    return (
      <AdminLayout title="Загрузка...">
        <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
          <Skeleton className="h-64" />
        </div>
      </AdminLayout>
    );
  }

  if (!patient) {
    return (
      <AdminLayout title="Пациент не найден">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Пациент не найден</h2>
            <p className="text-muted-foreground mb-4">Пациент с ID {patientId} не существует</p>
            <Button onClick={() => setLocation("/admin/patients")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к списку
            </Button>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  // Calculate day of recovery
  const dayOfRecovery = patient.rehabPlan?.startDate
    ? Math.max(1, Math.ceil((Date.now() - new Date(patient.rehabPlan.startDate).getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  // Calculate statistics
  const completedOrders = patientOrders.filter(o => o.status === "completed").length;
  const pendingOrders = patientOrders.filter(o => o.status === "pending").length;
  const activePlans = patientPlans.filter(p => p.status === "active").length;
  const upcomingAppointments = patientAppointments.filter(a => 
    a.scheduledAt && new Date(a.scheduledAt) > new Date()
  ).length;

  return (
    <AdminLayout title={patient.name || "Пациент"}>
      <div className="space-y-6">
        {/* Header with back button and actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/admin/patients")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к списку
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadQR}>
              <QrCode className="w-4 h-4 mr-2" />
              QR-код
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendNotification}>
              <Bell className="w-4 h-4 mr-2" />
              Уведомление
            </Button>
            <Button variant="outline" size="sm" onClick={handleCreateAppointment}>
              <Plus className="w-4 h-4 mr-2" />
              Приём
            </Button>
            <Button size="sm" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          </div>
        </div>

        {/* Patient Header Card */}
        <Card className="border border-[hsl(174,72%,56%)]/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-primary">
                  {patient.name?.charAt(0) || 'P'}
                </span>
              </div>
              
              {/* Main Info */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold">{patient.name || "Без имени"}</h1>
                  <Badge 
                    variant="outline" 
                    className={patient.status === "active" 
                      ? "bg-green-50 text-green-600 border-green-200" 
                      : "bg-gray-50 text-gray-600 border-gray-200"
                    }
                  >
                    {patient.status === "active" ? "Активен" : "Неактивен"}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Регистрация: {formatDate(patient.createdAt)}</span>
                  </div>
                  {dayOfRecovery && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Activity className="w-4 h-4" />
                      <span>День восстановления: {dayOfRecovery}</span>
                    </div>
                  )}
                  {patient.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{patient.email}</span>
                    </div>
                  )}
                  {patient.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{patient.rehabPlan?.progress || 0}%</p>
                  <p className="text-xs text-muted-foreground">Прогресс</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{upcomingAppointments}</p>
                  <p className="text-xs text-muted-foreground">Приёмов</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Contact Info */}
      <Card className="border border-[hsl(174,72%,56%)]/30">
        <CardHeader>
          <CardTitle className="text-lg">Контактная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Телефон</p>
                <p className="font-medium">{patient.phone || "Не указан"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{patient.email || "Не указан"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Дата рождения</p>
                <p className="font-medium">{patient.dateOfBirth ? formatDate(patient.dateOfBirth) : "Не указана"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-[hsl(174,72%,56%)]/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего заказов</p>
                <p className="text-2xl font-bold">{patientOrders.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[hsl(174,72%,56%)]/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ожидают</p>
                <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[hsl(174,72%,56%)]/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активных планов</p>
                <p className="text-2xl font-bold text-purple-600">{activePlans}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[hsl(174,72%,56%)]/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Приёмов</p>
                <p className="text-2xl font-bold text-green-600">{upcomingAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs with History */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            Заказы ({patientOrders.length})
          </TabsTrigger>
          <TabsTrigger value="rehabilitation">
            <Activity className="h-4 w-4 mr-2" />
            Реабилитация ({patientPlans.length})
          </TabsTrigger>
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Приёмы ({patientAppointments.length})
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-4">
          <Card className="border border-[hsl(174,72%,56%)]/30">
            <CardHeader>
              <CardTitle>История заказов</CardTitle>
              <CardDescription>Все заявки на сервис от пациента</CardDescription>
            </CardHeader>
            <CardContent>
              {patientOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Нет заказов</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patientOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{order.serviceType}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.orderNumber} • {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rehabilitation Tab */}
        <TabsContent value="rehabilitation" className="mt-4">
          <Card className="border border-[hsl(174,72%,56%)]/30">
            <CardHeader>
              <CardTitle>Планы реабилитации</CardTitle>
              <CardDescription>Программы восстановления пациента</CardDescription>
            </CardHeader>
            <CardContent>
              {patientPlans.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Нет планов реабилитации</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patientPlans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{plan.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(plan.startDate)} — {formatDate(plan.endDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{plan.progress || 0}%</p>
                          <p className="text-xs text-muted-foreground">прогресс</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            plan.status === "active" 
                              ? "bg-green-50 text-green-600 border-green-200"
                              : plan.status === "completed"
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }
                        >
                          {plan.status === "active" ? "Активен" : plan.status === "completed" ? "Завершён" : plan.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-4">
          <Card className="border border-[hsl(174,72%,56%)]/30">
            <CardHeader>
              <CardTitle>История приёмов</CardTitle>
              <CardDescription>Записи на приём к специалистам</CardDescription>
            </CardHeader>
            <CardContent>
              {patientAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Нет записей на приём</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patientAppointments.map((appointment) => {
                    const isPast = appointment.scheduledAt && new Date(appointment.scheduledAt) < new Date();
                    return (
                      <div 
                        key={appointment.id} 
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            isPast ? "bg-gray-100" : "bg-green-100"
                          }`}>
                            <Calendar className={`h-5 w-5 ${isPast ? "text-gray-600" : "text-green-600"}`} />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.type || "Приём"}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.scheduledAt 
                                ? new Date(appointment.scheduledAt).toLocaleString("ru-RU", {
                                    day: "numeric",
                                    month: "long",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })
                                : "Дата не назначена"
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.status === "completed" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {appointment.status === "cancelled" && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          {appointment.status === "scheduled" && !isPast && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              Запланирован
                            </Badge>
                          )}
                          {isPast && appointment.status !== "completed" && appointment.status !== "cancelled" && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                              Прошёл
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </AdminLayout>
  );
}
