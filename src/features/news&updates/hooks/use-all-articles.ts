"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { NewsArticle, NewsItem } from "@/features/homepage/types/news"

export function useAllArticles(
  page = 1,
  category: string | null = null,
  searchQuery: string | null = null,
  itemsPerPage = 6,
) {
  const supabase = createClient()
  const [articles, setArticles] = useState<NewsItem[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from("articles")
          .select("*", { count: "exact" })
          .eq("status", "published")
          .order("published_at", { ascending: false })

        // Apply category filter
        if (category && category !== "All") {
          query = query.eq("category", category)
        }

        // Apply search filter
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`)
        }

        // Apply pagination
        const from = (page - 1) * itemsPerPage
        const to = from + itemsPerPage - 1
        query = query.range(from, to)

        const { data, error: fetchError, count } = await query

        if (fetchError) throw fetchError

        const formattedArticles: NewsItem[] = (data || []).map((article) => {
          let imageUrl = "/news-article.png"
          if (article.cover_image_url) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
            imageUrl = article.cover_image_url
          }

          return {
            id: article.id,
            category: article.category || "News",
            date: article.published_at
              ? new Date(article.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
            title: article.title,
            description: article.excerpt,
            image: imageUrl,
            slug: article.slug
          }
        })


        setArticles(formattedArticles)
        setTotalCount(count || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch articles")
        console.error("[v0] Error fetching articles:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [page, category, searchQuery])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return { articles, loading, error, totalCount, totalPages, currentPage: page }
}
