import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'
import {Button} from 'mint-ui'
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false
import loading from './assets/imgs/loading.gif'
import './filters' // 加载过滤器

// 全局注册组件
Vue.component(Button.name, Button)
// 图片懒加载
Vue.use(VueLazyload, {
  loading: loading
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
