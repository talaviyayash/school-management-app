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
import { formateDate } from '@/utils/date'
import { getApiData, getFlag, getLoader } from '@/utils/reduxFunc'
import AddBatch from './addBatch/AddBatch'
import type { BatchListResponse, BatchType } from './batchType'
import EditBatch from './editBatch/EditBatch'

const description: DescriptionItem<BatchType>[] = [
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

const BatchTable = () => {
  const { semId } = useParams()
  const router = useRouter()

  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  const { api } = useApiHook()

  const refetchBatch: boolean | undefined = useSelector(getFlag('batchList'))

  const { pagination, batch: batchList }: BatchListResponse = useSelector(getApiData('batchList')) || {}
  const loader = useSelector(getLoader('batchList'))

  const dispatch = useDispatch()

  const onChangeFilter = useCallback(
    ({ name, value }: { name: string; value: string | number }) => setFilter(prev => ({ ...prev, [name]: value })),
    []
  )

  const getData = async (page: number) => {
    const response = await api<{ data: BatchListResponse }>({
      endPoint: `/semester/${semId}/batch`,
      needLoader: true,
      loaderName: 'batchList',
      params: {
        page: page,
        search: filter?.search || undefined
      }
    })

    if (response?.success) {
      dispatch(
        addData({
          name: 'batchList',
          data: response?.data
        })
      )
    } else {
      dispatch(addData({ name: 'batchList', data: {} }))
    }
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      getData(1)
    }, 300)

    return () => clearTimeout(timeId)
  }, [filter])

  useEffect(() => {
    if (refetchBatch) {
      dispatch(addFlag({ name: 'batchList', value: false }))
      getData(1)
    }
  }, [refetchBatch])

  const onAddCourseClick = () => dispatch(toggleModal({ name: 'addBatch' }))

  const onEdit = (row: BatchType) => {
    dispatch(toggleModal({ name: 'editBatch' }))
    dispatch(addPayloadData({ name: 'editBatch', data: row }))
  }

  const onView = (row: BatchType) => router.push(`/admin/batch/${row._id}`)

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <div className='flex justify-end flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <CustomTextField
              value={filter?.search ?? ''}
              onChange={e => onChangeFilter({ name: 'search', value: e.target.value })}
              placeholder='Search Batch'
              className='max-sm:is-full'
            />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
              onClick={onAddCourseClick}
            >
              Add New Batch
            </Button>
          </div>
        </div>
        <DataTable
          description={description}
          tableData={batchList || []}
          pagination={pagination ? { ...pagination, setPageIndex: value => getData(value) } : undefined}
          isLoading={loader}
          allFunction={{
            onEdit,
            onView
          }}
        />
      </Card>
      <AddBatch />
      <EditBatch />
    </>
  )
}

export default BatchTable
