"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { Alumni } from "@/features/homepage/types/alumni"

export function useAlumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const supabase = createClient()
        const { data, error: supabaseError } = await supabase
          .from("alumni_stories")
          .select("*")
          .eq("is_deleted", false)
          .order("updated_at", { ascending: false })
           .limit(4)

        if (supabaseError) throw supabaseError
        setAlumni(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch alumni")
      } finally {
        setLoading(false)
      }
    }

    fetchAlumni()
  }, [])

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "/Profile.jpg"

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return imageUrl
  }

  return { alumni, loading, error, getImageUrl }
}
