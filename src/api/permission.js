import request from '@/utils/request'
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params // 查询参数
  })
}
// 新增
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 详情
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// 编辑
export function bianjiDetail(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
// 删除
export function delDetail(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'delete',
    data
  })
}
// 导出员工信息表
export function exportEmployee() {
  return request({
    url: `/sys/user/export`,
    responseType: 'blob', // 默认值
  })
}
// 导入员工信息
export function importEmployee(data) {
  return request({
    url: `sys/user/import`,
    method:'POST',
    data   //formData类型  因为要上传文件
   })
}
//获取可用角色   /sys/role/list/enabled
export function getEnabledRoles() {
  return request({
    url: `/sys/role/list/enabled`
  })
}
// 基本信息
export function getEnabledRolesapp(data) {
  return request({
    url: `/sys/user/${data.id}`,
    data
  })
}
// 更新
export function assignRole(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method:"PUT",
    data
  })
}


