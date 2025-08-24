import type { PaginationApiType } from '@/types/tableTypes'

export type BatchType = {
  _id: string
  name: string
  course: string
  school: string
  createdAt: string
  updatedAt: string
}

export interface BatchListResponse {
  batch: BatchType[]
  pagination: PaginationApiType
}
