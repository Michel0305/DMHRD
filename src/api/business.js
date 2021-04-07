import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取出差数据
 * @returns 
 */
export function getBusindessBase() {
    return request({
        url: '/business',
        method: 'get'
    })
}
