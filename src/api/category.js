import request from '@/utils/request'

export function getCatrgory() {
    return request({
      url: '/category/details',
      method: 'get',
    })
  }

  export function forbiddenCategory(id) {
    return request({
      url: '/category/forbidden',
      method: 'post',
      params: { id }
    })
  }

  export function deleteCategory(id) {
    return request({
      url: '/category/delete',
      method: 'delete',
      params: { id }
    })
  }

  export function createCategory(category) {
    return request({
      url: '/category/create',
      method: 'post',
      data: category
    })
  }

  export function editCategory(category) {
    return request({
      url: '/category/edit',
      method: 'post',
      data: category
    })
  }

  export function findAllByPage(categoryCondition) {
    return request({
      url: '/category/list',
      method: 'post',
      data: categoryCondition
    })
  }
