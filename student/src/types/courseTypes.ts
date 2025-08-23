import type { PaginationApiType } from './tableTypes'

export type CourseType = {
  _id: string
  name: string
  school: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  rows: number
  size: number
  total: number
}

export interface CourseListResponse {
  course: CourseType[]
  pagination: PaginationApiType
}

export interface ApiCourseListResponse {
  success: boolean
  message: string
  data: {
    course: CourseType[]
    pagination: PaginationApiType
  }
}
