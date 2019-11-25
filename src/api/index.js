import { createAPI } from '../utils/request'

// 1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const getAddress = (geohash) => createAPI(`/position/${geohash}`, 'get')

// 2、获取食品分类列表](#2获取食品分类列表)
export const getFoodTypes = () => createAPI('/index_category', 'get')

// 3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const getShopList = (longitude, latitude) => createAPI('/shops', 'get', {longitude, latitude})

// 4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const searchShopList = (goehash, keyword) => createAPI('/shops', 'get', {goehash, keyword})


