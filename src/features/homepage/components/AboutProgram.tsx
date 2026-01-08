import { Target, Eye, Lightbulb } from "lucide-react"

const aboutItems = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To develop competent development communication professionals who can effectively use communication strategies to promote sustainable development and social transformation.",
    icon: Target,
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "To be a leading center of excellence in development communication education and research in Southeast Asia, producing globally competitive graduates.",
    icon: Eye,
  },
  {
    id: 3,
    title: "Core Values",
    description:
      "Excellence in communication, commitment to community service, integrity in research, innovation in practice, and respect for cultural diversity.",
    icon: Lightbulb,
  },
]

export default function AboutProgram() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          About the Program
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          The BS Development Communication program at Visayas State University
          is committed to producing skilled communicators who can facilitate
          development processes and create meaningful social impact.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {aboutItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="bg-white rounded-lg md:rounded-2xl border border-gray-100 shadow-sm px-6 py-6 md:px-8 md:py-8 text-center hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#207bbe]" />
                </div>
              </div>
          
              {/* Title */}
              <h3 className="text-lg md:text-2xl font-bold text-[#24418f] mb-3 md:mb-4">
                {item.title}
              </h3>
          
              {/* Description */}
              <p className="text-gray-600 text-xs md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
