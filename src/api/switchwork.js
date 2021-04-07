import request from '@/utils/request'
import Qs from 'qs'

export function getswitchwork() {
    return request({
        url: '/switchwork',
        method: 'get'
    })
}

export function infoworkdate (data) {
    return request({
        url:'/switchwork/infoworkdate',
        method:'post',
        data:Qs.stringify(data)
    })
}