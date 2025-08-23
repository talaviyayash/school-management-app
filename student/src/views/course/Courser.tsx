'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import useApiHook from '@/hooks/useApiHook'
import CourserDetail from './CourserDetail'
import type { ApiCourseResponse, CourseType } from './courseType'

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
    <>
      <CourserDetail courseInfo={courseInfo} />
    </>
  )
}

export default Courser
