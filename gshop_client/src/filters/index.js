/*
* 自定义过滤器
* */

import Vue from 'vue'
import moment from 'moment'

// 时间格式过滤器
Vue.filter('timeFormat', (value, formatStr='YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(formatStr)
})
