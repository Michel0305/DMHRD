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

export function basedata() {
  return request({
    url: '/user/basedata',
    method: 'get'
  })
}