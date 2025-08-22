import { useCallback, useEffect, useState } from 'react'

import { Button, Card, CardHeader, IconButton, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import useApiHook from '@/hooks/useApiHook'
import DataTable from '@/shared/DataTable'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { toggleModal } from '@/store/slice/modalSlice'
import type { ApiCourseListResponse, CourseListResponse, CourseType } from '@/types/courseTypes'
import type { DescriptionItem } from '@/types/tableTypes'
import { getApiData, getFlag, getLoader } from '@/utils/reduxFunc'
import { formateDate } from '@/utils/date'
import AddCourse from './addCourse/AddCourse'
import { addPayloadData } from '@/store/slice/dataSlice'

const description: DescriptionItem<CourseType>[] = [
  {
    headerName: 'Name',
    Cell: ({ row }) => (
      <Typography color='text.primary' className='font-medium'>
        {row.name}
      </Typography>
    )
  },
  {
    headerName: 'UPDATED AT',
    Cell: ({ row }) => <Typography>{formateDate(row.updatedAt) ?? '-'}</Typography>
  },

  {
    headerName: 'ACTION',
    Cell: ({ row, allFunction }) => {
      const { onEdit, onView } = allFunction || {}

      return (
        <div className='flex items-center'>
          <IconButton onClick={() => onView(row)}>
            <i className='tabler-eye text-textSecondary' />
          </IconButton>
          <IconButton onClick={() => onEdit(row)}>
            <i className='tabler-edit text-textSecondary' />
          </IconButton>
        </div>
      )
    }
  }
]

const CourseTable = ({ schoolId }: { schoolId: string }) => {
  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  const { api } = useApiHook()

  const refetchCourse: boolean | undefined = useSelector(getFlag('courseList'))

  const { pagination, course: courseList }: CourseListResponse = useSelector(getApiData('courseList')) || {}
  const loader = useSelector(getLoader('courseList'))

  const dispatch = useDispatch()

  const onChangeFilter = useCallback(
    ({ name, value }: { name: string; value: string | number }) => setFilter(prev => ({ ...prev, [name]: value })),
    []
  )

  const getData = async (page: number) => {
    const response = await api<ApiCourseListResponse>({
      endPoint: `/school/${schoolId}/course`,
      needLoader: true,
      loaderName: 'courseList',
      params: {
        page: page,
        search: filter?.search || undefined
      }
    })

    console.log('response', response)

    if (response?.success) {
      dispatch(
        addData({
          name: 'courseList',
          data: response?.data
        })
      )
    } else {
      dispatch(addData({ name: 'courseList', data: {} }))
    }
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      getData(1)
    }, 300)

    return () => clearTimeout(timeId)
  }, [filter])

  useEffect(() => {
    if (refetchCourse) {
      dispatch(addFlag({ name: 'courseList', value: false }))
      getData(1)
    }
  }, [refetchCourse])

  const onAddCourseClick = () => dispatch(toggleModal({ name: 'addCourse' }))

  const onEdit = (row: CourseType) => {
    dispatch(toggleModal({ name: 'editCourse' }))
    dispatch(addPayloadData({ name: 'editCourse', data: row }))
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <div className='flex justify-end flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <CustomTextField
              value={filter?.search ?? ''}
              onChange={e => onChangeFilter({ name: 'search', value: e.target.value })}
              placeholder='Search Course'
              className='max-sm:is-full'
            />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
              onClick={onAddCourseClick}
            >
              Add New Course
            </Button>
          </div>
        </div>
        <DataTable
          description={description}
          tableData={courseList || []}
          pagination={pagination ? { ...pagination, setPageIndex: value => getData(value) } : undefined}
          isLoading={loader}
          allFunction={{
            onEdit
          }}
        />
      </Card>
      <AddCourse schoolId={schoolId} />
    </>
  )
}

export default CourseTable
