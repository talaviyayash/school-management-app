'use client'
import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Stack } from '@mui/material'

import useApiHook from '@/hooks/useApiHook'
import type { ApiSemesterResponse, SemesterType } from './semesterType'
import SemesterDetail from './SemesterDetail'
import BatchTable from './batch/BatchTable'

const Semester = () => {
  const { api } = useApiHook()
  const { semId } = useParams()
  const [semesterInfo, setSemesterInfo] = useState<undefined | SemesterType>()

  useEffect(() => {
    const geSchoolInfo = async () => {
      const response = await api<ApiSemesterResponse>({
        endPoint: `/semester/${semId}`
      })

      if (response.success) {
        setSemesterInfo(response.semester)
      }
    }

    geSchoolInfo()
  }, [])

  if (!semesterInfo) {
    return
  }

  return (
    <Stack spacing={4}>
      <SemesterDetail semesterInfo={semesterInfo} />
      <BatchTable />
    </Stack>
  )
}

export default Semester
