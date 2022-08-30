import dayjs from 'dayjs'
export function parseDate(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}
