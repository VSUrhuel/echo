import type { Course, CoursesBySemester } from "../types/coures"

export function groupCoursesBySemester(courses: Course[]): CoursesBySemester {
  return {
    semester1: courses.filter((course) => course.semester === 1),
    semester2: courses.filter((course) => course.semester === 2),
  }
}
