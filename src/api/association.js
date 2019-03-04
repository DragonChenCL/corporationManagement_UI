import request from '@/utils/request'

export function getAssociationInfo(id) {
    return request({
      url: '/assoc/detail',
      method: 'get',
      params: { id }
    })
  }
  
  export function updateLogo(file,assocId) {
    return request({
      url: '/assoc/updateLogo',
      method: 'post',
      params: { file,assocId }
    })
  }