import type { Course, CoursesBySemester } from "../types/coures"

export function groupCoursesBySemester(courses: Course[]): CoursesBySemester {
  return {
    semester1: courses.filter((course) => course.semester === "1st Sem"),
    semester2: courses.filter((course) => course.semester === "2nd Sem"),
    summer: courses.filter((course) => course.semester === "Summer")
  }
}
