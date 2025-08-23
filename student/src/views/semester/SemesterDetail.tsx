import React from 'react'

import { Card, CardContent, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import type { SemesterType } from './semesterType'

const SemesterDetail = ({ semesterInfo }: { semesterInfo: SemesterType }) => {
  const items = [
    { label: 'Name', value: semesterInfo.name },
    { label: 'Address', value: semesterInfo.name },
    { label: 'Course Name', value: semesterInfo.course.name },
    { label: 'School Name', value: semesterInfo.school.name }
  ]

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-6'>
          <div>
            <Typography variant='h3'>Semester Info </Typography>
            <Divider className='mlb-4' />
            <Grid container spacing={2}>
              {items.map((item, idx) => (
                <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                  <div className='flex items-center flex-wrap gap-x-1.5'>
                    <Typography className='font-medium' color='text.primary'>
                      {item.label}:
                    </Typography>
                    <Typography>{item.value}</Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default SemesterDetail
