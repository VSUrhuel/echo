"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import type { NewsItem, NewsArticle } from "@/features/homepage/types/news"

export function useFeaturedArticle() {
  const supabase = createClient()
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .eq("is_featured", true)
          .order("published_at", { ascending: false })
          .limit(1)
          .single()

        if (error) throw error

        let imageUrl = "/news-article.png"
if (data.cover_image_url) {
  imageUrl = data.cover_image_url
}

setArticle({
  id: data.id,
  slug: data.slug,
  category: data.category || "News",
  date: data.published_at
    ? new Date(data.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  title: data.title,
  description: data.excerpt,
  image: imageUrl,
})

      } catch (err) {
        setError("Failed to load featured article")
        console.error("[v0] Featured article error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  return { article, loading, error }
}
