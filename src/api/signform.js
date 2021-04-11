import request from '@/utils/request'
import Qs from 'qs'

export function getSignBaseData(data) {
  return request({
    url: '/sign',
    method: 'get',
    params: data
  })
}

export function ApploveForm(data) {
  return request({
    url: '/sign/formapplove',
    method: 'post',
    data: Qs.stringify(data)
  })
}

/**
 * 明细签核
 * @param {*} data
 * @returns
 */
export function ApploveOnly(data) {
  return request({
    url: '/sign/oneapplove',
    method: 'post',
    data: Qs.stringify(data)
  })
}

/**
 * 首页批量审核
 * @param {*} data
 * @returns
 */
export function BatchApplove(data) {
  return request({
    url: '/sign/listapplove',
    method: 'post',
    data: Qs.stringify(data)
  })
}
