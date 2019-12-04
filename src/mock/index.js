import Mock from 'mockjs'
import AddressAPI from './api/addrerss'
import FootTypeAPI from './api/foodTypes'
import ShopsAPI from './api/shops'
import SearchShopsAPI from './api/searchShops.js'
import UserAPI from './api/user'
import data from './data/data.json'

Mock.setup({
    timeout: '200'
})

//如果发送请求的api路径匹配，拦截
//第一个参数匹配的请求api路径，第二个参数匹配请求的方式，第三个参数相应数据如何替换
Mock.mock(/\/position/, 'get', AddressAPI.getAddress)

Mock.mock(/\/index_category/, 'get', FootTypeAPI.getFoodTypes)

Mock.mock(/\/shops/, 'get', ShopsAPI.getShopList)

Mock.mock(/\/search_shops/, 'get', SearchShopsAPI.getSearchShops)

Mock.mock(/\/img_code/, 'get', UserAPI.getImgCode)

Mock.mock(/\/send_sms_code/, 'get', UserAPI.sendSmsCode)

Mock.mock(/\/login_sms/, 'post', UserAPI.loginSms)

Mock.mock(/\/login_pwd/, 'post', UserAPI.loginPwd)

Mock.mock(/\/profile/, 'get', UserAPI.getUserInfo)

Mock.mock(/\/logout/, 'get', UserAPI.logout)

Mock.mock(/\/goods/, 'get', {code:200, data: data.goods})

Mock.mock(/\/ratings/, 'get', {code:200, data: data.ratings})

Mock.mock(/\/info/, 'get', {code:200, data: data.info})

//配置模拟数据接口
//  /company/12
//Mock.mock(/\/company\/+/, 'get', CompanyAPI.sassDetail)//根据id查询
//Mock.mock(/\/company/, 'get', CompanyAPI.list)  //访问企业列表


