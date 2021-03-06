/*
*  包含n个接口请求函数的模块
*  函数的返回值：promise对象
* */

import ajax from './ajax'
const BASIC_URL = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASIC_URL}/position/${geohash}`)

// 获取食品分类列表
export const reqFoodCategorys = () => ajax(BASIC_URL + '/index_category')

// 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASIC_URL + '/shops', {longitude, latitude}, 'GET')

// 根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (keyword, geohash) => ajax(BASIC_URL + '/search_shops', {keyword, geohash})

// // 获取一次性验证码
// export const reqOneTimeCaptcha = () => ajax(BASIC_URL + '/captcha')

// 用户名密码登陆
export const reqPasswordLogin = ({name, pwd, captcha}) => ajax(BASIC_URL + '/login_pwd', {name, pwd, captcha}, 'POST')

// 发送短信验证码
export const reqSendCode = (phone) => ajax(BASIC_URL + '/sendcode', {phone})

// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASIC_URL + '/login_sms', {phone, code}, 'POST')

// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASIC_URL + '/userinfo')

// 用户登出
export const reqLogout = () => ajax(BASIC_URL + '/logout')

// 获取商家信息
export const reqShopInfo = (shopId) => ajax(`/shop_info/${shopId}`)

// 获取商家评价数据
export const reqShopRatings = (shopId) => ajax(`/shop_ratings/${shopId}`)

// 获取商家商品数据
export const reqShopGoods = (shopId) => ajax(`/goods/${shopId}`)
