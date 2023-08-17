import request from '@/utils/request'

export function permissionList() {
    return request({
        url: '/sys/permission',
    })
}
// 添加
export function permissionLists(data) {
    return request({
        url: '/sys/permission',
        method: 'post',
        data
    })
}
// 编辑
export const editpermisson = (id) =>request.get(`/sys/permission/${id}`)
export const editpermissonrow = (data) =>request.put(`/sys/permission/${data.id}`,data)

export const delpermissonrow = (data) =>request.delete(`/sys/permission/${data.id}`,data)
