import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, FileText, ChevronRight, Clock, Eye } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "all", name: "All", count: 24 },
  { id: "exercises", name: "Exercises", count: 12 },
  { id: "nutrition", name: "Nutrition", count: 5 },
  { id: "recovery", name: "Recovery Tips", count: 4 },
  { id: "faq", name: "FAQ", count: 3 },
];

const articles = [
  {
    id: 1,
    title: "Post-Surgery Exercise Guide",
    description: "Complete guide to safe exercises after knee replacement surgery",
    category: "exercises",
    type: "video",
    duration: "15 min",
    views: 1234,
    featured: true,
    thumbnail: "🏃",
  },
  {
    id: 2,
    title: "Nutrition for Recovery",
    description: "Essential nutrients and diet tips to speed up your healing process",
    category: "nutrition",
    type: "article",
    duration: "8 min read",
    views: 856,
    featured: true,
    thumbnail: "🥗",
  },
  {
    id: 3,
    title: "Managing Post-Op Pain",
    description: "Effective strategies for pain management during recovery",
    category: "recovery",
    type: "article",
    duration: "5 min read",
    views: 2341,
    featured: false,
    thumbnail: "💊",
  },
  {
    id: 4,
    title: "Quad Strengthening Exercises",
    description: "Video tutorial for building quadriceps strength safely",
    category: "exercises",
    type: "video",
    duration: "12 min",
    views: 1567,
    featured: false,
    thumbnail: "💪",
  },
  {
    id: 5,
    title: "Sleep Positions After Surgery",
    description: "Best sleeping positions to protect your new joint",
    category: "recovery",
    type: "article",
    duration: "4 min read",
    views: 3210,
    featured: false,
    thumbnail: "😴",
  },
  {
    id: 6,
    title: "When to Call Your Doctor",
    description: "Warning signs and symptoms that require medical attention",
    category: "faq",
    type: "article",
    duration: "3 min read",
    views: 4521,
    featured: true,
    thumbnail: "🏥",
  },
  {
    id: 7,
    title: "Range of Motion Exercises",
    description: "Daily exercises to improve flexibility and joint mobility",
    category: "exercises",
    type: "video",
    duration: "18 min",
    views: 987,
    featured: false,
    thumbnail: "🧘",
  },
  {
    id: 8,
    title: "Hydration and Recovery",
    description: "Why staying hydrated is crucial for your healing journey",
    category: "nutrition",
    type: "article",
    duration: "4 min read",
    views: 654,
    featured: false,
    thumbnail: "💧",
  },
];

export default function Knowledge() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(a => a.featured);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">Educational resources for your recovery</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles and videos..."
            className="pl-10 bg-background border-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Featured Section */}
        {!searchQuery && activeCategory === "all" && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                        {article.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {article.type === "video" ? (
                            <Video className="w-3 h-3 text-primary" />
                          ) : (
                            <FileText className="w-3 h-3 text-primary" />
                          )}
                          <span className="text-xs text-muted-foreground capitalize">{article.type}</span>
                        </div>
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.name}
              <span className="ml-1.5 opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">
              {activeCategory === "all" ? "All Resources" : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <span className="text-sm text-muted-foreground">{filteredArticles.length} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <CardContent className="py-5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-muted/50 flex items-center justify-center text-2xl flex-shrink-0">
                    {article.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {article.type === "video" ? (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs gap-1">
                          <BookOpen className="w-3 h-3" />
                          Article
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs capitalize">
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
