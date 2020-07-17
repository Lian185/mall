import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
 
Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body);

// 向Vue原型添加事件总线$bus
Vue.prototype.$bus = new Vue

// 安装图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
