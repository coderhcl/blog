import request from '../utils/requset'

export const getTag = () => {
  return request({
    url: '/tag',
    method: 'get',
  })
}

export const creaeTag = (data: any) => {
  return request({
    url: '/tag',
    method: 'post',
    data: data,
  })
}

export const updateTag = (id: number, data: any) => {
  return request({
    url: `/tag/${id}`,
    method: 'patch',
    data: data,
  })
}

export const deleteTagById = (id: number) => {
  return request({
    url: `/tag/${id}`,
    method: 'delete',
  })
}
