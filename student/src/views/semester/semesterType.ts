export type SemesterType = {
  _id: string
  name: string
  course: {
    _id: string
    name: string
  }
  school: {
    _id: string
    name: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export type ApiSemesterResponse = {
  success: boolean
  message: string
  semester: SemesterType
}
