import { useEffect } from 'react'

import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import useApiHook from '@/hooks/useApiHook'
import { addData } from '@/store/slice/apiSlice'
import { addFlag } from '@/store/slice/appSlice'
import { toggleModal } from '@/store/slice/modalSlice'
import type { TeacherType } from '@/types/teacherTypes'
import { getData, getLoader, getModal } from '@/utils/reduxFunc'

interface FormValues {
  name: string
}

const defaultValues = {
  name: ''
}

const EditTeacher = () => {
  const editTeacherModal = useSelector(getModal('editTeacher'))
  const editTeacherData: TeacherType | undefined = useSelector(getData('editTeacher'))
  const dispatch = useDispatch()
  const { api } = useApiHook()
  const loader = useSelector(getLoader('editTeacher'))

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues,
    mode: 'onChange'
  })

  const onClose = () => {
    dispatch(toggleModal({ name: 'editTeacher' }))
    dispatch(addData({ name: 'editTeacher', data: undefined }))
    reset(defaultValues)
  }

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const response = await api({
      method: 'PUT',
      endPoint: `/teacher/${editTeacherData?._id}`,
      data,
      loaderName: 'editTeacher',
      needLoader: true,
      showToastMessage: true
    })

    if (response?.success) {
      dispatch(addFlag({ name: 'teacherList', value: true }))
      onClose()
    }
  }

  useEffect(() => {
    if (editTeacherData) {
      console.log('editTeacherData', editTeacherData)
      reset({
        name: editTeacherData?.name
      })
    }
  }, [editTeacherData])

  return (
    <>
      <Drawer
        open={editTeacherModal}
        anchor='right'
        variant='temporary'
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Edit Teacher</Typography>
          <IconButton size='small' onClick={onClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            <Controller
              name='name'
              control={control}
              rules={{
                required: 'Name is required',
                minLength: { value: 2, message: 'Min 2 characters' }
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label='Name'
                  placeholder='Name'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit' disabled={loader}>
                Save
              </Button>
              <Button variant='tonal' color='error' type='reset' onClick={() => onClose()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  )
}

export default EditTeacher
