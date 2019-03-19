import request from '@/utils/request'

//获取成员列表
export function getMemberList(MemberListCondition) {
    return request({
      url: '/user/memberList',
      method: 'post',
      data: MemberListCondition
    }) 
  }