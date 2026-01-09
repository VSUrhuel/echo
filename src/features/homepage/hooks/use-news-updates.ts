"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { NewsItem } from "@/features/homepage/types/news"

export function useNewsUpdates(limit = 3) {
  const supabase = createClient()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(limit)

        if (fetchError) throw fetchError

        const formattedNews: NewsItem[] = (data || []).map((article) => {
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
          }
        })

        setNews(formattedNews)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news")
        console.error("[v0] Error fetching news:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [limit])

  return { news, loading, error }
}
