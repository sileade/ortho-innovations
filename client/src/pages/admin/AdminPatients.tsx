import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { 
  UsersIcon, 
  SearchIcon,
  ChevronRightIcon,
  PlusIcon
} from "@/components/NotionIcons";
import { Download, Filter } from "lucide-react";

const patients = [
  { id: 1, name: "Иванов Петр Сергеевич", email: "ivanov@email.com", phone: "+7 (999) 123-45-67", prosthesis: "Genium X3", status: "active", progress: 78, registeredAt: "2024-01-15" },
  { id: 2, name: "Сидорова Анна Михайловна", email: "sidorova@email.com", phone: "+7 (999) 234-56-78", prosthesis: "C-Leg 4", status: "active", progress: 45, registeredAt: "2024-02-20" },
  { id: 3, name: "Козлов Михаил Александрович", email: "kozlov@email.com", phone: "+7 (999) 345-67-89", prosthesis: "Rheo Knee", status: "pending", progress: 92, registeredAt: "2024-03-10" },
  { id: 4, name: "Петрова Елена Владимировна", email: "petrova@email.com", phone: "+7 (999) 456-78-90", prosthesis: "Genium X3", status: "active", progress: 33, registeredAt: "2024-04-05" },
  { id: 5, name: "Николаев Сергей Иванович", email: "nikolaev@email.com", phone: "+7 (999) 567-89-01", prosthesis: "C-Leg 4", status: "inactive", progress: 67, registeredAt: "2024-05-12" },
  { id: 6, name: "Федорова Мария Петровна", email: "fedorova@email.com", phone: "+7 (999) 678-90-12", prosthesis: "Kenevo", status: "active", progress: 55, registeredAt: "2024-06-18" },
  { id: 7, name: "Смирнов Алексей Дмитриевич", email: "smirnov@email.com", phone: "+7 (999) 789-01-23", prosthesis: "Genium X3", status: "active", progress: 88, registeredAt: "2024-07-22" },
  { id: 8, name: "Кузнецова Ольга Николаевна", email: "kuznetsova@email.com", phone: "+7 (999) 890-12-34", prosthesis: "C-Leg 4", status: "pending", progress: 12, registeredAt: "2024-08-30" },
];

export default function AdminPatients() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title={t("admin.patients.title")}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("admin.patients.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t("admin.patients.export")}
            </Button>
            <Link href="/admin/patients/new">
              <Button>
                <PlusIcon size={18} className="mr-2" />
                {t("admin.patients.addNew")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2">
          {["all", "active", "pending", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t(`admin.status.${status}`)}
              <span className="ml-2 text-xs opacity-70">
                ({status === "all" ? patients.length : patients.filter(p => p.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Patients Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("admin.patients.name")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("admin.patients.contact")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("admin.patients.prosthesis")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("admin.patients.progress")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("admin.patients.status")}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <UsersIcon size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{patient.email}</p>
                        <p className="text-sm text-muted-foreground">{patient.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-sm">
                          {patient.prosthesis}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${patient.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{patient.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          patient.status === 'pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {t(`admin.status.${patient.status}`)}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link href={`/admin/patients/${patient.id}`}>
                          <Button variant="ghost" size="sm">
                            <ChevronRightIcon size={18} />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("admin.patients.showing")} {filteredPatients.length} {t("admin.patients.of")} {patients.length}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              {t("common.back")}
            </Button>
            <Button variant="outline" size="sm">
              {t("common.next")}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
