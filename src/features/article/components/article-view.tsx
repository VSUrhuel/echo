"use client"

import ReadOnlyEditor from "@/components/tiptap-templates/simple/read-only-editor";
import { useArticleData } from "../hooks/useArticleData";
import ArticleViewHeader from "./article-view-header";
import { ArrowLeft, Share2, Bookmark, CalendarDays, Building, Mail, ExternalLink, ChevronRight, Tag, BookOpen, Users, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import formatDate from "../utils/format-date";
import ArticleLoading from "./article-loading";

export default function ArticleViewData({ articleId, slug }: { articleId?: string, slug?: string }) {
  const router = useRouter();
  const { articles, article, loading } = useArticleData({ articleId, slug });
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      // replace url
      const url = window.location.href.replace(`/admin-articles/view/${article?.id}`, `/articles/${article?.slug}`);
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt || "Check out this article",
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href.replace(`/admin-articles/view/${article?.id}`, `/articles/${article?.slug}`));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading skeleton that matches the header design
  if (loading || !article) {
    return (
      <ArticleLoading />
    );
  }

  // Calculate read time if not provided
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes.toString();
  };

  const readTime = calculateReadTime(article.content || "");
  const recentArticles = articles
    .filter(a => a.published_at !== null && a.id !== article.id)
    .slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 z-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group"
              aria-label="Go back to articles"
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span className="font-medium hidden sm:inline">Go Back</span>
            </button>

            <div className="flex items-center gap-2">
              {article.published_at && (
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 z-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="lg:w-4/5">
            <ArticleViewHeader
            title={article.title}
            author={article.author!}
            publishDate={article.published_at!}
            coverImage={article.cover_image_url!}
            category={article.category!}
            readTime={readTime}
            isDraft={article.published_at === null}
            viewsCount={article.views_count || 0}
          />
              {/* Content Stats - Simplified */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-6 mb-8 border-y border-border bg-card rounded-xl px-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">
                      {article.content?.split(' ').length || 0} words
                    </span>
                  </div>
                  <div className="w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">
                      {article.tags?.length || 0} tags
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => window.print()}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Print Article
                </button>
              </div>

              {/* Article Content */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm mb-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="leading-relaxed text-gray-700 dark:text-gray-300">
                    <ReadOnlyEditor content={article.content!} />
                  </div>
                </div>

                {/* Tags - Now interactive */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Explore More Topics</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <a
                          key={index}
                          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-foreground rounded-full text-sm font-medium transition-colors hover:scale-105 active:scale-95 group flex items-center gap-2"
                        >
                          #{tag}
                          {/* <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Share Call to Action */}
              {article.published_at && (
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white mb-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Found this article helpful?</h3>
                      <p className="text-primary-foreground/90">
                        Share this knowledge with others in your network
                      </p>
                    </div>
                    <button
                      onClick={handleShare}
                      className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
                    >
                      <Share2 className="w-4 h-4" />
                      Share This Article
                    </button>
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar - Author info removed, focusing on related content */}
            <aside className="lg:w-1/3 space-y-8">
              {/* Related Articles */}
              {recentArticles.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Related Articles
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {recentArticles.map((item) => (
                      <article 
                        key={item.id}
                        onClick={() => router.push(`/articles/${item.slug}`)}
                        className="group cursor-pointer p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-border"
                      >
                        <div className="flex items-start gap-3">
                          {item.cover_image_url && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                              <img
                                src={item.cover_image_url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {item.author?.first_name?.charAt(0)}{item.author?.last_name?.charAt(0)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {item.published_at ? formatDate(item.published_at) : 'Draft'}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </article>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push('/articles')}
                    className="w-full mt-6 py-3 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2 border border-border hover:border-primary/30"
                  >
                    Browse All Articles
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Article Details - Replaces author card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  Article Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className={`font-medium ${article.published_at ? 'text-green-600 dark:text-green-400' : 'text-accent'}`}>
                      {article.published_at ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">Created</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(article.created_at || article.published_at!)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(article.updated_at || article.published_at!)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400">Category</span>
                    <span className="font-medium text-primary">{article.category || 'Uncategorized'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Resources */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Quick Resources
                </h3>
                
                <nav className="space-y-2">
                  {[
                    { label: 'Academic Resources', href: '/resources/academic', icon: '📚' },
                    { label: 'Research Database', href: '/research', icon: '🔬' },
                    { label: 'Faculty Publications', href: '/publications', icon: '📄' },
                    { label: 'Student Portal', href: '/student', icon: '🎓' },
                    { label: 'Campus Events', href: '/events', icon: '📅' },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 group transition-colors border border-transparent hover:border-border"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{link.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}