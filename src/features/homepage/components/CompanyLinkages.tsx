"use client"

import Image from "next/image"
import Link from "next/link"
import { Handshake, ExternalLink, MoveRight } from "lucide-react"
import { usePartners } from "@/features/homepage/hooks/use-partners"

export default function CompanyLinkages() {
  const { partners, loading, error, getImageUrl } = usePartners()

  const displayedPartners = partners.slice(0, 8)

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-16">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full rounded-bl-none bg-blue-50 text-[#207bbe] text-sm font-medium">
            <Handshake className="size-4" />
            Industry Partners
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">OJT Company Linkages</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Our program maintains strong partnerships with leading media organizations, government agencies, and
            development institutions to provide students with valuable hands-on training experiences.
          </p>
        </div>

        <a
          href={`/partners`}
          className="inline-flex items-center gap-2 text-[#207bbe] font-medium px-2 py-2 -ml-2 md:ml-0 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base whitespace-nowrap"
        >
          View All Partners
          <MoveRight className="size-4" />
        </a>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">Loading partners...</div>
        ) : error ? (
          <div className="col-span-full text-center py-10 text-red-500">
            Failed to load partners. Please try again later.
          </div>
        ) : displayedPartners.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">No partners available at the moment.</div>
        ) : (
          displayedPartners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white rounded-lg md:rounded-2xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ExternalLink className="size-4 text-gray-400 hover:text-[#207bbe]" />
              </div>

              <div className="relative h-20 w-full mb-4">
                <Image
                  src={getImageUrl(partner.logo_url) || "/partner-default.jpg"}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  unoptimized={typeof partner.logo_url === "string" && partner.logo_url.startsWith("http")}

                />
              </div>

              <h3 className="text-sm font-semibold text-gray-900">{partner.name}</h3>

              <p className="text-xs text-gray-500 mt-1">{partner.type}</p>
            </a>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <p className="text-gray-600">
          Interested in becoming a partner institution?{" "}
          <Link href="/contact" className="text-[#207bbe] font-medium hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  )
}
