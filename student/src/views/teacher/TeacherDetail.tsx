// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

import type { TeacherWithSchoolType } from '@/types/teacherTypes'

// Vars

const TeacherDetails = ({ teacherInfo }: { teacherInfo: TeacherWithSchoolType }) => {
  const items = [
    { label: 'Name', value: teacherInfo.name },
    { label: 'Address', value: teacherInfo.name },
    { label: 'School Name', value: teacherInfo.school.name },
    { label: 'School Address', value: teacherInfo.school.address }
  ]

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-6'>
          <div>
            <Typography variant='h3'>Teacher Info </Typography>
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
          <div className='flex gap-4 justify-center'>
            {/* <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Edit', 'primary', 'contained')}
              dialog={EditUserInfo}
              dialogProps={{ data: userData }}
            />
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Suspend', 'error', 'tonal')}
              dialog={ConfirmationDialog}
              dialogProps={{ type: 'suspend-account' }}
            /> */}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TeacherDetails
