import moment from 'moment'

export const formatDate = (date: string) => {
  const formattedDate = moment(date).format('MMM D [at] HH:mm')
  return formattedDate
}
