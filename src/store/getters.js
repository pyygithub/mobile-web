/*
包含多个基于state的getter计算属性的对象
 */
const getters = {
    latitude: state => state.app.latitude,
    longitude: state => state.app.longitude,
    address: state => state.app.address,
    foodTypes: state => state.app.foodTypes,
    shops: state => state.app.shops,
}

export default getters
