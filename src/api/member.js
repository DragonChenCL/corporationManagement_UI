import request from '@/utils/request'

//获取成员列表
export function getMemberList(MemberListCondition) {
    return request({
      url: '/user/memberList',
      method: 'post',
      data: MemberListCondition
    }) 
  }

//删除成员信息
export function deleteUser(userId ,assocId) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params: { userId , assocId}
  }) 
}

//用户申请加入社团
export function applyAssoc(userId ,assocId) {
  return request({
    url: '/user/apply',
    method: 'post',
    params: { userId , assocId }
  }) 
}

//用户申请加入活动
export function applyEvent(userId ,eventId) {
  return request({
    url: '/user/applyEvent',
    method: 'post',
    params: { userId , eventId }
  }) 
}