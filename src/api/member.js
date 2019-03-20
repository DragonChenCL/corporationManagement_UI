import request from '@/utils/request'

//获取成员列表
export function getMemberList(MemberListCondition) {
    return request({
      url: '/user/memberList',
      method: 'post',
      data: MemberListCondition
    }) 
  }

//获取成员列表
export function deleteUser(userId) {
  return request({
    url: '/user/detail',
    method: 'delete',
    params: { userId }
  }) 
}