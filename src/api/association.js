import request from '@/utils/request'

export function getAssociationInfo(id) {
    return request({
      url: '/assoc/detail',
      method: 'get',
      params: { id }
    })
  }