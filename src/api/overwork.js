import request from '@/utils/request'
import Qs from 'qs'

export function workbase() {
    return request({
        url: '/overwork/base',
        method: 'get'
    })
}

export function workinfodb(data) {
    return request({
        url: '/overwork/infodb',
        method: 'post',
        data:Qs.stringify(data)
    })
}