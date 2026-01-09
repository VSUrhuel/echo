export type Partner = {
  id: number
  name: string
  logo_url: string
  type: string
  location: string
  website_url: string
  is_active: boolean
  is_deleted: boolean
  deleted_at: string | null
  updated_by: string | null
  updated_at: string
  created_at: string
  description: string
  available_slot: number
  contact_email: string
}
