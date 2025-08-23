import { useCallback, useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Button, Card, CardHeader, IconButton, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import useApiHook from '@/hooks/useApiHook'
import DataTable from '@/shared/DataTable'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { addPayloadData } from '@/store/slice/dataSlice'
import { toggleModal } from '@/store/slice/modalSlice'
import type { DescriptionItem } from '@/types/tableTypes'
import type { ApiTeacherListResponse, TeacherListResponse, TeacherType } from '@/types/teacherTypes'
import { getApiData, getFlag, getLoader } from '@/utils/reduxFunc'
import AddTeacher from './addTeacher/AddTeacher'
import EditTeacher from './editTeacher/EditTeacher'

const description: DescriptionItem<TeacherType>[] = [
  {
    headerName: 'Name',
    Cell: ({ row }) => (
      <Typography color='text.primary' className='font-medium'>
        {row.name}
      </Typography>
    )
  },
  {
    headerName: 'Email',
    Cell: ({ row }) => (
      <Typography color='text.primary' className='font-medium'>
        {row.email}
      </Typography>
    )
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

const TeacherTable = () => {
  const { schoolId } = useParams()
  const router = useRouter()

  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  const { api } = useApiHook()

  const refetchCourse: boolean | undefined = useSelector(getFlag('teacherList'))

  const { pagination, teacher: teacherList }: TeacherListResponse = useSelector(getApiData('teacherList')) || {}
  const loader = useSelector(getLoader('teacherList'))

  const dispatch = useDispatch()

  const onChangeFilter = useCallback(
    ({ name, value }: { name: string; value: string | number }) => setFilter(prev => ({ ...prev, [name]: value })),
    []
  )

  const getData = async (page: number) => {
    const response = await api<ApiTeacherListResponse>({
      endPoint: `/school/${schoolId}/teacher`,
      needLoader: true,
      loaderName: 'teacherList',
      params: {
        page: page,
        search: filter?.search || undefined
      }
    })

    if (response?.success) {
      dispatch(
        addData({
          name: 'teacherList',
          data: response?.data
        })
      )
    } else {
      dispatch(addData({ name: 'teacherList', data: {} }))
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
      dispatch(addFlag({ name: 'teacherList', value: false }))
      getData(1)
    }
  }, [refetchCourse])

  const onAddCourseClick = () => dispatch(toggleModal({ name: 'addTeacher' }))

  const onEdit = (row: TeacherType) => {
    dispatch(toggleModal({ name: 'editTeacher' }))
    dispatch(addPayloadData({ name: 'editTeacher', data: row }))
  }

  const onView = (row: TeacherType) => router.push(`/admin/teacher/${row._id}`)

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <div className='flex justify-end flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <CustomTextField
              value={filter?.search ?? ''}
              onChange={e => onChangeFilter({ name: 'search', value: e.target.value })}
              placeholder='Search Teacher'
              className='max-sm:is-full'
            />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
              onClick={onAddCourseClick}
            >
              Add New Teacher
            </Button>
          </div>
        </div>
        <DataTable
          description={description}
          tableData={teacherList || []}
          pagination={pagination ? { ...pagination, setPageIndex: value => getData(value) } : undefined}
          isLoading={loader}
          allFunction={{
            onEdit,
            onView
          }}
        />
      </Card>
      <AddTeacher />
      <EditTeacher />
    </>
  )
}

export default TeacherTable
