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