import request from '@/utils/request'

export function getEvents(eventCondition) {
    return request({
      url: '/event/details',
      method: 'post',
      data: eventCondition
    })
  }

  export function getEventsBySys(eventCondition) {
    return request({
      url: '/event/detailsBySys',
      method: 'post',
      data: eventCondition
    })
  }

  export function applyEvents(eventForm) {
    return request({
      url: '/event/apply',
      method: 'post',
      data: eventForm
    })
  }

  export function userApplyEvent(condition) {
    return request({
      url: '/event/userApplys',
      method: 'post',
      data: condition
    })
  }

  export function userEventStatus(userEvent) {
    return request({
      url: '/event/userEventStatus',
      method: 'post',
      data: userEvent
    })
  }

  export function eventStatus(statusCondition) {
    return request({
      url: '/event/eventStatus',
      method: 'post',
      data: statusCondition
    })
  }