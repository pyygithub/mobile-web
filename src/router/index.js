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
        component: () => import('../views/Home/Home.vue'), // 路由懒加载（请求该路径时才会引入该路由，会自动拆分打包）
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
        path: '/shop',
        name: 'Shop',
        component: () => import('../views/Shop/Shop.vue'),
        children: [
            {
                path: '/shop/goods',
                name: 'ShopGoods',
                component: () => import('../views/Shop/ShopGoods/ShopGoods.vue')
            },
            {
                path: '/shop/ratings',
                name: 'ratings',
                component: () => import('../views/Shop/ShopRatings/ShopRatings.vue')
            },
            {
                path: '/shop/info',
                name: 'Info',
                component: () => import('../views/Shop/ShopInfo/ShopInfo.vue')
            },
            {
                path: '',
                redirect: '/shop/goods'
            }
        ]
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
