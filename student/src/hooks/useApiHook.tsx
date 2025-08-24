'use client'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'

import Cookies from 'js-cookie'

import { loaderChange } from '@/store/slice/loaderSlice'

export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

type AxiosHeaders = AxiosRequestConfig['headers']

interface ApiProps {
  method?: 'POST' | 'PATCH' | 'GET' | 'PUT' | 'DELETE'
  header?: AxiosHeaders
  endPoint?: string
  data?: unknown
  showToastMessage?: boolean
  needLoader?: boolean
  loaderName?: string
  params?: {
    [key: string]: string | undefined | number | any
  }
}

type ApiSuccess<T> = (T & { success: true; message?: string }) | { message: string; success: false }

const useApiHook = () => {
  const dispatch = useDispatch()

  const api = async <T = unknown,>({
    header = {},
    endPoint,
    method,
    data,
    showToastMessage = false,
    needLoader = false,
    loaderName = '',
    params
  }: ApiProps): Promise<ApiSuccess<T>> => {
    try {
      const accessToken = Cookies.get('token')

      const headers: AxiosHeaders = {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...header
      }

      if (needLoader) dispatch(loaderChange({ name: loaderName, value: true }))

      const response: AxiosResponse<T> = await apiCall({
        method,
        url: endPoint,
        data,
        headers,
        params
      })

      const maybeMessage = (response.data as any)?.message

      if (showToastMessage && maybeMessage) toast.success(maybeMessage)
      if (needLoader) dispatch(loaderChange({ name: loaderName, value: false }))

      return { ...response?.data, success: true }
    } catch (e: unknown) {
      if (needLoader) dispatch(loaderChange({ name: loaderName, value: false }))

      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(e)) {
        if (showToastMessage) toast.error(e?.response?.data?.errors)

        return e.response?.data
      } else {
        console.error('Unexpected Error:', e)

        return { message: 'An unexpected error occurred', success: false }
      }
    }
  }

  return { api }
}

export default useApiHook
