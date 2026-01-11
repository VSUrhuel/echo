"use client"

import { Download, FileText, Search, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheses } from "@/features/resources/hooks/use-theses"

interface DocumentItem {
  name: string
  type: string
  size: string
  url: string
}

interface DocumentCategory {
  title: string
  documents: DocumentItem[]
}

const documentCategories: DocumentCategory[] = [
  {
    title: "Internship Forms",
    documents: [
      {
        name: "Internship Application Form",
        type: "PDF",
        size: "245 KB",
        url: "/documents/internship-application.pdf",
      },
      { name: "Internship Waiver Form", type: "PDF", size: "128 KB", url: "/documents/internship-waiver.pdf" },
      { name: "OJT Daily Time Record", type: "DOCX", size: "56 KB", url: "/documents/ojt-daily-record.docx" },
      { name: "Internship Evaluation Form", type: "PDF", size: "312 KB", url: "/documents/internship-evaluation.pdf" },
    ],
  },
  {
    title: "Thesis Documents",
    documents: [
      { name: "Thesis Proposal Template", type: "DOCX", size: "89 KB", url: "/documents/thesis-proposal.docx" },
      { name: "Thesis Defense Protocol", type: "PDF", size: "156 KB", url: "/documents/thesis-defense.pdf" },
      { name: "Ethics Clearance Form", type: "PDF", size: "198 KB", url: "/documents/ethics-clearance.pdf" },
      { name: "Thesis Format Guidelines", type: "PDF", size: "423 KB", url: "/documents/thesis-format.pdf" },
    ],
  },
  {
    title: "Student Forms",
    documents: [
      { name: "Leave of Absence Request", type: "PDF", size: "112 KB", url: "/documents/leave-request.pdf" },
      { name: "Course Substitution Form", type: "PDF", size: "98 KB", url: "/documents/course-substitution.pdf" },
      { name: "Certificate Request Form", type: "PDF", size: "67 KB", url: "/documents/certificate-request.pdf" },
      { name: "Academic Load Adjustment", type: "PDF", size: "134 KB", url: "/documents/academic-load.pdf" },
    ],
  },
]

function DocumentCard({ category }: { category: DocumentCategory }) {
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900">{category.title}</CardTitle>
        <p className="text-sm text-gray-500">{category.documents.length} documents available</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {category.documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-t border-gray-100 first:border-t-0">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-[#004494] hover:underline cursor-pointer">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  {doc.type} • {doc.size}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => handleDownload(doc.url, doc.name)}
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download {doc.name}</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ThesisCard({
  title,
  author,
  year,
  keywords,
  onView,
}: {
  title: string
  author: string
  year: number
  keywords: string[]
  onView: () => void
}) {
  return (
    <Card className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-gray-900 leading-tight">{title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {year}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {keywords.slice(0, 3).map((keyword, index) => (
                <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="shrink-0 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ThesisCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-1.5 pt-1">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-18" />
            </div>
          </div>
          <Skeleton className="h-9 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ResourcesSection() {
  const { theses, loading, error, searchQuery, setSearchQuery, getAuthorNames, getKeywordsArray } = useTheses()

  const handleViewThesis = (documentUrl: string) => {
    if (documentUrl) {
      window.open(documentUrl, "_blank")
    }
  }

  return (
    <main className="w-full">
      <section className="bg-[#004494] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-medium backdrop-blur-sm">
              <FileText className="h-4 w-4" />
              Student Resources
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Resources & Downloads</h1>

          <p className="max-w-3xl text-balance text-lg leading-relaxed text-white/90">
            Access important forms, documents, and research materials. Download internship forms, thesis protocols, and
            browse our thesis archive for reference.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Downloadable Forms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {documentCategories.map((category, index) => (
              <DocumentCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Thesis Archive</h2>
            <p className="text-gray-600">
              Search and browse completed undergraduate theses for reference and inspiration
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-[#004494] focus:outline-none focus:ring-1 focus:ring-[#004494]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <>
                <ThesisCardSkeleton />
                <ThesisCardSkeleton />
                <ThesisCardSkeleton />
              </>
            ) : error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                <p className="font-semibold">Error loading theses</p>
                <p className="mt-1">{error}</p>
              </div>
            ) : theses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {searchQuery ? "No theses found matching your search." : "No theses available."}
                </p>
              </div>
            ) : (
              theses.map((thesis) => (
                <ThesisCard
                  key={thesis.id}
                  title={thesis.title}
                  author={getAuthorNames(thesis.authors)}
                  year={thesis.year_published}
                  keywords={getKeywordsArray(thesis.keywords)}
                  onView={() => handleViewThesis(thesis.document_url)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
