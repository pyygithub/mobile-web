import { createAPI } from '../utils/request'

// 1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const getAddress = (geohash) => createAPI(`/position/${geohash}`, 'get')

// 2、获取食品分类列表](#2获取食品分类列表)
export const getFoodTypes = () => createAPI('/index_category', 'get')

// 3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const getShopList = (longitude, latitude) => createAPI('/shops', 'get', {longitude, latitude})

// 4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const searchShopList = (goehash, keyword) => createAPI('/shops', 'get', {goehash, keyword})

// 5、获取商家信息
export const getShopInfo = () => createAPI('/info', 'get')

// 6、获取商家评价列表
export const getShopRatings = (goehash, keyword) => createAPI('/ratings', 'get')

// 7、获取商家商品数组
export const getShopGoods = (goehash, keyword) => createAPI('/goods', 'get')

