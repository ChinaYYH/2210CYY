import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import appapp from './modules/appapp'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    users: user,
    app,
    appapp
  },
  getters
})

export default store
