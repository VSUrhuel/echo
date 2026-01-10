"use client";
import { Suspense } from "react"
import NewsContent from "@/features/news&updates/components/news-content"

export default function NewsPage() {
  return (
    <Suspense fallback={null}>
      <NewsContent />
    </Suspense>
  )
}
