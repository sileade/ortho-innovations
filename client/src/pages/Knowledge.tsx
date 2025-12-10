import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Search, Play, BookOpen, Clock, ChevronRight, Star } from "lucide-react";

const categories = [
  { id: "all", labelKey: "knowledge.all" },
  { id: "exercises", labelKey: "knowledge.exercises" },
  { id: "nutrition", labelKey: "knowledge.nutrition" },
  { id: "recovery", labelKey: "knowledge.recovery" },
  { id: "faq", labelKey: "knowledge.faq" },
];

const articles = [
  { id: 1, title: { ru: "Упражнения для укрепления квадрицепса", en: "Quadriceps Strengthening Exercises" }, description: { ru: "Пошаговое руководство по упражнениям", en: "Step-by-step guide to essential exercises" }, category: "exercises", type: "video", duration: "12", featured: true, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" },
  { id: 2, title: { ru: "Питание для восстановления", en: "Nutrition for Recovery" }, description: { ru: "Продукты, способствующие заживлению", en: "Foods that promote healing and recovery" }, category: "nutrition", type: "article", duration: "8", featured: true, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400" },
  { id: 3, title: { ru: "Понимание фантомных ощущений", en: "Understanding Phantom Sensations" }, description: { ru: "Что это такое и как с ними справляться", en: "What they are and how to manage them" }, category: "recovery", type: "article", duration: "10", featured: false, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400" },
  { id: 4, title: { ru: "Тренировка баланса", en: "Balance Training Basics" }, description: { ru: "Основы для начинающих", en: "Foundation exercises for beginners" }, category: "exercises", type: "video", duration: "15", featured: false, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400" },
  { id: 5, title: { ru: "Уход за протезом", en: "Prosthesis Care Guide" }, description: { ru: "Ежедневное обслуживание и уход", en: "Daily maintenance and care tips" }, category: "recovery", type: "article", duration: "6", featured: false, image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400" },
];

export default function Knowledge() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = searchQuery === "" || article.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(a => a.featured);

  return (
    <AppLayout>
      <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6 max-w-6xl mx-auto">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold">{t("knowledge.title")}</h1>
          <p className="text-muted-foreground text-sm lg:text-base">{t("knowledge.subtitle")}</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder={t("knowledge.search")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {activeCategory === "all" && searchQuery === "" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="font-bold text-lg">{t("knowledge.featured")}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="border-none shadow-sm card-interactive overflow-hidden">
                  <div className="aspect-video relative">
                    <img src={article.image} alt={article.title[language]} className="w-full h-full object-cover" />
                    {article.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{article.title[language]}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{article.description[language]}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.duration} {t("knowledge.min")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h2 className="font-bold text-lg">{t("knowledge.allResources")}</h2>
          <div className="space-y-2">
            {filteredArticles.length > 0 ? filteredArticles.map((article) => (
              <Card key={article.id} className="border-none shadow-sm card-interactive">
                <CardContent className="p-3 lg:p-4 flex items-center gap-3">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={article.image} alt={article.title[language]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${article.type === "video" ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-primary/10 text-primary'}`}>
                      {article.type === "video" ? t("knowledge.video") : t("knowledge.article")}
                    </span>
                    <h3 className="font-medium text-sm lg:text-base line-clamp-1 mt-1">{article.title[language]}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {article.duration} {t("knowledge.min")}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>{t("knowledge.noResults")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
