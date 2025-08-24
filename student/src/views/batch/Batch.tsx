'use client'
import { useEffect, useState } from 'react'

import { useParams } from 'next/navigation'

import { Stack } from '@mui/material'

import useApiHook from '@/hooks/useApiHook'
import type { BatchType } from './batchType'
import BatchDetail from './BatchDetail'

const Batch = () => {
  const { api } = useApiHook()
  const { batchId } = useParams()
  const [batchInfo, setBatchInfo] = useState<undefined | BatchType>()

  useEffect(() => {
    const geSchoolInfo = async () => {
      const response = await api<{ batch: BatchType }>({
        endPoint: `/batch/${batchId}`
      })

      if (response.success) {
        setBatchInfo(response.batch)
      }
    }

    geSchoolInfo()
  }, [])

  if (!batchInfo) {
    return
  }

  return (
    <>
      <Stack spacing={4}>
        <BatchDetail batchInfo={batchInfo} />
      </Stack>
    </>
  )
}

export default Batch
