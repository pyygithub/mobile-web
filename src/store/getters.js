/*
包含多个基于state的getter计算属性的对象
 */
const getters = {
    latitude: state => state.app.latitude,
    longitude: state => state.app.longitude,
    address: state => state.app.address,
    foodTypes: state => state.app.foodTypes,
    shops: state => state.app.shops,
    goods: state => state.app.goods,
    ratings: state => state.app.ratings,
    info: state => state.app.info,
    cartFoods: state => state.app.cartFoods,
    totalCount: state => state.app.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0),
    totalPrice: state => state.app.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0),
    positiveSize: state => state.app.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0 ),

    username: state => state.user.username,
    phone: state => state.user.phone,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
}

export default getters
