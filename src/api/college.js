import request from '@/utils/request'

export function getColleges() {
    return request({
      url: '/college/details',
      method: 'get',
    })
  }

  export function deleteCollege(id) {
    return request({
      url: '/college/delete',
      method: 'delete',
      params: { id }
    })
  }

  export function createCollege(college) {
    return request({
      url: '/college/create',
      method: 'post',
      data: college
    })
  }

  export function editCollege() {
    return request({
      url: '/college/edit',
      method: 'post',
      data: college
    })
  }