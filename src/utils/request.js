import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui';
import router from '@/router';
const service = axios.create({
  // 引入基准地址
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 1000,
  // headers: {

  // }
});


service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 是否有token
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, (error) => {
  console.dir(error)
  // console.log(error);

  // token失效处理
  // 如果error.response.status==401执行
  if (error.response.status == 401) {
    // 提示信息
    Message({ type: 'warning', message: 'token超时了' })
    // 调用封装好的方法
    store.dispatch('users/logout')
    // 跳转到登录页面
    router.push('/login')
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service