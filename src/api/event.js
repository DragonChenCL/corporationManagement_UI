import request from '@/utils/request'

export function getEvents(eventCondition) {
    return request({
      url: '/event/details',
      method: 'post',
      data: eventCondition
    })
  }