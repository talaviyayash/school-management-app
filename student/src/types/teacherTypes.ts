import type { PaginationApiType } from './tableTypes'

export type TeacherType = {
  _id: string
  name: string
  email: string
  isActive: boolean
}

export interface Pagination {
  page: number
  rows: number
  size: number
  total: number
}

export interface TeacherListResponse {
  teacher: TeacherType[]
  pagination: PaginationApiType
}

export interface ApiTeacherListResponse {
  success: boolean
  message: string
  data: {
    teacher: TeacherType[]
    pagination: PaginationApiType
  }
}

export type TeacherWithSchoolType = {
  _id: string
  name: string
  email: string
  isActive: boolean
  school: {
    _id: string
    name: string
    address: string
  }
}
export interface ApiTeacherResponse {
  success: boolean
  message: string
  teacher: TeacherWithSchoolType
}
