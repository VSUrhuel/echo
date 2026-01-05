import Image from "next/image"
import Link from "next/link"


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
    image: "/images/DevcomHeroSample.png",
  },
  {
    id: 2,
    category: "Events",
    date: "December 10, 2024",
    title: "Community Radio Workshop Series Launched",
    description:
      "A new workshop series aims to train students in community broadcasting techniques for rural development.",
    image: "/images/DevcomHeroSample.png",
  },
  {
    id: 3,
    category: "Research",
    date: "December 5, 2024",
    title: "Research Paper Published in International Journal",
    description:
      "Dr. Maria Santos' research on participatory communication in agricultural extension gains international recognition.",
    image: "/images/DevcomHeroSample.png",
  },
]

export default function NewsUpdates() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            News & Updates
          </h2>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest from DevCom
          </p>
        </div>

        <Link
          href="/news"
          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
        >
          View All News →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            <div className="relative h-56 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                  {item.category}
                </span>
                <span className="text-gray-500">{item.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {item.description}
              </p>

              <Link
                href={`/news/${item.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
