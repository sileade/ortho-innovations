import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Plus, Wrench, Calendar, CheckCircle2, Clock, MapPin, Phone, MessageCircle, Navigation, ChevronRight } from "lucide-react";

const serviceTypes = [
  { id: "adjustment", icon: Wrench, labelKey: "service.adjustment", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { id: "checkup", icon: Calendar, labelKey: "service.checkup", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { id: "repair", icon: Wrench, labelKey: "service.repair", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { id: "consultation", icon: MessageCircle, labelKey: "service.consultation", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
];

const serviceRequests = [
  { id: 1, type: "checkup", title: { ru: "Ежегодный осмотр", en: "Annual Check-up" }, date: "Dec 15, 2024", status: "scheduled", time: "10:00 AM" },
  { id: 2, type: "adjustment", title: { ru: "Настройка выравнивания", en: "Alignment Adjustment" }, date: "Dec 8, 2024", status: "in-progress" },
  { id: 3, type: "repair", title: { ru: "Замена вкладыша", en: "Liner Replacement" }, date: "Nov 20, 2024", status: "completed" },
];

export default function Service() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("active");

  const filteredRequests = serviceRequests.filter(req => {
    if (activeTab === "active") return req.status !== "completed";
    if (activeTab === "completed") return req.status === "completed";
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled": return { class: "bg-primary/10 text-primary", label: t("service.scheduled") };
      case "in-progress": return { class: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", label: t("service.inProgress") };
      case "completed": return { class: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400", label: t("rehab.completed") };
      default: return { class: "bg-muted text-muted-foreground", label: t("service.pending") };
    }
  };

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-bold">{t("service.title")}</h1>
            <p className="text-muted-foreground text-sm lg:text-base">{t("service.subtitle")}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            <span className="hidden lg:inline">{t("service.newRequest")}</span>
          </button>
        </div>

        {/* Quick Service Types */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {serviceTypes.map((type) => (
            <Card key={type.id} className="border-none shadow-sm card-interactive">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${type.color}`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{t(type.labelKey)}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Requests */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{t("service.requests")}</h2>
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                {[
                  { id: "active", label: t("service.active") },
                  { id: "completed", label: t("service.completedTab") },
                  { id: "all", label: t("service.allTab") },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'bg-background shadow-sm' : 'text-muted-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredRequests.map((req) => {
                const statusBadge = getStatusBadge(req.status);
                const serviceType = serviceTypes.find(t => t.id === req.type);
                return (
                  <Card key={req.id} className="border-none shadow-sm card-interactive">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${serviceType?.color}`}>
                        {serviceType && <serviceType.icon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge.class}`}>
                            {statusBadge.label}
                          </span>
                        </div>
                        <h3 className="font-medium">{req.title[language]}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {req.date}
                          {req.time && <><Clock className="w-3 h-3 ml-2" />{req.time}</>}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Service Location */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">{t("service.location")}</h2>
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Ortho Innovations L.L.C.</h3>
                <p className="text-sm text-muted-foreground mb-4">Dubai Healthcare City, Building 47, Dubai, UAE</p>
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="text-xs">{t("service.callClinic")}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-xs">{t("service.sendMessage")}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Navigation className="w-5 h-5" />
                    <span className="text-xs">{t("service.getDirections")}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
