"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { Partner } from "@/features/homepage/types/partners"

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true)
        const supabase = createClient()

        const { data, error: fetchError } = await supabase
          .from("partners")
          .select("*")
          .eq("is_active", true)
          .eq("is_deleted", false)
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError

        setPartners(data || [])
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch partners"))
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  const getImageUrl = (logoUrl: string) => {
    if (!logoUrl) return "/partner-default.jpg"

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const bucket = "partner-logos"

    if (logoUrl.startsWith("http")) {
      return logoUrl
    }

    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${logoUrl}`
  }

  return { partners, loading, error, getImageUrl }
}
