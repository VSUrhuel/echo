import Image from "next/image"
import Link from "next/link"
import { ExternalLink, MoveRight } from 'lucide-react'
import { AspectRatio } from "@/components/ui/aspect-ratio"

//Temporary Data, will replace this later with the data from supabase
type NewsItem = {
  id: number
  category: string
  date: string
  title: string
  description: string
  image: string
}

const newsData: NewsItem[] = [
  {
    id: 1,
    category: "Achievement",
    date: "December 15, 2024",
    title: "DevCom Students Win Regional Documentary Competition",
    description:
      "Our students showcased exceptional storytelling skills at the 2024 Visayas Media Festival, bringing home top honors.",
    image: "/images/ThumbnailSample1.png",
  },
  {
    id: 2,
    category: "Events",
    date: "December 10, 2024",
    title: "Community Radio Workshop Series Launched",
    description:
      "A new workshop series aims to train students in community broadcasting techniques for rural development.",
    image: "/images/ThumbnailSample1.png",
  },
  {
    id: 3,
    category: "Research",
    date: "December 5, 2024",
    title: "Research Paper Published in International Journal",
    description:
      "Dr. Maria Santos' research on participatory communication in agricultural extension gains international recognition.",
    image: "/images/ThumbnailSample1.png",
  },
]

export default function NewsUpdates() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Latest News
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Stay updated with the latest from DevCom
          </p>
        </div>

        <a
          href={`/news`}
          className="inline-flex items-center gap-2 text-[#207bbe] font-medium px-2 py-2 -ml-2 md:ml-0 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
        >
          View All News 
          <MoveRight className="size-4" />
        </a>
      </div>

      {/* Cards */}
      <div className="
        flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide 
        md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:pb-0
      ">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="
              min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center                              
              bg-white rounded-lg md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col
            "
          >
            <div className="w-full">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
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
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
        
              <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3 md:line-clamp-none">
                {item.description}
              </p>
        
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