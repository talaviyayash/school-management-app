'use client'

import Grid from '@mui/material/Grid2'

import SchoolTable from './SchoolTable'
import SchoolCards from './SchoolCards'

const School = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SchoolCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SchoolTable />
      </Grid>
    </Grid>
  )
}

export default School
