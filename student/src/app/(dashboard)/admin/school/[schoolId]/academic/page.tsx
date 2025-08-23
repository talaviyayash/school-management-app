'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import SchoolAcademic from '@/views/schoolAcademic/SchoolAcademic'

const Page = () => {
  const { schoolId } = useParams()

  return (
    <>
      <SchoolAcademic schoolId={schoolId as string} />
    </>
  )
}

export default Page
