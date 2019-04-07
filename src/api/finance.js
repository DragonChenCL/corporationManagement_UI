import request from '@/utils/request'

export function getInFinance() {
    return request({
      url: '/finance/in',
      method: 'get',
    })
  }

  export function getOutFinance() {
    return request({
      url: '/finance/out',
      method: 'get',
    })
  }

  export function createFinance(financeForm) {
    return request({
      url: '/finance/detail',
      method: 'post',
      data: financeForm
    })
  }

  export function getFinance(condition) {
    return request({
      url: '/finance/list',
      method: 'post',
      data: condition
    })
  }

  export function delFinance(financeId) {
    return request({
      url: '/finance/detail',
      method: 'delete',
      params: { financeId }
    })
  }

