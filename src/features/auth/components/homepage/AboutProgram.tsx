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
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          About the Program
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          The BS Development Communication program at Visayas State University
          is committed to producing skilled communicators who can facilitate
          development processes and create meaningful social impact.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {aboutItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10 text-center hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-blue-700" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
