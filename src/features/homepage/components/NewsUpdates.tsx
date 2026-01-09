"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, MoveRight } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useNewsUpdates } from "@/features/homepage/hooks/use-news-updates"

export default function NewsUpdates() {
  const { news, loading, error } = useNewsUpdates(3)

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-gray-500">Loading news...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-red-500">Error loading news: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Latest News</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Stay updated with the latest from DevCom</p>
        </div>

        <a
          href={`/news`}
          className="inline-flex items-center gap-2 text-[#207bbe] font-medium px-2 py-2 -ml-2 md:ml-0 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
        >
          View All News
          <MoveRight className="size-4" />
        </a>
      </div>

      <div
        className="
        flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide 
        md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:pb-0
      "
      >
        {news.map((item) => (
          <div
            key={item.id}
            className="
              min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center                              
              bg-white rounded-lg md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col
            "
          >
            <div className="w-full">
              <AspectRatio ratio={16 / 9}>
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </AspectRatio>
            </div>
            <div className="p-4 md:p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between text-sm mb-3">
                <Link
                  href={`/news?category=${item.category}`}
                  className="px-3 py-1 rounded-full rounded-bl-none text-[#207bbe] bg-blue-50 border border-blue-300 font-medium text-xs md:text-sm"
                >
                  {item.category}
                </Link>
                <span className="text-gray-500 text-xs md:text-sm">{item.date}</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>

              <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3 md:line-clamp-none">{item.description}</p>

              <div>
                <a
                  href={`/news/${item.id}`}
                  className="inline-flex items-center gap-2 text-[#207bbe] font-medium px-2 py-2 -ml-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  Read More
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
