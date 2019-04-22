import request from '@/utils/request'

export function getMyclasses(collegeId) {
    return request({
      url: '/myclass/details',
      method: 'get',
      params: { collegeId }
    })
  }

  export function deleteClass(classId) {
    return request({
      url: '/myclass/delete',
      method: 'delete',
      params: { classId }
    })
  }

  export function createClass(myclass) {
    return request({
      url: '/myclass/create',
      method: 'post',
      data: myclass
    })
  }