import Vue from 'vue'
import {
    getAddress,
    getFoodTypes,
    getShopList,
    getShopGoods,
    getShopInfo,
    getShopRatings,
    getSearchShopList,
} from '../../api/index'

const OK = 200
const app = {
    state: {
        latitude: 40.10038, // 纬度
        longitude: 116.38234,// 经度
        address: {},// 地址相关信息
        foodTypes: [],// 食物分类数组
        shops: [],// 商家数组
        goods:[],// 商品列表
        ratings: [],// 商家评价列表
        info: {},// 商家信息
        cartFoods: [],// 购物车中的商品（食物）列表
        searchShops: [], // 搜索商家列表
    },
    mutations: {
        SET_ADDRESS: (state, {address}) => {
            state.address = address
        },
        SET_FOOD_TYPES: (state, {foodTypes}) => {
            state.foodTypes = foodTypes
        },
        SET_SHOPS: (state, {shops}) => {
            state.shops = shops
        },
        SET_GOODS: (state, {goods}) => {
            state.goods = goods
        },
        SET_RATINGS: (state, {ratings}) => {
            state.ratings = ratings
        },
        SET_INFO: (state, {info}) => {
            state.info = info
        },
        INCREMENT_FOOD_COUNT: (state, {food}) => {
            // 第一次增加
            if (!food.count) {
                //food.count = 1 // 新增属性（没有数据绑定效果）
                Vue.set(food, 'count', 1) // 新增的属性也有数据绑定效果
                // 将food添加到cartFoods中
                state.cartFoods.push(food)
            } else {
                food.count++
            }
        },
        DECREMENT_FOOD_COUNT: (state, {food}) => {
            // 只要有值才去减
            if (food.count) {
                food.count--
                if (food.count === 0) {
                    // 将food从cartFoods中移除
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                }
            }
        },
        CLEAR_CART: (state) => {
            // 清除food的count
            state.cartFoods.forEach(food => delete food.count)
            // 移除购物车中的所有购物项
            state.cartFoods = []
        },
        SET_SEARCH_SHOPS: (state, {searchShops}) => {
            state.searchShops = searchShops
        }
    },
    actions: {
        // 异步获取地址
        async getAddress({commit, state}) {
            // 发送异步请求
            const geohash = state.latitude + ',' + state.longitude
            const result = await getAddress(geohash)
            if (result.code === OK) {
                const address = result.data
                // 提交mutations
                commit('SET_ADDRESS', {address})
            }
        },
        // 异步获取商品分类
        async getFoodTypes({commit}) {
            // 发送异步请求
            const result = await getFoodTypes()
            if (result.code === OK) {
                const foodTypes = result.data
                // 提交mutations
                commit('SET_FOOD_TYPES', {foodTypes})
            }
        },
        // 异步获取商品列表
        async getShopList({commit, state}) {
            // 发送异步请求
            const longitude = state.longitude
            const latitude = state.latitude
            const result = await getShopList(longitude, latitude)
            if (result.code === OK) {
                const shops = result.data
                // 提交mutations
                commit('SET_SHOPS', {shops})
            }
        },
        // 异步获取商家食品
        async getShopGoods({commit}, callback) {
            // 发送异步请求
            const result = await getShopGoods()
            if (result.code === OK) {
                const goods = result.data
                // 提交mutations
                commit('SET_GOODS', {goods})
                // 数据更新了，通知下组件
                callback && callback()
            }
        },
        // 异步获取商家评论列表
        async getShopRatings({commit}, callback) {
            // 发送异步请求
            const result = await getShopRatings()
            if (result.code === OK) {
                const ratings = result.data
                // 提交mutations
                commit('SET_RATINGS', {ratings})
                // 数据更新了，通知下组件
                callback && callback()
            }
        },
        // 异步获取商家信息
        async getShopInfo({commit}) {
            // 发送异步请求
            const result = await getShopInfo()
            if (result.code === OK) {
                const info = result.data
                // 提交mutations
                commit('SET_INFO', {info})
            }
        },
        // 同步更新food中的count值
        updateFoodCount ({commit}, {isAdd, food}) {
            if (isAdd) {
                commit('INCREMENT_FOOD_COUNT', {food})
            } else {
                commit('DECREMENT_FOOD_COUNT', {food})
            }
        },
        // 同步清空购物车
        clearCart ({commit}) {
            commit('CLEAR_CART')
        },
        // 搜索商家列表
        async getSearchShops ({commit, state}, keyword) {
            // 发送异步请求
            const geohash = state.latitude + ',' + state.longitude
            const result = await getSearchShopList(geohash, keyword)
            if (result.code === OK) {
                const searchShops = result.data
                // 提交mutations
                commit('SET_SEARCH_SHOPS', {searchShops})
            }
        }
    }
}

export default app
