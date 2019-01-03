/*
* 通过mutation间接更新state状态的多个函数对象
* */

import {
  RECIVE_ADDRESS,
  RECIVE_FOODCATEGORYS,
  RECIVE_SHOPS,
  RECIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    /*
    返回的数据格式：
    {
      "code": 0,
      "data": {
        "address": "北京市昌平区337省道",
        "city": "北京市",
        "geohash": "40.10038,116.36867",
        "latitude": "40.10038",
        "longitude": "116.36867",
        "name": "昌平区北七家宏福科技园(337省道北)"
      }
    }
    */
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类列表
  async getFootCategorys ({commit}) {
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const foodCategorys = result.data
      commit(RECIVE_FOODCATEGORYS, {foodCategorys})
    }
  },

  // 异步获取商家分类列表
  async getShops ({commit, state}) {
    const longitude = state.longitude
    const latitude = state.latitude
    // const {longitude, latitude} = state  // 也可简写成这样
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECIVE_SHOPS, {shops})
    }
  },

  // 同步保存用户信息
  saveUserinfo ({commit}, userinfo) {
    commit(RECIVE_USERINFO, {userinfo})
  },

  // 异步获取用户信息
  async getUserinfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) { // 获取用相应的用户信息
      const userinfo = result.data
      commit(RECIVE_USERINFO, {userinfo})
    }
  },

  // 异步退出登录
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) { // 退出登录成功
      commit(RESET_USERINFO)
    }
  },

  // 异步获取商家商品列表
  async getGoods ({commit}) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})
    }
  },

  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    // console.log(result)
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, {shopInfo})
    }
  }
}
