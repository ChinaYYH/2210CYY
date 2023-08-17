import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 全局组件
Vue.component('svg-icon', SvgIcon)
// 引入文件的目录  ，是否遍历子目录  匹配规则
const req = require.context('./svg', false, /\.svg$/)
// requireContext上下文中的所有文件动态导入，并返回一个包含所有导入模块的数组。
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 将所有满足条件的 SVG 文件导入并返回一个包含这些导入模块的数组。
