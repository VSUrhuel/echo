"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import type { PrerequisiteCourse } from "@/features/academics/types/coures"

export function useCoursePrerequisites(courseId: number | null) {
  const supabase = createClient()
  const [prerequisites, setPrerequisites] = useState<PrerequisiteCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) {
      setPrerequisites([])
      setLoading(false)
      return
    }

    async function fetchPrerequisites() {
      try {
        setLoading(true)
        setError(null)

        // First, get the prerequisite IDs from the junction table
        const { data: prerequisiteLinks, error: linksError } = await supabase
          .from("course_prerequisites")
          .select("prerequisite_id")
          .eq("course_id", courseId)

        if (linksError) throw linksError

        if (!prerequisiteLinks || prerequisiteLinks.length === 0) {
          setPrerequisites([])
          setLoading(false)
          return
        }

        // Extract the prerequisite IDs
        const prerequisiteIds = prerequisiteLinks.map((link) => link.prerequisite_id)

        // Fetch the actual course details for the prerequisites
        const { data: prerequisiteCourses, error: coursesError } = await supabase
          .from("courses")
          .select("id, course_code, title")
          .in("id", prerequisiteIds)

        if (coursesError) throw coursesError

        setPrerequisites(prerequisiteCourses || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch prerequisites")
        console.error("[v0] Error fetching prerequisites:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrerequisites()
  }, [courseId])

  return { prerequisites, loading, error }
}
