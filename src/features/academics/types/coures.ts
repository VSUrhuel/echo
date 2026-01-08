export interface Course {
  id: number
  course_code: string
  title: string
  description: string
  units: number
  lecture_units: number
  lab_units: number
  program_level: "Undergraduate" | "Graduate"
  year_level: number | null
  semester: "1st Sem" | "2nd Sem" | "Summer"
  syllabus_url: string | null
}

export interface CoursesBySemester {
  semester1: Course[]
  semester2: Course[]
  summer: Course[]
}

export interface PrerequisiteCourse {
  id: number
  course_code: string
  title: string
}
