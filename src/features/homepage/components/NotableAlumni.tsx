import Image from "next/image"
import { GraduationCap } from "lucide-react"
import { useAlumni } from "@/features/homepage/hooks/use-alumni"

export default function NotableAlumni() {
  const { alumni, loading, error, getImageUrl } = useAlumni()

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full rounded-bl-none bg-yellow-50 text-yellow-600 text-sm font-medium">
            <GraduationCap className="size-4" />
            Success Stories
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Notable Alumni</h2>
        </div>
        <div className="text-center text-gray-500">Loading alumni stories...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full rounded-bl-none bg-yellow-50 text-yellow-600 text-sm font-medium">
          <GraduationCap className="size-4" />
          Success Stories
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Notable Alumni</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Our graduates have gone on to make significant contributions in media, development work, and public service
          across the Philippines and beyond.
        </p>
      </div>

      {/* Alumni Cards */}
      <div
        className="
        flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide 
        md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-3 md:overflow-visible md:pb-0
      "
      >
        {alumni.map((alumnus) => (
          <div
            key={alumnus.id}
            className="
              min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center
              bg-white rounded-lg md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition
            "
          >
            {/* Image */}
            <div className="relative h-56 w-full">
              <Image
                src={getImageUrl(alumnus.image_url) || "/placeholder.svg"}
                alt={alumnus.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{alumnus.name}</h3>

              <p className="text-sm text-gray-500 mb-3">
                {alumnus.degree_program} • Batch {alumnus.batch_year}
              </p>

              <div className="space-y-2 text-sm mb-4">
                <p className="font-medium text-gray-900">{alumnus.job_role}</p>
                <p className="text-gray-600">{alumnus.company}</p>
              </div>

              <p className="text-sm text-[#207bbe] mb-4">{alumnus.achievement}</p>

              <blockquote className="border-l-2 border-blue-200 pl-4 text-sm text-gray-600 italic">
                "{alumnus.quote}"
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
