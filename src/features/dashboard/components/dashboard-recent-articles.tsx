import { Article } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import formatDate from "@/features/article/utils/format-date";

export default function DashboardRecentArticles({articles} : {articles: Article[]}) {
    return (
        <Card className="mt-4">
        <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
            <CardDescription>Your latest published and draft articles</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
            {articles.map((article, index) => (
                <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{article.title}</p>
                    <p className="text-sm text-muted-foreground">{article.published_at ? formatDate(article.published_at) : "N/A"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                        article.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                    {article.status.toUpperCase().slice(0,1) + article.status.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground w-16 text-right">{article.views_count} views</span>
                </div>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    )
}