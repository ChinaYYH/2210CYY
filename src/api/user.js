// 引入封装好的方法
import request from '@/utils/request'
// 二次封装
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 用户资料
export function getListss() {
  return request({
    url: '/sys/profile',
    method: 'get',
  })
}
// 组织结构
export function appapp() {
  return request({
    url: '/company/department/',
    method: 'get',
  })
}
// 部门负责人
export function nameList() {
  return request({
    url: '/sys/user/simple',
    method: 'get',
  })
}
// 添加子部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 根据删除ID删除部门
export function delDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'delete',
    data
  })
}
// 编辑
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

// 搜索
export function appapp1(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'get',
  })
}
// 角色列表

export const mayList = (data) => request.get('/sys/role', { params: data })
// 角色列表添加
export const addList = (data) => request.post('/sys/role', data)
// 角色列表删除
export const delList = (data) => request.delete(`/sys/role/${data.id}`, data)
// 角色详情 
export const xqList = (data) => request.get(`/sys/role/${data.id}`, { params: data })
// 所有权限
export const qxList = () => request.get('/sys/permission')
// 分配权限
export const fenpeiList = (data) => request.put('/sys/role/assignPrem', data)
// 编辑角色列表
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data // 查询参数
  })
}

// export function mayList(data) {
//   return request({
//     url: '/sys/role',
//     method: 'get',
//     data
//   })
// }
//
// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
