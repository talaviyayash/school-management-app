'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import useApiHook from '@/hooks/useApiHook'
import type { ApiTeacherResponse, TeacherWithSchoolType } from '@/types/teacherTypes'
import TeacherDetails from './TeacherDetail'

const Teacher = () => {
  const { api } = useApiHook()
  const { teacherId } = useParams()
  const [teacherInfo, setTeacherInfo] = useState<undefined | TeacherWithSchoolType>()

  useEffect(() => {
    const geSchoolInfo = async () => {
      const response = await api<ApiTeacherResponse>({
        endPoint: `/teacher/${teacherId}`
      })

      if (response.success) {
        setTeacherInfo(response.teacher)
      }
    }

    geSchoolInfo()
  }, [])

  if (!teacherInfo) {
    return
  }

  return (
    <>
      <TeacherDetails teacherInfo={teacherInfo} />
    </>
  )
}

export default Teacher
