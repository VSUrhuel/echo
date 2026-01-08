"use client"

import { X, BookOpen, Clock, FileText } from "lucide-react"
import type { Course } from "@/features/academics/types/coures"
import { useCoursePrerequisites } from "@/features/academics/hooks/use-course-prerequisites"

interface CourseDetailModalProps {
  course: Course | null
  onClose: () => void
}

export function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  const { prerequisites, loading: loadingPrereqs } = useCoursePrerequisites(course?.id || null)

  if (!course) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Course Code Badge */}
        <div className="mb-4">
          <span className="inline-block rounded-lg bg-[#004494] px-4 py-2 text-sm font-bold text-white">
            {course.course_code}
          </span>
        </div>

        {/* Course Title */}
        <h2 className="mb-4 text-2xl font-bold text-gray-900">{course.title}</h2>

        {/* Description */}
        <p className="mb-6 leading-relaxed text-gray-600">{course.description}</p>

        {/* Units Info */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <BookOpen className="h-6 w-6 text-[#004494]" />
            <div>
              <p className="text-sm text-gray-500">Lecture Units</p>
              <p className="text-2xl font-bold text-gray-900">{course.lecture_units}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <Clock className="h-6 w-6 text-[#004494]" />
            <div>
              <p className="text-sm text-gray-500">Lab Units</p>
              <p className="text-2xl font-bold text-gray-900">{course.lab_units}</p>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Prerequisites</p>
              {loadingPrereqs ? (
                <p className="mt-1 text-sm text-gray-600">Loading...</p>
              ) : prerequisites.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {prerequisites.map((prereq) => (
                    <p key={prereq.id} className="text-sm text-gray-600">
                      {prereq.course_code}: {prereq.title}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-600">None</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
