// import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// 存
export function setToken(token) {
  localStorage.setItem('my_token', token)
}
// 取
export function getToken() {
  return localStorage.getItem('my_token')
}
// 删除
export function removeToken() {
  localStorage.removeItem('my_token')
}
