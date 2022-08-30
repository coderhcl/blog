import request from '../utils/requset'

export const getLink = (name?: string, page?: number, size?: number) => {
  return request({
    url: '/link/find',
    method: 'post',
    data: {
      name,
      page,
      size,
    },
  })
}

export const createdLink = (data: any) => {
  return request({
    url: '/link',
    method: 'post',
    data: data,
  })
}

export const deleteLinkById = (id: number) => {
  return request({
    url: `/link/${id}`,
    method: 'delete',
  })
}

export const updateLink = (id: number, data: any) => {
  return request({
    url: `/link/${id}`,
    method: 'patch',
    data: data,
  })
}
