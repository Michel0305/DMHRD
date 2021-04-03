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
 * 保存新增修改部门
 * @param {*} departs 部门资讯
 * @returns 
 */
 export function createdeparts(departs) {
  return request({
    url: '/personnel/infodepart',
    method: 'post',
    data:Qs.stringify(departs)
  })
}

/**
 * 删除改部门
 * @param {*} ids 部门id
 * @returns 
 */
 export function removedeparts(ids) {
  return request({
    url: '/personnel/deptremove',
    method: 'post',
    data:Qs.stringify(ids)
  })
}

/**
 * 新增职位信息
 * @param {*} data 
 * @returns 
 */
export function createJob(data) {
  return request({
    url: '/personnel/infojob',
    method: 'post',
    data:Qs.stringify(data)
  })
}

/**
 * 新增考勤班次
 * @param {*} data 
 * @returns 
 */
export function createWorkTime(data) {
  return request({
    url: '/personnel/infotimes',
    method: 'post',
    data:Qs.stringify(data)
  })
}

/**
 * 删除考勤班次
 * @param {*} data 
 * @returns 
 */
export function removeWorkTime(data) {
  return request({
    url: '/personnel/deltimes',
    method: 'post',
    data:Qs.stringify(data)
  })
}


//
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