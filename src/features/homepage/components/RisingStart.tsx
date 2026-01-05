import Image from "next/image"

// Temporary Data – replace later with Supabase
type RisingStar = {
  id: number
  name: string
  yearLevel: string
  achievement: string
  image: string
}

const risingStars: RisingStar[] = [
  {
    id: 1,
    name: "Rica Mae Flores",
    yearLevel: "4th Year",
    achievement:
      "National Winner, CHED DevCom Research Competition 2024",
    image: "/images/profile.webp",
  },
  {
    id: 2,
    name: "Mark Anthony Tan",
    yearLevel: "3rd Year",
    achievement:
      "Regional Champion, Documentary Film Festival 2024",
    image: "/images/profile.webp",
  },
]

export default function RisingStars() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="bg-gray-50 rounded-3xl p-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700">
            🎓
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {risingStars.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-14 w-14 rounded-full overflow-hidden">
                <Image
                  src={student.image}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  {student.name}
                </h4>

                <p className="text-sm text-blue-600 font-medium">
                  {student.yearLevel}
                </p>

                <p className="text-sm text-gray-600 mt-1">
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
