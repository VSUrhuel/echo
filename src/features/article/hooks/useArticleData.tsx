import { supabase } from "@/supabase/supabase.config";
import { Article, ArticleFormData } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useArticleData = ({articleId, slug}: {articleId?: string | undefined, slug?: string | undefined} = {}) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<ArticleFormData | null>(null);
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(false);
    const articlePerPage = 10;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [paginatedArticles, setPaginatedArticles] = useState<Article[]>([]);
    
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true)

            try 
            {
                const { data, error } = await supabase
                .from('articles')
                .select('*, author:profiles(*)')
                .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                setArticles(data);
            }
            catch (error) {
                console.error('Error fetching articles:', error);
                toast.error('Error fetching articles');
            }
            finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true)
            try 
            {
                if(articleId == undefined && slug == undefined)
                {
                    return;
                }
                let articleDetails;
                if(articleId)
                {
                    articleDetails = await supabase
                    .from('articles')
                    .select('*, author:profiles(*)')
                    .eq('id', articleId).single();
                }
                else if(slug)
                {
                    articleDetails = await supabase
                    .from('articles')
                    .select('*, author:profiles(*)')
                    .eq('slug', slug).single();
                }
                
                if (articleDetails?.error || !articleDetails?.data) {
                    setArticle(null);
                    setSelectedArticle(null);
                    return;
                }

                const data = articleDetails.data;

                const articleFormData = {
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    slug: data.slug,
                    category: data.category,
                    tags: typeof data.tags === 'string' ? data.tags.replace(/[\[\]"]/g, '').split(',').map((tag: string) => tag.trim()) : (Array.isArray(data.tags) ? data.tags : []),
                    cover_image_url: data.cover_image_url,
                    status: data.status,
                } as ArticleFormData

                const article = {
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    slug: data.slug,
                    category: data.category,
                    tags: typeof data.tags === 'string' ? data.tags.replace(/[\[\]"]/g, '').split(',').map((tag: string) => tag.trim()) : (Array.isArray(data.tags) ? data.tags : []),
                    cover_image_url: data.cover_image_url,
                    author: data.author,
                    created_at: data.created_at,
                    published_at: data.published_at,
                } as Article

                setSelectedArticle(articleFormData);
                setArticle(article);

                // Track View
                const trackView = async () => {
                    try {
                        const { data: { user } } = await supabase.auth.getUser();
                        
                        // Simple fingerprint for IP hash placeholder
                        const fingerprint = `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`;
                        const hash = btoa(fingerprint).substring(0, 32);

                        const {data: viewData, error: viewError} = await supabase.rpc('track_article_view', {
                            p_article_id: data.id,
                            p_viewer_id: user?.id || null,
                            p_ip_hash: hash
                        });

                        if(viewError)
                        {
                            console.error('Error tracking view:', viewError);
                        }

                    } catch (trackError) {
                        console.error('Error tracking view:', trackError);
                    }
                };
                
                trackView();
            } catch (error) {
                console.error('Error fetching article:', error);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        }
        fetchArticle();
    }, [articleId, slug]);

    useEffect(() => {
        const paginatedArticles = articles.slice((page - 1) * articlePerPage, page * articlePerPage);
        setPaginatedArticles(paginatedArticles)
    }, [page, articles]);
    
    useEffect(() => {
        setTotalPages(Math.ceil(articles.length / articlePerPage));
    }, [articles]);

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    return {
        articles,
        loading,
        selectedArticle,
        paginatedArticles,
        article,
        page,
        totalPages,
        prevPage,
        nextPage
    }
}