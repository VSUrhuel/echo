"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

export function useArticleCategories() {
  const supabase = createClient()
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("category")
          .eq("status", "published")
          .not("category", "is", null)

        if (error) throw error

        const uniqueCategories = Array.from(new Set(data?.map((item) => item.category) || []))
        setCategories(uniqueCategories as string[])
      } catch (err) {
        console.error("[v0] Error fetching categories:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}
