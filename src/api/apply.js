import request from '@/utils/request'

export function deleteApply(id) {
    return request({
      url: '/apply/delete',
      method: 'delete',
      params: { id }
    })
  }


  export function findApplys(applyCondition) {
    return request({
      url: '/apply/details',
      method: 'post',
      data: applyCondition
    })
  }

  export function createApply(apply) {
    return request({
      url: '/apply/create',
      method: 'post',
      data: apply
    })
    
  }
