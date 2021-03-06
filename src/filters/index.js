 import Vue from 'vue'
 //import moment from 'moment'
 //import { format, compareAsc } from 'date-fns'
 import format from 'date-fns/format'

 // 自定义过滤器
 Vue.filter('date-format', (value, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  return format(value).format(formatStr)
 })