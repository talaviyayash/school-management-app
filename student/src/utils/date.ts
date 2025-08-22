import dayjs from 'dayjs'

export const formateDate = (date: string) => dayjs(date).format('DD MMM YYYY, h:mm A')
