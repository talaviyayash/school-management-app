export type CourseType = {
  _id: string
  name: string
  school: {
    _id: string
    name: string
    address: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export type ApiCourseResponse = {
  success: boolean
  message: string
  course: CourseType
}
