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
//获取用户信息
export function getInfo(username) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { username }
  })
}
//更新用户信息
export function updateInfo(PeronForm) {
  return request({
    url: '/user/detail',
    method: 'post',
    data: PeronForm
  }) 
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
