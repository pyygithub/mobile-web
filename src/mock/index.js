import Mock from 'mockjs'
import AddressAPI from './addrerss'
import FootTypeAPI from './foodTypes'
import ShopsAPI from './shops'
import UserAPI from './user'


Mock.setup({
    timeout: '2000'
})

//如果发送请求的api路径匹配，拦截
//第一个参数匹配的请求api路径，第二个参数匹配请求的方式，第三个参数相应数据如何替换
Mock.mock(/\/position/, 'get', AddressAPI.getAddress)

Mock.mock(/\/index_category/, 'get', FootTypeAPI.getFoodTypes)

Mock.mock(/\/shops/, 'get', ShopsAPI.getShopList)

Mock.mock(/\/img_code/, 'get', UserAPI.getImgCode)

Mock.mock(/\/send_sms_code/, 'get', UserAPI.sendSmsCode)


//配置模拟数据接口
//  /company/12
//Mock.mock(/\/company\/+/, 'get', CompanyAPI.sassDetail)//根据id查询
//Mock.mock(/\/company/, 'get', CompanyAPI.list)  //访问企业列表


