import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'

import CustomTabList from '@core/components/mui/TabList'
import CourseTable from './course/CourseTable'
import TeacherTable from './teacher/TeacherTable'

const tabContentList = {
  course: <CourseTable />,
  teacher: <TeacherTable />
}

const SchoolTab = () => {
  const [activeTab, setActiveTab] = useState<'teacher' | 'course'>('course')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value as 'teacher' | 'course')
  }

  return (
    <>
      <TabContext value={activeTab}>
        <Grid
          container
          spacing={6}
          sx={{
            mt: 5
          }}
        >
          <Grid size={{ xs: 12 }}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-book' />} value='course' label='Course' iconPosition='start' />
              <Tab icon={<i className='tabler-chalkboard' />} value='teacher' label='Teacher' iconPosition='start' />
            </CustomTabList>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TabPanel value={activeTab} className='p-0'>
              {tabContentList[activeTab]}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default SchoolTab
