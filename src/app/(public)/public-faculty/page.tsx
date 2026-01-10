"use client"

import { Mail } from "lucide-react"
import { useFaculty } from "@/features/faculty-view/hooks/use-faculty"

export default function FacultyPage() {
  const { faculty, loading, error, getImageUrl } = useFaculty()

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
              Our Team
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Faculty Directory</h1>

          <p className="max-w-3xl text-balance text-lg leading-relaxed text-white/90">
            Meet our dedicated team of educators and researchers committed to excellence in development communication
            education. Our faculty brings diverse expertise and real-world experience to the classroom.
          </p>
        </div>
      </section>

      {/* FACULTY GRID SECTION */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#004494] border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Error loading faculty</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && faculty.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No faculty members found</p>
            </div>
          )}

          {!loading && !error && faculty.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {faculty.map((member) => (
                <FacultyCard key={member.id} member={member} imageUrl={getImageUrl(member.image_url)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* JOIN DEPARTMENT SECTION */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Join Our Department</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We are always looking for passionate educators and researchers to join our team. If you are interested in
            teaching or research opportunities in development communication, please contact us.
          </p>
          <a
            href="mailto:devcom@ucu.edu.ph"
            className="mt-6 inline-flex items-center gap-2 text-[#004494] font-semibold hover:underline"
          >
            <Mail className="h-4 w-4" />
            devcom@ucu.edu.ph
          </a>
        </div>
      </section>
    </main>
  )
}

/* FACULTY CARD COMPONENT */
function FacultyCard({ member, imageUrl }: { member: any; imageUrl: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* IMAGE */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={`${member.first_name} ${member.last_name}`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-[#004494]">
          {member.first_name} {member.last_name}
        </h3>

        <p className="mt-1 text-sm font-medium text-gray-700">{member.designation}</p>

        <p className="mt-2 text-sm text-[#FF6B35]">{member.specialization}</p>

        <a
          href={`mailto:${member.email}`}
          className="mt-3 flex items-center gap-2 text-xs text-gray-500 hover:text-[#004494] transition-colors"
        >
          <Mail className="h-3 w-3" />
          {member.email}
        </a>
      </div>
    </div>
  )
}
