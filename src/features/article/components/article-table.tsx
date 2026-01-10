"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2, Calendar, User, BarChart, FileText, Clock, Filter, EyeOff } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Article } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import useArticleAction from "../hooks/useArticleAction";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import formatDate from "../utils/format-date";
import { AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogFooter, AlertDialogAction, AlertDialog } from "@/components/ui/alert-dialog";

interface ArticleTableProps {
  articles: Article[],
  loading: boolean,
  onDeleteSuccess?: () => void
}

type StatusFilter = 'all' | 'published' | 'draft'

export default function ArticleTable({articles, loading, onDeleteSuccess}: ArticleTableProps) {
    const { handleHardDeleteArticle } = useArticleAction()
    const [searchParams, setSearchParams] = useState({
        search: "",
        status: 'all' as StatusFilter
    })
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const supabase = createClient();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [stats, setStats] = useState({
        published: 0,
        drafts: 0,
        totalViews: 0
    })

    useEffect(() => {
        const fetchCurrentUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          setCurrentUserId(user?.id as string);
        }
        fetchCurrentUser();
    }, [articles])

    useEffect(() => {
        if (articles.length > 0) {
            const publishedCount = articles.filter(a => a.status === 'published').length;
            const draftCount = articles.filter(a => a.status === 'draft').length;
            const totalViews = articles.reduce((sum, article) => sum + (article.views_count || 0), 0);
            setStats({ published: publishedCount, drafts: draftCount, totalViews });
        }
    }, [articles])
    
    const router = useRouter();

    const filteredArticles = articles.filter((article) => {
        const matchesSearch = article.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
                             (article.author && `${article.author.first_name} ${article.author.last_name}`.toLowerCase().includes(searchParams.search.toLowerCase()))
        
        const matchesStatus = searchParams.status === 'all' || article.status === searchParams.status
        
        return matchesSearch && matchesStatus
    })


    return (
        <main className="flex-1 p-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Published Articles</p>
                                <p className="text-3xl font-bold text-primary mt-2">{stats.published}</p>
                            </div>
                            <div className="p-3 rounded-full bg-primary/20">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Draft Articles</p>
                                <p className="text-3xl font-bold text-secondary mt-2">{stats.drafts}</p>
                            </div>
                            <div className="p-3 rounded-full bg-secondary/20">
                                <EyeOff className="h-6 w-6 text-secondary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                                <p className="text-3xl font-bold text-accent-foreground mt-2">{stats.totalViews.toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded-full bg-accent/20">
                                <BarChart className="h-6 w-6 text-accent-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-0">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Articles List</CardTitle>
                            <CardDescription>{filteredArticles.length} articles found</CardDescription>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input 
                                    placeholder="Search by title or author..." 
                                    className="pl-9"
                                    value={searchParams.search}
                                    onChange={(e) => setSearchParams(prev => ({...prev, search: e.target.value}))}
                                />
                            </div>
                            
                            <Select 
                                value={searchParams.status} 
                                onValueChange={(value: StatusFilter) => setSearchParams(prev => ({...prev, status: value}))}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <SelectValue placeholder="Filter status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                
                <CardContent>
                    {loading ? (
                        // Loading skeleton
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4 p-4 border border-border/50 rounded-lg">
                                    <Skeleton className="h-4 flex-1" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            ))}
                        </div>
                    ) : filteredArticles.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
                            <p className="text-muted-foreground mb-6">Try adjusting your search or create a new article</p>
                            <Button onClick={() => router.push('/admin-write')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Article
                            </Button>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-border/50 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/30 border-b border-border">
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4" />
                                                    Title
                                                </div>
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    Author
                                                </div>
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    Date
                                                </div>
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <BarChart className="h-4 w-4" />
                                                    Views
                                                </div>
                                            </th>
                                            <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {filteredArticles.map((article) => (
                                            <tr 
                                                key={article.id} 
                                                className="hover:bg-muted/20 transition-colors cursor-pointer group"
                                                onClick={() => router.push(`/admin-articles/view/${article.id}`)}
                                            >
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        {article.cover_image_url && (
                                                            <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                                                                <img 
                                                                    src={article.cover_image_url} 
                                                                    alt={article.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors truncate w-[250px]">
                                                                {article.title}
                                                            </p>
                                                            {article.category && (
                                                                <span className="text-xs text-muted-foreground">{article.category}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        {article.author?.image_url ? (
                                                            <img 
                                                                src={article.author.image_url}
                                                                alt={`${article.author.first_name} ${article.author.last_name}`}
                                                                className="h-6 w-6 rounded-full border border-border"
                                                            />
                                                        ) : (
                                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                                <User className="h-3 w-3 text-primary" />
                                                            </div>
                                                        )}
                                                        <span className="text-sm text-muted-foreground">
                                                            {article.author ? `${article.author.first_name} ${article.author.last_name}` : 'Unknown'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
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
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {article.published_at ? formatDate(article.published_at) : "N/A"}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <BarChart className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className={`font-medium ${
                                                            (article.views_count || 0) > 1000 
                                                                ? 'text-green-600' 
                                                                : (article.views_count || 0) > 100 
                                                                    ? 'text-blue-600' 
                                                                    : 'text-muted-foreground'
                                                        }`}>
                                                            {(article.views_count || 0).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                                                            onClick={() => router.push(`/admin-articles/view/${article.id}`)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        
                                                        {currentUserId === article.author_id && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                                                                onClick={() => router.push(`/admin-articles/edit/${article.id}`)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="icon" 
                                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48">
                                                                <DropdownMenuItem 
                                                                    onClick={() => router.push(`/admin-articles/view/${article.id}`)}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Article
                                                                </DropdownMenuItem>
                                                                {currentUserId === article.author_id && (
                                                                    <DropdownMenuItem 
                                                                        onClick={() => router.push(`/admin-articles/edit/${article.id}`)}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit Article
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem
                                                                    className="text-destructive focus:text-destructive cursor-pointer"
                                                                    onSelect={(e) => {
                                                                        e.preventDefault();
                                                                        setIdToDelete(article.id);
                                                                    }}
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete Permanently
                                                                </DropdownMenuItem>
                                                                
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={!!idToDelete} onOpenChange={(open) => !open && setIdToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Do you want to delete this article?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This article will be permanently deleted. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={async () => {
                                if (idToDelete) {
                                    await handleHardDeleteArticle(idToDelete);
                                    setIdToDelete(null);
                                    if (onDeleteSuccess) {
                                        onDeleteSuccess();
                                    }
                                }
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}