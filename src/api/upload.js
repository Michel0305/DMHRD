import request from '@/utils/request'
import Qs from 'qs'

export function userpicupload(data) {
  return request({
    url: '/upload/userpic',
    method: 'post',
    data: data
  })
}