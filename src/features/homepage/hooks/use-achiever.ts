"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { Achiever } from "@/features/homepage/types/achiever"

export function useAchievers() {
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const supabase = createClient()
        const { data, error: supabaseError } = await supabase
          .from("student_achievers")
          .select("*")
          .eq("is_deleted", false)
          .order("updated_at", { ascending: false })
          .limit(2)

        if (supabaseError) throw supabaseError
        setAchievers(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch achievers")
      } finally {
        setLoading(false)
      }
    }

    fetchAchievers()
  }, [])

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/Profile.jpg"
    return imageUrl
  }

  return { achievers, loading, error, getImageUrl }
}
