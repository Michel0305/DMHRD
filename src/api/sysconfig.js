import request from '@/utils/request'
import Qs from 'qs'

export function getHolidays() {
    return request({
        url: '/config',
        method: 'get'
    })
}
