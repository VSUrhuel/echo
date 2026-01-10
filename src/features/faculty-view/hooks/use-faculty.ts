"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { Profile } from "@/features/faculty-view/types/profiles"

export function useFaculty() {
  const supabase = createClient()
  const [faculty, setFaculty] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/faculty.jpg"
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return imagePath
  }

  useEffect(() => {
    async function fetchFaculty() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("is_deleted", false)
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError

        setFaculty(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch faculty")
        console.error("[v0] Error fetching faculty:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFaculty()
  }, [])

  return { faculty, loading, error, getImageUrl }
}
