import request from '@/utils/request'
import Qs from 'qs'

export function getHolidays() {
    return request({
        url: '/config',
        method: 'get'
    })
}


export function infoHolidays(info) {
    return request({
        url: '/config/infoholidays',
        method: 'post',
        data:Qs.stringify(info)
    })
}

export function removeHolidays(info) {
    return request({
        url: '/config/delholidays',
        method: 'post',
        data:Qs.stringify(info)
    })
}