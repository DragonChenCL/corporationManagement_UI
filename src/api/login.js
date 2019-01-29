import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(username) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { username }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
