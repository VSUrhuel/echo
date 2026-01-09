export interface Achiever {
  id: number
  name: string
  program_level: string
  year_level: number
  image_url: string
  achievement: string
  is_featured: boolean
  is_deleted: boolean
  deleted_at: string | null
  updated_by: string | null
  updated_at: string
}
