import request from '@/utils/request'
import Qs from 'qs'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 获取人事资料数据
 */
export function users() {
  return request({
    url: '/personnel/all',
    method: 'get'
  })
}

/**
 * 获取部门资讯
 */
export function demparts() {
  return request({
    url: '/personnel/department',
    method: 'get'
  })
}

/**
 * 获取部门及岗位
 * @returns 
 */
export function dempartsjobs() {
  return request({
    url: '/personnel/departmentjob',
    method: 'get'
  })
}

/**
 * 保存新增用户
 * @param {*} users 用户信息
 * @returns 
 */
export function createusers(users) {
  return request({
    url: '/personnel/infouser',
    method: 'post',
    data:Qs.stringify(users)
  })
}



/**
 * 获取用户基本数据
 * @returns 
 */
export function basedata() {
  return request({
    url: '/user/basedata',
    method: 'get'
  })
}

/**
 * 根据id 获取user
 * @param {*} userid 
 * @returns 
 */
export function userbyid(userid) {
  return request({
    url: `/personnel/${userid}`,
    method: 'get'
  })
}