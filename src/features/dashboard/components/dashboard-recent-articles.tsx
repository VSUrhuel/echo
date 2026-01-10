import { Article } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Eye, TrendingUp, Clock, FileText, ChevronRight, ExternalLink } from "lucide-react";
import formatDate from "@/features/article/utils/format-date";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import calculateReadTime from "@/features/article/utils/caculate-read-time";

export default function DashboardRecentArticles({articles} : {articles: Article[]}) {
    const router = useRouter();
    const recentArticles = articles
        .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime())
        .slice(0, 5);

    if (recentArticles.length === 0) {
        return (
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Recent Articles
                    </CardTitle>
                    <CardDescription>Your latest published and draft articles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No articles yet</h3>
                        <p className="text-muted-foreground mb-6">Start by creating your first article</p>
                        <Button 
                            className="bg-gradient-to-r from-primary to-secondary"
                            onClick={() => router.push('/admin-write')}
                        >
                            Create Your First Article
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-border/50">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Recent Articles
                        </CardTitle>
                        <CardDescription>Your latest published and draft articles</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                        {recentArticles.length} articles
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {recentArticles.map((article) => (
                        <div
                            key={article.id}
                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-all duration-200 cursor-pointer"
                            onClick={() => router.push(`/admin-articles/view/${article.id}`)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    {article.cover_image_url && (
                                        <div className="h-12 w-16 rounded-md overflow-hidden flex-shrink-0">
                                            <img 
                                                src={article.cover_image_url} 
                                                alt={article.title}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                            {article.title}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {article.published_at ? formatDate(article.published_at) : "Not published"}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {calculateReadTime(article.content || "")} min read
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <Badge 
                                    variant={article.status === 'published' ? 'default' : 'secondary'}
                                    className={`font-medium ${
                                        article.status === 'published' 
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' 
                                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}
                                >
                                    {article.status === 'published' ? (
                                        <div className="flex items-center gap-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                                            Published
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-600"></div>
                                            Draft
                                        </div>
                                    )}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground min-w-[80px]">
                                    <Eye className="h-3.5 w-3.5" />
                                    {(article.views_count || 0).toLocaleString()}
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/50">
                     <button
                    onClick={() => router.push('/admin-articles')}
                    className="w-full mt-6 py-3 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2 border border-border hover:border-primary/30"
                  >
                    Browse All Articles
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
            </CardContent>
        </Card>
    )
}