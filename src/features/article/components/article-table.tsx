"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Article } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { setupFsCheck } from "next/dist/server/lib/router-utils/filesystem";

interface ArticleTableProps {
  articles: Article[],
  loading: boolean
}

export default function ArticleTable({articles, loading}: ArticleTableProps) {
    const [searchParams, setSearchParams] = useState({
        search: ""
    })
    const supabase = createClient();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          setCurrentUserId(user?.id as string);
        }
        fetchCurrentUser();
    }, [articles])
    
    const router = useRouter();

    const filteredArticles = articles.filter((article) => {
        return article.title.toLowerCase().includes(searchParams.search.toLowerCase())
    })

    return (
        <main className="flex-1 p-6">
        <Card>  
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>All Articles</CardTitle>
                <CardDescription>Manage your published and draft articles</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-9" value={searchParams.search} onChange={(e) => setSearchParams({search: e.target.value})} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Author</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-foreground truncate">{article.title}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {article.author ? `${article.author.first_name} ${article.author.last_name}` : 'Unknown Author'}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            article.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{article.views_count}</td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin-articles/view/${article.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            {currentUserId === article.author_id && (
                              <DropdownMenuItem onClick={() => router.push(`/admin-articles/edit/${article.id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    );
}