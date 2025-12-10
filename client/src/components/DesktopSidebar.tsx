import { Home, Activity, BookOpen, Shield, Wrench, User, Settings, Globe, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, labelKey: "nav.dashboard" },
  { href: "/rehabilitation", icon: Activity, labelKey: "nav.rehabilitation" },
  { href: "/knowledge", icon: BookOpen, labelKey: "nav.knowledge" },
  { href: "/prosthesis", icon: Shield, labelKey: "nav.prosthesis" },
  { href: "/service", icon: Wrench, labelKey: "nav.service" },
  { href: "/profile", icon: User, labelKey: "nav.profile" },
];

export function DesktopSidebar() {
  const [location] = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary text-primary-foreground flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
            OI
          </div>
          <div>
            <h1 className="font-bold text-lg">Ortho Innovations</h1>
            <p className="text-xs text-white/70">Patient Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href || 
            (item.href !== "/" && location.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                isActive
                  ? "bg-white/20 text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* Settings Link */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
            location === "/settings"
              ? "bg-white/20 text-white font-medium"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          )}
        >
          <Settings className="w-5 h-5" />
          {t("nav.settings")}
        </Link>

        {/* Theme & Language Controls */}
        <div className="flex items-center gap-2 px-2 pt-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            {language === "ru" ? "Русский" : "English"}
          </button>
        </div>
      </div>
    </aside>
  );
}
