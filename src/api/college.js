import request from '@/utils/request'

export function getColleges() {
    return request({
      url: '/college/details',
      method: 'get',
    })
  }