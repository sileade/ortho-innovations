import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Shield, QrCode, Calendar, FileText, CheckCircle2, XCircle, ChevronRight, Phone } from "lucide-react";

const documents = [
  { id: 1, name: { ru: "Сертификат импланта", en: "Implant Certificate" }, date: "Oct 15, 2024" },
  { id: 2, name: { ru: "Регистрация гарантии", en: "Warranty Registration" }, date: "Oct 16, 2024" },
  { id: 3, name: { ru: "Хирургический отчёт", en: "Surgical Report" }, date: "Oct 15, 2024" },
  { id: 4, name: { ru: "Послеоперационные инструкции", en: "Post-Op Instructions" }, date: "Oct 15, 2024" },
];

const maintenanceSchedule = [
  { id: 1, title: { ru: "Ежегодный осмотр", en: "Annual Check-up" }, date: "Jan 15, 2025", status: "scheduled" },
  { id: 2, name: { ru: "Замена вкладыша", en: "Liner Replacement" }, date: "Apr 15, 2025", status: "upcoming" },
];

const warrantyCoverage = [
  { id: 1, item: { ru: "Производственные дефекты", en: "Manufacturing defects" }, covered: true },
  { id: 2, item: { ru: "Поломка материала", en: "Material failure" }, covered: true },
  { id: 3, item: { ru: "Ревизионная операция", en: "Revision surgery costs" }, covered: true },
  { id: 4, item: { ru: "Поддержка реабилитации", en: "Rehabilitation support" }, covered: true },
  { id: 5, item: { ru: "Ежегодные осмотры", en: "Annual check-ups" }, covered: true },
  { id: 6, item: { ru: "Случайные повреждения", en: "Accidental damage" }, covered: false },
];

export default function Prosthesis() {
  const { t, language } = useLanguage();

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 max-w-6xl mx-auto">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold">{t("prosthesis.title")}</h1>
          <p className="text-muted-foreground text-sm lg:text-base">{t("prosthesis.subtitle")}</p>
        </div>

        {/* Main Info Card */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Ortho Pro X3</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">{t("prosthesis.warrantyActive")}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-sm font-medium">
                <QrCode className="w-4 h-4" />
                {t("prosthesis.showQR")}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{t("prosthesis.serialNumber")}</p>
                <p className="font-semibold">OPX3-2024-78542</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t("prosthesis.implantDate")}</p>
                <p className="font-semibold">Oct 15, 2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t("prosthesis.surgeon")}</p>
                <p className="font-semibold">Dr. Ahmed Hassan</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t("prosthesis.hospital")}</p>
                <p className="font-semibold">Dubai Medical Center</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Warranty Coverage */}
          <div className="space-y-3">
            <h2 className="font-bold text-lg">{t("prosthesis.warrantyCoverage")}</h2>
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("prosthesis.warrantyPeriod")}</p>
                    <p className="font-bold text-xl">10 {t("prosthesis.yearsRemaining")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t("prosthesis.validUntil")}</p>
                    <p className="font-semibold">Oct 15, 2034</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {warrantyCoverage.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <span className="text-sm">{item.item[language]}</span>
                      {item.covered ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents & Maintenance */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">{t("prosthesis.documents")}</h2>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <Card key={doc.id} className="border-none shadow-sm card-interactive">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{doc.name[language]}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Maintenance Schedule */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">{t("prosthesis.maintenanceSchedule")}</h2>
              <div className="space-y-2">
                {maintenanceSchedule.map((item) => (
                  <Card key={item.id} className="border-none shadow-sm card-interactive">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title ? item.title[language] : item.name?.[language]}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${item.status === 'scheduled' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {item.status === 'scheduled' ? t("service.scheduled") : t("rehab.upcoming")}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <Card className="border-none shadow-sm bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">{t("prosthesis.needHelp")}</h3>
                <p className="text-sm text-muted-foreground">{t("prosthesis.supportAvailable")}</p>
              </div>
              <Link href="/service">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity w-full lg:w-auto">
                  <Phone className="w-5 h-5" />
                  {t("prosthesis.contactSupport")}
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
