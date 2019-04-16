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

  export function updateAssociation(AssociationForm) {
    return request({ 
      url: '/assoc/detail',
      method: 'post',
      data: AssociationForm
    })
  }

  export function findAssociationList(AssociationInfoDTO) {
    return request({ 
      url: '/assoc/list',
      method: 'post',
      data: AssociationInfoDTO
    })
  }

  export function disAssociation(id) {
    return request({
      url: '/assoc/dis',
      method: 'get',
      params: { id }
    })
  }