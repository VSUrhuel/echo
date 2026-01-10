"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search, ExternalLink } from "lucide-react"
import { useAllArticles } from "@/features/news&updates/hooks/use-all-articles"
import { useArticleCategories } from "@/features/news&updates/hooks/use-article-categories"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useFeaturedArticle } from "@/features/news&updates/hooks/use-featured-article"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"



export default function NewsContent() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isSearching, setIsSearching] = useState(false)
  const { article: featured } = useFeaturedArticle()


  const initialCategory = searchParams.get("category") || "All"

  useEffect(() => {
    setSelectedCategory(initialCategory)
  }, [initialCategory])

  const { articles, loading, error, totalPages } = useAllArticles(
    currentPage,
    selectedCategory === "All" ? null : selectedCategory,
    isSearching ? searchQuery : null,
  )

  const { categories } = useArticleCategories()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentPage(1)
    setIsSearching(true)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setIsSearching(false)
    setSearchQuery("")
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    setCurrentPage(1)
  }

  const router = useRouter()

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="bg-[#004494] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-medium backdrop-blur-sm">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Latest Updates
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">News & Updates</h1>

          <p className="max-w-3xl text-balance text-lg leading-relaxed text-white/90">
            Stay informed about the latest happenings, achievements, events, and announcements from the Department of
            Development Communication.
          </p>
        </div>
      </section>
        {/* FEATURED ARTICLE */}
{featured && (

  <section className="bg-white px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-6 lg:grid-cols-2 items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3 text-sm">
            <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
              Featured
            </span>
            <span className="text-gray-500">{featured.date}</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#004494]">
              {featured.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {featured.title}
          </h2>

          <p className="text-gray-600 mb-6 max-w-xl">
            {featured.description}
          </p>

          <div className="mt-auto pt-4">
  <Button
    onClick={() => router.push(`/articles/${featured.slug}`)}
    variant="ghost"
    className="inline-flex items-center gap-2 text-[#004494] font-medium px-2 py-2 -ml-2 rounded-lg hover:bg-blue-50 transition-colors text-sm h-auto"
  >
    Read More
    <ExternalLink className="size-4" />
  </Button>
</div>

        </div>
      </div>
    </div>
  </section>
)}

      {/* SEARCH AND FILTER SECTION */}
      <section className="border-b border-gray-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-[#004494] focus:outline-none focus:ring-1 focus:ring-[#004494]"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-[#004494] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#003366] transition-colors"
            >
              Search
            </button>
            {isSearching && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </form>

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-700">Filter:</span>
            <button
              onClick={() => handleCategoryChange("All")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === "All" ? "bg-[#004494] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#004494] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#004494] border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Error loading articles</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found. Try adjusting your search or filters.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              {/* ARTICLES GRID */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-[#004494] text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

/* ARTICLE CARD COMPONENT */
function ArticleCard({
  article,
}: { article: { id: number; slug: string; category: string; date: string; title: string; description: string; image: string } }) {
    const router = useRouter()

  return (
    
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* IMAGE */}
      <div className="w-full overflow-hidden bg-gray-100">
        <AspectRatio ratio={16 / 9}>
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </AspectRatio>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-3 text-sm">
          <Link
            href={`/news?category=${article.category}`}
            className="px-3 py-1 rounded-full text-[#004494] bg-blue-50 border border-blue-300 font-medium text-xs hover:bg-blue-100 transition-colors"
          >
            {article.category}
          </Link>
          <span className="text-gray-500 text-xs">{article.date}</span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>

        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{article.description}</p>

        <div className="mt-auto pt-4">
  <Button
    onClick={() => router.push(`/articles/${article.slug}`)}
    variant="ghost"
    className="inline-flex items-center gap-2 text-[#004494] font-medium px-2 py-2 -ml-2 rounded-lg hover:bg-blue-50 transition-colors text-sm h-auto"
  >
    Read More
    <ExternalLink className="size-4" />
  </Button>
</div>

      </div>
    </div>
  )
}
