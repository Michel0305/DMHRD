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

/**
 * 获取年休/余休基本数据
 * @returns 
 */
export function AnnualLeaveBaseData() {
    return request({
        url: '/leave/annual',
        method: 'get',
    })
}

/**
 * 保存修改好的余休及年休
 * @param {*} data 
 * @returns 
 */
export function InfoAnnualLeave(data) {
    return request({
        url: '/leave/infoannual',
        method: 'post',
        data:Qs.stringify(data)
    })
}