import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取考勤数据
 * @param {*} data 
 * @returns 
 */
export function getworkrecords(data) {
    return request({
        url: '/attendance/workrecors',
        method: 'get',
        params: data
    })
}

export function infoRegistrationCard(data) {
    return request({
        url: '/attendance/infoqk',
        method: 'post',
        data: Qs.stringify(data)
    })
}

export function getRegistrationCard() {
    return request({
        url: '/attendance/baseqk',
        method: 'get'
    })
}

export function updateRegistrationCard(data) {
    return request({
        url: '/attendance/upgradeqk',
        method: 'post',
        data:Qs.stringify(data)
    })
}

