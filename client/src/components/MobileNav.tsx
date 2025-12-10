import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  RehabIcon, 
  BookIcon, 
  ProsthesisIcon, 
  ServiceIcon, 
  ProfileIcon 
} from "./NotionIcons";

const navItems = [
  { href: "/", icon: HomeIcon, labelKey: "nav.dashboard" },
  { href: "/rehabilitation", icon: RehabIcon, labelKey: "nav.rehabilitation" },
  { href: "/knowledge", icon: BookIcon, labelKey: "nav.knowledge" },
  { href: "/prosthesis", icon: ProsthesisIcon, labelKey: "nav.prosthesis" },
  { href: "/service", icon: ServiceIcon, labelKey: "nav.service" },
  { href: "/profile", icon: ProfileIcon, labelKey: "nav.profile" },
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
          const Icon = item.icon;
          
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
              <Icon 
                className={cn(
                  "mb-0.5 transition-transform",
                  isActive && "scale-110"
                )} 
                size={20}
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
