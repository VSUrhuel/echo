"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client";
import type { Course } from "../types/coures"

const supabase = createClient();
export function useCourses(programLevel: "Undergraduate" | "Graduate", yearLevel?: number) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from("courses")
          .select("*")
          .eq("program_level", programLevel)
          .order("semester", { ascending: true })
          .order("course_code", { ascending: true })

        if (yearLevel) {
          query = query.eq("year_level", yearLevel)
        }
        
        const { data, error: fetchError } = await query

        if (fetchError) throw fetchError

        setCourses(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses")
        console.error("[v0] Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [programLevel, yearLevel])

  return { courses, loading, error }
}
