export interface Thesis {
  id: number
  title: string
  authors: string[] | { name: string }[]
  year_published: number
  program_level: string
  abstract: string
  keywords: string
  document_url: string
  created_at: string
}
