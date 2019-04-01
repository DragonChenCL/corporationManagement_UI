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

//更新用户社团状态
export function updateStatus(userStatusForm) {
  return request({
    url: '/user/status',
    method: 'post',
    data: userStatusForm
  }) 
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
