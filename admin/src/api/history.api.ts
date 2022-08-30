import request from '../utils/requset'

export const getHistory = () => {
  return request({
    url: '/history',
    method: 'get',
  })
}

export const createHistory = (data: any) => {
  return request({
    url: `/history`,
    method: 'post',
    data: data,
  })
}

export const deleteHistoryById = (id: number) => {
  return request({
    url: `/history/${id}`,
    method: 'delete',
  })
}

export const updateHistory = (id: number, data: any) => {
  return request({
    url: `/history/${id}`,
    method: 'patch',
    data: data,
  })
}
