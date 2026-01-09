"use client"

import Image from "next/image"
import { Award } from "lucide-react"
import { useAchievers } from "@/features/homepage/hooks/use-achiever"

export default function RisingStars() {
  const { achievers, loading, error, getImageUrl } = useAchievers()

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-blue-50 rounded-3xl p-5 md:p-8 text-center text-gray-500">
          Loading rising stars...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-blue-50 rounded-3xl p-5 md:p-8 text-center text-red-500">
          Failed to load rising stars.
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="bg-blue-50 rounded-3xl p-5 md:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-[#207bbe]">
            <Award className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Rising Stars
            </h3>
            <p className="text-gray-600 text-sm">
              Current students making their mark
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievers.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-full rounded-bl-lg border border-gray-100 shadow-sm hover:shadow-md transition flex items-center p-4 gap-4"
            >
              <div className="relative w-16 md:w-20 aspect-square shrink-0 rounded-full overflow-hidden bg-gray-50">
                <Image
                  src={getImageUrl(student.image_url)}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                  {student.name}
                </h4>

                <p className="text-xs md:text-sm text-[#207bbe] font-medium">
                  {student.year_level}
                  {student.year_level === 1
                    ? "st Year"
                    : student.year_level === 2
                    ? "nd Year"
                    : student.year_level === 3
                    ? "rd Year"
                    : "th Year"}
                </p>

                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {student.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
