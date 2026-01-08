import { Article } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, FileText } from "lucide-react";

export default function DashboardStats({articles} : {articles: Article[]}) {
    const stats = [
        {
            title: "Total Articles",
            value: articles.length,
            description: "Published and draft articles",
            icon: FileText
        },
        {
            title: "Total Views",
            value: articles.reduce((total, article) => total + article.views_count!, 0),
            description: "Views of articles by users",
            icon: Eye
        },
    ]
    return (
         <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {stats.map((stat) => (
                      <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                          <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                          <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
    )
}