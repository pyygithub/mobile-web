import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'
import {Button} from 'mint-ui'
Vue.config.productionTip = false

// 全局注册组件
Vue.component(Button.name, Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
