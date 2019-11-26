import {getUserInfo} from '../../api/user'

const OK = 200 // 成功响应状态码
const user = {
    state: {
        username: '', // 当前登录用户名称
        phone: '', // 手机号
        avatar: '', // 用户头像
        roles: [], // 当前用户拥有角色权限
    },
    mutations: {
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar || 'http://or45inefq.bkt.clouddn.com/itheima-avatar.png'
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
    },
    actions: {
        // 获取用户信息
        async getUserInfo({commit, state}) {
            // 发送异步请求
            const result = await getUserInfo()
            console.log(result.data)
            if (result.code === OK) {
                // 提交mutations
                commit('SET_USERNAME', result.data.username)
                commit('SET_PHONE', result.data.phone)
                commit('SET_ROLES', result.data.roles ? result.data.roles : {menus:[],points:[]})
                commit('SET_AVATAR', result.data.avatar)
            }
        }
    }
}

export default user
