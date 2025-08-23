'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Stack } from '@mui/material'

import useApiHook from '@/hooks/useApiHook'
import type { ApiCourseResponse, CourseType } from './courseType'
import CourserDetail from './CourserDetail'
import SemesterTable from './semester/SemesterTable'

const Courser = () => {
  const { api } = useApiHook()
  const { courseId } = useParams()
  const [courseInfo, setCourseInfo] = useState<undefined | CourseType>()

  useEffect(() => {
    const geSchoolInfo = async () => {
      const response = await api<ApiCourseResponse>({
        endPoint: `/course/${courseId}`
      })

      if (response.success) {
        setCourseInfo(response.course)
      }
    }

    geSchoolInfo()
  }, [])

  if (!courseInfo) {
    return
  }

  return (
    <Stack spacing={4}>
      <CourserDetail courseInfo={courseInfo} />
      <SemesterTable />
    </Stack>
  )
}

export default Courser
