// Common Helpers
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export type UUID = string;
export type ISODateString = string;

/* -------------------------------------------------------------------------- */
/* TRACKING HELPERS (Reusable types)                                        */
/* -------------------------------------------------------------------------- */
// Use this for anything that supports Soft Delete
interface SoftDeletable {
  is_deleted: boolean;
  deleted_at: ISODateString | null;
}

// Use this for audit trails
interface Auditable {
  created_at: ISODateString;
  updated_at: ISODateString;     
  updated_by: UUID | null;   
}

/* -------------------------------------------------------------------------- */
/* 1. PROFILES                                                               */
/* -------------------------------------------------------------------------- */
export interface Profile extends SoftDeletable, Auditable {
  id: UUID; 
  first_name: string;
  last_name: string;
  email: string;
  designation: string | null;
  specialization: string | null;
  image_url: string | null;
  bio: string | null;
  education: string | null;
  consultation_hours: string | null;
  is_active: boolean;
}

export interface ProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string | null;
  designation?: string | null;
  specialization?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  updated_by?: UUID; 
}

/* -------------------------------------------------------------------------- */
/* 2. ARTICLES                                                               */
/* -------------------------------------------------------------------------- */
export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags: string | null; 
  author_id: UUID | null; 
  is_featured: boolean;
  status: ArticleStatus;
  published_at: ISODateString | null;
  meta_title: string | null;
  meta_description: string | null;
  views_count: number;
  // Tracking
  created_at: ISODateString;
  updated_at: ISODateString;
}

/* -------------------------------------------------------------------------- */
/* 3. THESES (Added Tracking)                                                */
/* -------------------------------------------------------------------------- */
export type ProgramLevel = 'Undergraduate' | 'Graduate';

export interface Thesis extends Auditable { 
  id: number;
  title: string;
  authors: string[] | null; 
  year_published: number | null;
  program_level: ProgramLevel | null;
  abstract: string | null;
  keywords: string | null;
  document_url: string | null;
}

/* -------------------------------------------------------------------------- */
/* 4. COURSES (Added Tracking)                                               */
/* -------------------------------------------------------------------------- */
export type CourseLevel = 'Undergraduate' | 'Graduate';

export interface Course extends Auditable { 
  id: number;
  course_code: string;
  title: string;
  description: string | null;
  units: number | null;
  program_level: CourseLevel | null;
  year_level: number | null;
  semester: number | null;
  syllabus_url: string | null;
}

/* -------------------------------------------------------------------------- */
/* 5. PARTNERS                                                               */
/* -------------------------------------------------------------------------- */
export interface Partner extends SoftDeletable, Auditable {
  id: number;
  name: string;
  logo_url: string | null;
  type: string | null;
  location: string | null;
  website_url: string | null;
  is_active: boolean;
}

/* -------------------------------------------------------------------------- */
/* 6. ALUMNI STORIES                                                         */
/* -------------------------------------------------------------------------- */
export interface AlumniStory extends SoftDeletable, Auditable {
  id: number;
  name: string;
  degree_program: string | null;
  batch_year: number | null;
  image_url: string | null;
  job_role: string | null;
  company: string | null;
  achievement: string | null;
  quote: string | null;
  is_featured: boolean;
}

/* -------------------------------------------------------------------------- */
/* 7. STUDENT ACHIEVERS                                                      */
/* -------------------------------------------------------------------------- */
export interface StudentAchiever extends SoftDeletable, Auditable {
  id: number;
  name: string;
  program_level: string | null;
  year_level: number | null;
  image_url: string | null;
  achievement: string | null;
  is_featured: boolean;
}

/* -------------------------------------------------------------------------- */
/* 8. UTILITY TABLES                                                         */
/* -------------------------------------------------------------------------- */
export interface ArticleView {
  id: number;
  article_id: number | null;
  viewer_id: UUID | null;
  ip_hash: string | null;
  viewed_at: ISODateString;
}

export interface Resource {
  id: number;
  title: string;
  file_url: string;
  category: string | null;
  program_level: string | null;
  is_public: boolean;
  created_at: ISODateString;
}