"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { Thesis } from "@/features/resources/types/thesis"

export function useTheses() {
  const supabase = createClient()
  const [theses, setTheses] = useState<Thesis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchTheses() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from("theses")
          .select("*")
          .order("year_published", { ascending: false })

        if (fetchError) throw fetchError

        setTheses(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch theses")
        console.error("Error fetching theses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTheses()
  }, [])

  const filteredTheses = theses.filter((thesis) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const authorsString = Array.isArray(thesis.authors)
      ? thesis.authors
          .map((a) => (typeof a === "string" ? a : a.name))
          .join(" ")
          .toLowerCase()
      : ""
    return (
      thesis.title.toLowerCase().includes(query) ||
      authorsString.includes(query) ||
      thesis.keywords?.toLowerCase().includes(query)
    )
  })

  const getAuthorNames = (authors: Thesis["authors"]): string => {
    if (!authors || !Array.isArray(authors)) return "Unknown Author"
    return authors.map((author) => (typeof author === "string" ? author : author.name)).join(", ")
  }

  const getKeywordsArray = (keywords: string): string[] => {
    if (!keywords) return []
    return keywords.split(",").map((k) => k.trim())
  }

  return {
    theses: filteredTheses,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    getAuthorNames,
    getKeywordsArray,
  }
}
