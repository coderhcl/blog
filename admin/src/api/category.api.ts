import request from '../utils/requset'

export const getCategory = () => {
  return request({
    url: '/category',
    method: 'get',
  })
}

export const deleteCategoryById = (id: number) => {
  return request({
    url: `/category/${id}`,
    method: 'delete',
  })
}

export const createCategory = (data: any) => {
  return request({
    url: `/category`,
    method: 'post',
    data: data,
  })
}
