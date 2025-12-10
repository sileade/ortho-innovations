import { Home, Activity, BookOpen, Shield, Wrench, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, labelKey: "nav.dashboard" },
  { href: "/rehabilitation", icon: Activity, labelKey: "nav.rehabilitation" },
  { href: "/knowledge", icon: BookOpen, labelKey: "nav.knowledge" },
  { href: "/prosthesis", icon: Shield, labelKey: "nav.prosthesis" },
  { href: "/service", icon: Wrench, labelKey: "nav.service" },
  { href: "/profile", icon: User, labelKey: "nav.profile" },
];

export function MobileNav() {
  const [location] = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const isActive = location === item.href || 
            (item.href !== "/" && location.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all touch-target",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 mb-0.5 transition-transform",
                  isActive && "scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
