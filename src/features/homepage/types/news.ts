export interface NewsArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string
  category: string
  tags: string
  author_id: string
  is_featured: boolean
  status: string
  published_at: string
  views_count: number
  created_at: string
  updated_at: string
}

export interface NewsItem {
  id: number
  category: string
  date: string
  title: string
  description: string
  image: string
}
