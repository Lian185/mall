import Toast from './Toast.vue'

const obj = {}

// Vue.use安装插件会调用install
obj.install = function(Vue) {
  // 通过Vue.exted创建构造函数
  const ToastConstructor = Vue.extend(Toast)

  // 创建toastConstructor的实例
  const toast = new ToastConstructor()

  // 把toast组件挂载到一个div上
  toast.$mount(document.createElement('div'))

  // 把上面的div添加到body中 toast.$el就是div
  document.body.appendChild(toast.$el)

  // 往Vue原型添加$toast属性 值为toast 这样在全局就可以调用
  Vue.prototype.$toast = toast
}

export default obj