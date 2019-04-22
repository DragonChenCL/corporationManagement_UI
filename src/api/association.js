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

  export function findAssociationList(SearchAssociationInfoDTO) {
    return request({ 
      url: '/assoc/list',
      method: 'post',
      data: SearchAssociationInfoDTO
    })
  }
  

  export function disAssociation(id) {
    return request({
      url: '/assoc/dis',
      method: 'get',
      params: { id }
    })
  }

  export function findAssocAll() {  
    return request({
      url: '/assoc/all',
      method: 'get'
    })
  }

  export function createAssociationList(AssociationInfoDTO) {
    return request({ 
      url: '/assoc/create',
      method: 'post',
      data: AssociationInfoDTO
    })
  }