import request from '../utils/requset'

export const getArticleAndSelect = (data: any) => {
  return request({
    url: '/article/find',
    method: 'post',
    data: data,
  })
}

export const careateArticle = (data: any) => {
  return request({
    url: '/article',
    method: 'post',
    data: data,
  })
}

export const deleteArticle = (id: number) => {
  return request({
    url: `/article/${id}`,
    method: 'delete',
  })
}

export const updateArticle = (id: number, data: any) => {
  return request({
    url: `/article/${id}`,
    method: 'patch',
    data: data,
  })
}
