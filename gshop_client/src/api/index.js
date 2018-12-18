/*
*  包含n个接口请求函数的模块
*  函数的返回值：promise对象
* */

import ajax from './ajax'

// 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

// 获取食品分类列表
export const reqFoodTypes = () => ajax('/index_category')

// 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax('/shops', {longitude, latitude}, 'GET')

// 根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (keyword, geohash) => ajax('/search_shops', {keyword, geohash})

// 获取一次性验证码
export const reqOneTimeCaptcha = () => ajax('/captcha')

// 用户名密码登陆
export const reqLogin = (name, pwd, captcha) => ajax('/login_pwd', {name, pwd, captcha}, 'POST')

// 发送短信验证码
export const reqSendcode = (phone) => ajax('/sendcode', {phone})

// 手机号验证码登陆
export const reqLogin_sms = (phone, code) => ajax('/login_sms', {phone, code}, 'POST')

// 根据会话获取用户信息
export const reqUserinfo = (user_id) => ajax('/userinfo', {user_id})

// 用户登出
export const reqLogout = (user_id) => ajax('/logout', {user_id})
