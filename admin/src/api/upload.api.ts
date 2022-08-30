import request from '../utils/requset'

export const uploadFile = (from: any) => {
  return request({
    url: '/upload',
    method: 'POST',
    data: from,
  })
}
