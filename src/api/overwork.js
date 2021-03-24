import request from '@/utils/request'
import Qs from 'qs'

export function workbase() {
    return request({
        url: '/overwork/base',
        method: 'get'
    })
}