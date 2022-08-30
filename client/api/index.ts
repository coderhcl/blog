import request from '../utils/requset'

export const getArticleAndSelect = (data: any) => {
  return request({
    url: '/article/find',
    method: 'post',
    data: data,
  })
}

export const getArticleById = (id: any) => {
  return request({
    url: `/article/findbyid/${id}`,
    method: 'get',
  })
}

export const getArticleByTagName = (name: any) => {
  return request({
    url: `/article/findbyTag/${name}`,
    method: 'get',
  })
}

export const getCategory = () => {
  return request({
    url: '/category',
    method: 'get',
  })
}

export const getTag = () => {
  return request({
    url: '/tag',
    method: 'get',
  })
}

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

export const getHistory = () => {
  return request({
    url: '/history',
    method: 'get',
  })
}

export const getWorks = () => {
  return request({
    url: '/works',
    method: 'get',
  })
}
