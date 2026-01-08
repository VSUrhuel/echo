import Image from "next/image"
import { GraduationCap } from 'lucide-react'

// Temporary Data – replace later with Supabase
type Alumni = {
  id: number
  name: string
  batch: string
  role: string
  organization: string
  achievement: string
  quote: string
  image: string
}

const alumniData: Alumni[] = [
  {
    id: 1,
    name: "Maria Santos",
    batch: "Batch 2018",
    role: "Senior Communications Officer",
    organization: "United Nations Development Programme",
    achievement:
      "Led communication campaigns for climate action in Southeast Asia",
    quote:
      "DevCom VSU gave me the foundation to pursue meaningful work in development communication.",
    image: "/images/profile.webp",
  },
  {
    id: 2,
    name: "Juan dela Cruz",
    batch: "Batch 2016",
    role: "Documentary Filmmaker",
    organization: "GMA Public Affairs",
    achievement:
      "Winner of Best Documentary at the Gawad Urian Awards 2023",
    quote:
      "The hands-on training at VSU prepared me for the demands of broadcast journalism.",
    image: "/images/profile.webp",
  },
  {
    id: 3,
    name: "Ana Reyes",
    batch: "Batch 2019",
    role: "Development Communication Specialist",
    organization: "World Bank Philippines",
    achievement:
      "Spearheaded community engagement programs reaching 50,000+ farmers",
    quote:
      "Our professors instilled in us the value of communication for social change.",
   image: "/images/profile.webp",
  },
  {
    id: 4,
    name: "Carlo Mendoza",
    batch: "Batch 2020",
    role: "Digital Content Manager",
    organization: "ABS-CBN News",
    achievement:
      "Built digital strategy reaching 5M+ monthly viewers",
    quote:
      "VSU DevCom taught me to blend traditional media with digital innovation.",
    image: "/images/profile.webp",
  },
]

export default function NotableAlumni() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full rounded-bl-none bg-yellow-50 text-yellow-600 text-sm font-medium">
          <GraduationCap className="size-4" />
          Success Stories
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Notable Alumni
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Our graduates have gone on to make significant contributions in
          media, development work, and public service across the Philippines
          and beyond.
        </p>
      </div>

      {/* Alumni Cards */}
      <div className="
        flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory scrollbar-hide 
        md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-3 md:overflow-visible md:pb-0
      ">
        {alumniData.map((alumni) => (
          <div
            key={alumni.id}
            className="
              min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center
              bg-white rounded-lg md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition
            "
          >
            {/* Image */}
            <div className="relative h-56 w-full">
              <Image
                src={alumni.image}
                alt={alumni.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {alumni.name}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {alumni.batch}
              </p>

              <div className="space-y-2 text-sm mb-4">
                <p className="font-medium text-gray-900">
                  {alumni.role}
                </p>
                <p className="text-gray-600">
                  {alumni.organization}
                </p>
              </div>

              <p className="text-sm text-[#207bbe] mb-4">
                {alumni.achievement}
              </p>

              <blockquote className="border-l-2 border-blue-200 pl-4 text-sm text-gray-600 italic">
                “{alumni.quote}”
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}