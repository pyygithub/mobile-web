import {getAddress, getFoodTypes, getShopList} from '../../api/index'

const OK = 200
const app = {
    state: {
        latitude: 40.10038,
        longitude: 116.38234,
        address: {},
        foodTypes: [],
        shops: []
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
        async getFoodTypes({ commit}) {
            // 发送异步请求
            const result = await getFoodTypes()
            if (result.code === OK) {
                const foodTypes = result.data
                // 提交mutations
                commit('SET_FOOD_TYPES', {foodTypes})
            }
        },
        // 异步获取商品列表
        async getShopList({ commit, state}) {
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
    }
}

export default app
