import request from '@/utils/request'
import Qs from 'qs'


/**
 * 获取权限模块基本数据
 * @returns 
 */
export function rightBaseData() {
  return request({
    url: '/right',
    method: 'get'
  })
}

/**
 * 用户对角色权限设定
 * @param {*} data 
 * @returns 
 */
export function rightUserToRole(data) {
    return request({
      url: '/right/userrole',
      method: 'post',
      data:Qs.stringify(data)
    })
}

/**
 * 角色对模块对动作对部门
 * @param {*} data 
 * @returns 
 */
export function rightRoleToModel(data) {
    return request({
        url:'/right/rolemodel',
        method: 'post',
        data:Qs.stringify(data)
    })
}
