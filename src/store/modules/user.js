import Vue from 'vue'
import Vuex from 'vuex'
import getters from '../getters'
import { constantRoutes } from '@/router/index'
// 引入方法
import { setToken, getToken, removeToken, setsToken } from '@/utils/auth'
import { login, getListss, appapp } from '@/api/user'
import { resetRouter } from '@/router'
export default {
  // 开启单独命名
  namespaced: true,
  state: {
    token: getToken(),
    userInfos: {},
    routes: constantRoutes
  },
  mutations: {
    // 存token
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    // 把数据放到userInfos
    setsToken(state, data) {
      state.userInfos = data
      // console.log(state.userInfos);
    },
    // 删除token
    removeToken(state) {
      state.token = null
      removeToken()
    },
    // userInfos为空对象
    userInfoss(state, data) {
      state.userInfos = data
    },
    setRoutes(state, data) {
      // console.log(data);
      state.routes = [...constantRoutes, ...data]
      // console.log(constantRoutes);
    },
  },
  getters: {},
  actions: {

    // 登录
    async login({ commit }, data) {
      let res = await login(data)
      // console.log(res.data.data);
      // 调用存token的方法,传入参数
      commit('setToken', res.data.data)
    },
    // 用户资料
    async getListss({ commit }) {
      let res = await getListss()
      // console.log(res);
      // 调用mutations中的方法,并传入参数
      commit('setsToken', res.data.data)
      return res.data.data
    },

    // 删除
    logout({ commit }) {
      // 调用删除token的方法
      commit('removeToken')
      // 调用userInfos为空对象,传入空对象
      commit('userInfoss', {})
      resetRouter()
    }
  }
}