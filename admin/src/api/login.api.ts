import request from '../utils/requset'

export const loginUser = (data: any) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data,
  })
}

export const changeUserPwd = (id: number, data: any) => {
  return request({
    url: `/user/${id}`,
    method: 'patch',
    data: data,
  })
}

// S8+TViuF69TvUzp1xDdkQw$X5N6GY5yR8L48T+4RjSIBHPI0bVatd+0oBt7kcJA5fU
// S8+TViuF69TvUzp1xDdkQw$X5N6GY5yR8L48T+4RjSIBHPI0bVatd+0oBt7kcJA5fU
// S8+TViuF69TvUzp1xDdkQw$X5N6GY5yR8L48T+4RjSIBHPI0bVatd+0oBt7kcJA5fU