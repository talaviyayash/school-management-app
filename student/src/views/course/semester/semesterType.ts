import type { PaginationApiType } from '@/types/tableTypes'

export type SemesterType = {
  _id: string
  name: string
  course: string
  school: string
  createdAt: string
  updatedAt: string
}

export interface SemesterListResponse {
  semester: SemesterType[]
  pagination: PaginationApiType
}

export interface ApiSemesterListResponse {
  success: boolean
  message: string
  data: {
    semester: SemesterType[]
    pagination: PaginationApiType
  }
}
