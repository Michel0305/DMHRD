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


export function getVGateCard(data) {
    return request({
        url: '/attendance/vgatecard',
        method: 'get',
        params:{cdate:data}
    })
}

export function employeeeval(data){
    return request({
        url: '/attendance/employeeeval',
        method: 'get',
        params:{cdate:data}
    })
}


/**
 * echart显示数据
 * @param {*} data 
 * @returns 
 */
export function  eChartAttendance(data) {
    return request({
        url: '/attendance/analytical',
        method: 'get',
        params:data
    })
}

/**
 * 人事手动签卡
 * @param {*} data 
 * @returns 
 */
export function PassAttendanceCard(data) {
    return request({
        url: '/attendance/passcard',
        method: 'post',
        data:Qs.stringify(data)
    })    
}