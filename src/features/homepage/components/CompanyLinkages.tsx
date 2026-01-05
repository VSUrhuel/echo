import Image from "next/image"
import Link from "next/link"

// Temporary Data – can be replaced later with Supabase data
type Partner = {
  id: number
  name: string
  category: string
  logo: string
  href?: string
}

const partners: Partner[] = [
  {
    id: 1,
    name: "ABS-CBN Corporation",
    category: "Broadcast Media",
    logo: "/images/partners/ABS.png",
  },
  {
    id: 2,
    name: "GMA Network",
    category: "Broadcast Media",
    logo: "/images/partners/GMA.webp",
  },
  {
    id: 3,
    name: "Philippine Information Agency",
    category: "Government Agency",
    logo: "/images/partners/PIA.jpg",
  },
  {
    id: 4,
    name: "DENR Region 8",
    category: "Government Agency",
    logo: "/images/partners/DENR.png",
  },
  {
    id: 5,
    name: "Eastern Visayas State University",
    category: "Academic Institution",
    logo: "/images/partners/EVSU.png",
  },
  {
    id: 6,
    name: "LGU Baybay City",
    category: "Local Government",
    logo: "/images/partners/BAYBAY.png",
  },
  {
    id: 7,
    name: "PhilRice",
    category: "Research Institution",
    logo: "/images/partners/PHIL.png",
  },
  {
    id: 8,
    name: "IRRI",
    category: "International Organization",
    logo: "/images/partners/IRRI.jpg",
  },
]

export default function CompanyLinkages() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block mb-3 px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
          Industry Partners
        </span>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          OJT Company Linkages
        </h2>

        <p className="text-gray-600">
          Our program maintains strong partnerships with leading media
          organizations, government agencies, and development institutions to
          provide students with valuable hands-on training experiences.
        </p>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition"
          >
            <div className="relative h-20 w-full mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">
              {partner.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {partner.category}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <p className="text-gray-600">
          Interested in becoming a partner institution?{" "}
          <Link
            href="/contact"
            className="text-blue-600 font-medium hover:underline"
          >
            Contact us
          </Link>
        </p>
      </div>
    </section>
  )
}
