import request from '@/utils/request'

export function getCatrgory() {
    return request({
      url: '/category/details',
      method: 'get',
    })
  }