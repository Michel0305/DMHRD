import request from '@/utils/request'
import Qs from 'qs'

export function leavebase() {
    return request({
        url: '/leave/base',
        method: 'get'
    })
}