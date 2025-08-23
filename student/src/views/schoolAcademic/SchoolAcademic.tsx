'use client'
import { useEffect, useState } from 'react'

import useApiHook from '@/hooks/useApiHook'
import type { ApiSchoolResponse, SchoolWithPrincipal } from '@/types/schoolTypes'
import SchoolDetails from './SchoolDetail'
import SchoolTab from './SchoolTab'

const SchoolAcademic = ({ schoolId }: { schoolId: string }) => {
  const { api } = useApiHook()
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
      <SchoolTab schoolId={schoolId} />
    </>
  )
}

export default SchoolAcademic
