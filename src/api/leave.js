import request from '@/utils/request'
import Qs from 'qs'

export function leavebase() {
    return request({
        url: '/leave/base',
        method: 'get'
    })
}

export function leaveapply(data) {
    return request({
        url: '/leave/apply',
        method: 'post',
        data: Qs.stringify(data)
    })
}


export function leaveoffice(data) {
    return request({
        url: '/leave/infobase',
        method: 'post',
        data: Qs.stringify(data)
    })
}