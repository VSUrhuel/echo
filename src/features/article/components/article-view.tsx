"use client"

import ReadOnlyEditor from "@/components/tiptap-templates/simple/read-only-editor";
import { useArticleData } from "../hooks/useArticleData";
import ArticleViewHeader from "./article-view-header";
import { ArrowLeft, Share2, Bookmark, CalendarDays, Building, Mail, Phone, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import formatDate from "../utils/format-date";

export default function ArticleViewData({ articleId, slug }: { articleId?: string, slug?: string }) {
  const router = useRouter();
  const { articles, article } = useArticleData({ articleId, slug });
  console.log(article)
  if (!article) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 w-full">
      {/* Back Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-start">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Articles</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-3/4">
              <ArticleViewHeader
                title={article.title}
                author={article.author!}
                publishDate={article.published_at!}
                coverImage={article.cover_image_url!}
                category={article.category!}
                isDraft={article.published_at === null}
              />

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Stats Bar */}
                <div className="flex items-center justify-between py-4 mb-8 border-y border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{article.views_count || 0}</span>
                      Views
                    </span>
                  </div>
                </div>

                <div className="py-4">
                  <ReadOnlyEditor content={article.content!} />
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/4 lg:pt-0">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 flex items-center justify-center mb-4">
                      {article.author?.image_url ? (
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <img
                            src={article.author.image_url    }
                            alt={`${article.author.first_name} ${article.author.last_name}`}
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                          {article.author?.first_name?.[0]}{article.author?.last_name?.[0]}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {article.author?.first_name} {article.author?.last_name}
                    </h3>
                    {article.author?.designation && (
                      <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">
                        {article.author.designation}
                      </p>
                    )}
                    
                    {(article.author?.consultation_hours || article.author?.consultation_hours) && (
                      <div className="flex items-center justify-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">
                          {article.author?.consultation_hours}
                        </span>
                      </div>
                    )}

                    {article.author?.bio && (
                      <p className="text-gray-700 dark:text-gray-300 mt-4 text-sm text-left">
                        {article.author.bio}
                      </p>
                    )}

                    <div className="mt-6 w-full space-y-3">
                      {article.author?.email && (
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm truncate">{article.author.email}</span>
                        </div>
                      )}
                    </div>

                    {article.author?.specialization && (
                      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500 text-sm">
                        <CalendarDays className="w-4 h-4" />
                        <span>Specializing in {article.author.specialization}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Articles</h3>
                  <div className="space-y-4">
                    {articles.filter((article) => article.published_at !== null).slice(0, 5).map((item, index) => (
                      <div 
                        key={index}
                        onClick={() => router.push(`/articles/${item.slug}`)} 
                        className="group cursor-pointer pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0"
                      >
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {item.author?.first_name} {item.author?.last_name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                            <CalendarDays className="w-3 h-3" />
                            <span>{item.published_at ? formatDate(item.published_at) : 'Not Published Yet'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => router.push(`/articles/${article.slug}`)} className="w-full mt-6 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                    View All Articles →
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <button onClick={() => router.push('/faculties')} className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors">
                      Faculty Directory
                    </button>
                    <button onClick={() => router.push('/news-and-updates')} className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors">
                      News and Updates
                    </button>
                    <button onClick={() => router.push('/academics')} className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors">
                      Courses
                    </button>
                    <button onClick={() => router.push('/resources')} className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors">
                      Download Resources
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}