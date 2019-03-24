import request from '@/utils/request'

export function getMyclasses(collegeId) {
    return request({
      url: '/myclass/details',
      method: 'get',
      params: { collegeId }
    })
  }