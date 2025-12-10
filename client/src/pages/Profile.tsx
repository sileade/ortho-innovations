import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { User, Mail, Phone, MapPin, Calendar, Heart, Shield, Award, ChevronRight, Edit2, CheckCircle2 } from "lucide-react";

const achievements = [
  { id: 1, title: { ru: "Первые шаги", en: "First Steps" }, icon: "🚶", earned: true },
  { id: 2, title: { ru: "7-дневная серия", en: "7-Day Streak" }, icon: "🔥", earned: true },
  { id: 3, title: { ru: "100 упражнений", en: "100 Exercises" }, icon: "💪", earned: true },
  { id: 4, title: { ru: "Месяц прогресса", en: "Month of Progress" }, icon: "📈", earned: false },
];

export default function Profile() {
  const { t, language } = useLanguage();

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary to-primary/80" />
          <CardContent className="p-4 lg:p-6 -mt-12">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 border-4 border-background shadow-lg flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">Alex Johnson</h1>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground">{t("profile.verifiedPatient")}</p>
              </div>
              <Link href="/settings">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary/20 transition-colors">
                  <Edit2 className="w-4 h-4" />
                  {t("profile.editProfile")}
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Progress */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <h2 className="font-bold text-lg mb-4">{t("profile.recoveryProgress")}</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{t("rehab.inProgress")}</span>
                  <span className="font-semibold">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-xs text-muted-foreground">{t("profile.exercisesCompleted")}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">45</p>
                  <p className="text-xs text-muted-foreground">{t("profile.daysSinceSurgery")}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">{t("profile.nextAppointment")} {t("profile.inDays", { days: 2 })}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 lg:p-6">
              <h2 className="font-bold text-lg mb-4">{t("profile.personalInfo")}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.email")}</p>
                    <p className="font-medium">alex.johnson@email.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.phone")}</p>
                    <p className="font-medium">+971 50 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.dateOfBirth")}</p>
                    <p className="font-medium">March 15, 1985</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.bloodType")}</p>
                    <p className="font-medium">A+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.address")}</p>
                    <p className="font-medium">Dubai Marina, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance & Emergency */}
          <div className="space-y-6">
            {/* Insurance */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">{t("profile.insurance")}</h2>
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.provider")}</p>
                    <p className="font-medium">Emirates Health Insurance</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("profile.policyNumber")}</p>
                    <p className="font-medium">EHI-2024-789456</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    {t("profile.activeCoverage")}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">{t("profile.achievements")}</h2>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center text-center p-2 ${
                        achievement.earned
                          ? 'bg-yellow-50 dark:bg-yellow-900/20'
                          : 'bg-muted opacity-50'
                      }`}
                    >
                      <span className="text-2xl mb-1">{achievement.icon}</span>
                      <span className="text-[10px] font-medium line-clamp-2">{achievement.title[language]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
