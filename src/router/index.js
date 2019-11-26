import Vue from 'vue'
import VueRouter from 'vue-router'

// 声明使用插件
Vue.use(VueRouter)

// 解决vue中的NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order/Order.vue'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile/Profile.vue'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search/Search.vue'),
        meta: {
            showFooter: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    //base: process.env.BASE_URL,
    routes
})

export default router
