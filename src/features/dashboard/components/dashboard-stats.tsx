import { Article } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, FileText, TrendingUp, Users, Calendar, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardStats({articles} : {articles: Article[]}) {
    const totalViews = articles.reduce((total, article) => total + article.views_count!, 0);
    const publishedArticles = articles.filter(article => article.status === 'published').length;
    const draftArticles = articles.filter(article => article.status === 'draft').length;
    const avgViews = articles.length > 0 ? Math.round(totalViews / articles.length) : 0;
    
    const stats = [
        {
            title: "Total Articles",
            value: articles.length,
            description: `${publishedArticles} published • ${draftArticles} drafts`,
            icon: FileText,
            color: "bg-gradient-to-br from-primary/20 to-primary/5",
            iconColor: "text-primary",
            trend: "+12% this month"
        },
        {
            title: "Total Views",
            value: totalViews.toLocaleString(),
            description: "Across all articles",
            icon: Eye,
            color: "bg-gradient-to-br from-secondary/20 to-secondary/5",
            iconColor: "text-secondary",
            trend: "+24% from last month"
        },
        {
            title: "Avg. Views per Article",
            value: avgViews.toLocaleString(),
            description: "Average engagement",
            icon: BarChart3,
            color: "bg-gradient-to-br from-accent/20 to-accent/5",
            iconColor: "text-accent-foreground",
            trend: "Consistent growth"
        },
        {
            title: "Published Articles",
            value: publishedArticles,
            description: "Live on the platform",
            icon: TrendingUp,
            color: "bg-gradient-to-br from-green-500/20 to-green-500/5",
            iconColor: "text-green-600",
            trend: `${Math.round((publishedArticles / Math.max(articles.length, 1)) * 100)}% of total`
        },
    ];
    
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title} className={`border-border/50 hover:border-primary/30 transition-all duration-300 ${stat.color}`}>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.iconColor.replace('text-', 'bg-')}/20`}>
                                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                            <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}