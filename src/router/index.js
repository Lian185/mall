import Vue from 'vue' // 引入vue
import VueRouter from 'vue-router' // 引入vue-router

// 引入路由跳转组件
import Home from 'views/home/Home.vue'
import Category from 'views/category/Category.vue'
import Cart from 'views/cart/Cart.vue'
import Profile from 'views/profile/Profile.vue'
import Detail from 'views/detail/Detail.vue'

// 解决双击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 1.安装路由插件
Vue.use(VueRouter)

// 2.创建router对象
const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
  ],
  mode: 'history'
})

// 3.导出router对象
export default router