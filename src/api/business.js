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

/**
 * 保存更新出差单
 * @param {*} data 
 * @returns 
 */
export function infoBusindessData(data) {
    return request({
        url: '/business/infobusiness',
        method: 'post',
        data:Qs.stringify(data)
    })
}

