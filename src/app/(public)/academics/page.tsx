"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { useCourses } from "@/features/academics/hooks/use-courses"
import { groupCoursesBySemester } from "@/features/academics/utils/group-courses"
import { CourseDetailModal } from "@/features/academics/components/course-detail-modal"
import type { Course } from "@/features/academics/types/coures"

export default function AcademicsPage() {
  const [programLevel, setProgramLevel] = useState<"Undergraduate" | "Graduate">("Undergraduate")
  const [selectedYear, setSelectedYear] = useState(1)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const { courses, loading, error } = useCourses(
    programLevel,
    programLevel === "Undergraduate" ? selectedYear : undefined,
  )

  const groupedCourses = groupCoursesBySemester(courses)

  const handleDownloadProspectus = () => {
    const pdfUrl =
      programLevel === "Undergraduate"
        ? "/files/BSDC-Curriculum.pdf"
        : "/files/MSDC-Program.pdf"

    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `${programLevel.toLowerCase()}-prospectus.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="bg-[#004494] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-medium backdrop-blur-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 16.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              BS Development Communication
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Academic Curriculum
          </h1>

          <p className="max-w-3xl text-balance text-lg leading-relaxed text-white/90">
            Our four-year program combines theoretical foundations with practical skills in communication for
            sustainable development, preparing students for diverse careers in media, community development, and
            strategic communication.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Course Offerings</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Click on any course to view details, unit counts, and prerequisites
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadProspectus}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFB800] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#E5A600]"
              >
                <Download className="h-4 w-4" />
                Download Full Prospectus (PDF)
              </button>

              <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm">
                <button
                  onClick={() => setProgramLevel("Undergraduate")}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    programLevel === "Undergraduate"
                      ? "bg-[#004494] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Undergraduate
                </button>
                <button
                  onClick={() => setProgramLevel("Graduate")}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    programLevel === "Graduate"
                      ? "bg-[#004494] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Graduate
                </button>
              </div>
            </div>
          </div>

          {!loading && !error && (
            <>
              {programLevel === "Undergraduate" && (
                <>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                          selectedYear === year
                            ? "bg-[#004494] text-white shadow-md"
                            : "border border-gray-300 bg-white text-gray-700 hover:border-[#004494] hover:bg-gray-50"
                        }`}
                      >
                        {year === 1 && "1st Year"}
                        {year === 2 && "2nd Year"}
                        {year === 3 && "3rd Year"}
                        {year === 4 && "4th Year"}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <SemesterCard
                      title="First Semester"
                      courses={groupedCourses.semester1}
                      onCourseClick={setSelectedCourse}
                    />
                    <SemesterCard
                      title="Second Semester"
                      courses={groupedCourses.semester2}
                      onCourseClick={setSelectedCourse}
                    />
                  </div>
                </>
              )}

              {programLevel === "Graduate" && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <SemesterCard
                    title="Core Courses"
                    courses={groupedCourses.semester1}
                    onCourseClick={setSelectedCourse}
                  />
                  <SemesterCard
                    title="Specialization & Thesis"
                    courses={groupedCourses.semester2}
                    onCourseClick={setSelectedCourse}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </main>
  )
}

function SemesterCard({
  title,
  courses,
  onCourseClick,
}: {
  title: string
  courses: Course[]
  onCourseClick: (course: Course) => void
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      {courses.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          No courses available
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {courses.map((course) => (
            <li
              key={course.course_code}
              onClick={() => onCourseClick(course)}
              className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4 transition-colors hover:bg-blue-50"
            >
              <div className="flex-1">
                <p className="font-medium text-[#004494]">{course.course_code}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{course.title}</p>
              </div>
              <span className="flex-shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#004494]">
                {course.units} units
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
