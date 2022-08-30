import request from '../utils/requset'

export const getWorks = () => {
  return request({
    url: '/works',
    method: 'get',
  })
}

export const createdWorks = (data: any) => {
  return request({
    url: '/works',
    method: 'post',
    data: data,
  })
}

export const deleteWorksById = (id: number) => {
  return request({
    url: `/works/${id}`,
    method: 'delete',
  })
}

export const updateWorks = (id: number, data: any) => {
  return request({
    url: `/works/${id}`,
    method: 'patch',
    data: data,
  })
}
