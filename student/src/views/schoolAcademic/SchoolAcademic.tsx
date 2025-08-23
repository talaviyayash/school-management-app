'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import useApiHook from '@/hooks/useApiHook'
import type { ApiSchoolResponse, SchoolWithPrincipal } from '@/types/schoolTypes'
import SchoolDetails from './SchoolDetail'
import SchoolTab from './SchoolTab'

const SchoolAcademic = () => {
  const { api } = useApiHook()
  const { schoolId } = useParams()
  const [schoolInfo, setSchoolInfo] = useState<undefined | SchoolWithPrincipal>()

  useEffect(() => {
    const geSchoolInfo = async () => {
      const response = await api<ApiSchoolResponse>({
        endPoint: `/school/${schoolId}`
      })

      if (response.success) {
        setSchoolInfo(response.school)
      }
    }

    geSchoolInfo()
  }, [])

  if (!schoolInfo) {
    return
  }

  return (
    <>
      <SchoolDetails schoolInfo={schoolInfo} />
      <SchoolTab />
    </>
  )
}

export default SchoolAcademic
