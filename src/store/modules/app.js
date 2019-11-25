import {getAddress, getFoodTypes, getShopList} from '../../api/index'

const app = {
    state: {
        latitude: 40.10038,
        longitude: 116.38234,
        address: {},
        foodTypes: [],
        shops: []
    },
    mutations: {
        RECEIVE_ADDRESS: (state, {address}) => {
            state.address = address
        },
        RECEIVE_FOOD_TYPES: (state, {foodTypes}) => {
            state.foodTypes = foodTypes
        },
        RECEIVE_SHOPS: (state, {shops}) => {
            state.shops = shops
        }
    },
    actions: {
        // 异步获取地址
        async getAddress({commit, state}) {
            // 发送异步请求
            const geohash = state.latitude + ',' + state.longitude
            const result = await getAddress(geohash)
            if (result.code === 200) {
                const address = result.data
                // 提交mutations
                commit('RECEIVE_ADDRESS', {address})
            }
        },
        // 异步获取商品分类
        async getFoodTypes({ commit}) {
            // 发送异步请求
            const result = await getFoodTypes()
            if (result.code === 200) {
                const foodTypes = result.data
                // 提交mutations
                commit('RECEIVE_FOOD_TYPES', {foodTypes})
            }
        },
        // 异步获取商品列表
        async getShopList({ commit, state}) {
            // 发送异步请求
            const longitude = state.longitude
            const latitude = state.latitude
            const result = await getShopList(longitude, latitude)
            if (result.code === 200) {
                const shops = result.data
                // 提交mutations
                commit('RECEIVE_SHOPS', {shops})
            }
        },
    }
}

export default app
