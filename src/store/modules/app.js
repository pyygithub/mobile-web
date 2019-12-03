import Vue from 'vue'
import {
    getAddress,
    getFoodTypes,
    getShopList,
    getShopGoods,
    getShopInfo,
    getShopRatings
} from '../../api/index'

const OK = 200
const app = {
    state: {
        latitude: 40.10038,
        longitude: 116.38234,
        address: {},
        foodTypes: [],
        shops: [],
        goods:[],
        ratings: [],
        info: {}
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
            } else {
                food.count++
            }
        },
        DECREMENT_FOOD_COUNT: (state, {food}) => {
            // 只要有值才去减
            if (food.count) {
                food.count--
            }
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
        async getShopRatings({commit}) {
            // 发送异步请求
            const result = await getShopRatings()
            if (result.code === OK) {
                const ratings = result.data
                // 提交mutations
                commit('SET_RATINGS', {ratings})
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
        }
    }
}

export default app
