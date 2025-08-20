import type { PaginationApiType } from './tableTypes'

export type SchoolType = {
  _id: string
  name: string
  address: string
  principalId: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  rows: number
  size: number
  total: number
}

export interface SchoolListResponse {
  school: SchoolType[]
  pagination: PaginationApiType
}

export interface ApiSchoolsListResponse {
  success: boolean
  message: string
  data: {
    school: SchoolType[]
    pagination: PaginationApiType
  }
}
