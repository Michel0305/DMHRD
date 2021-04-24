import request from '@/utils/request'
import Qs from 'qs'

export function getSalaryBaseData(months) {
  return request({
    url: '/salary',
    method: 'get',
    params: months
  })
}
