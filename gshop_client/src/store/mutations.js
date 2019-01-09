/*
* 直接更新state状态的多个对象
* */

import {
  RECIVE_ADDRESS,
  RECIVE_FOODCATEGORYS,
  RECIVE_SHOPS,
  RECIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECIVE_FOODCATEGORYS] (state, {foodCategorys}) {
    state.foodCategorys = foodCategorys
  },
  [RECIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECIVE_USERINFO] (state, {userinfo}) {
    state.userinfo = userinfo
  },
  [RESET_USERINFO] (state) {
    // 退出登录，重置用户信息为初始值
    state.userinfo = {}
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_SHOP_INFO] (state, {shopInfo}) {
    state.shopInfo = shopInfo
  },
  [RECEIVE_SHOP_RATINGS] (state, {shopRatings}) {
    state.shopRatings = shopRatings
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) { // 第一次点击 +
      // food.count = 1 // 这种方法，新增属性没有数据绑定，虽然值更新了，但不会自动更新界面
      /*
      * 让新增的属性有数据绑定效果方法
      * Vue.set(对象, 属性名, 属性值)   其中属性名为字符串类型数据
      * */
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food) // 物品加入到购物车
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count > 0) {
      food.count--
    } else if (food.count === 0) { // 当一个物品的count为0时从购物车去掉该物品
      state.cartFoods.slice(state.cartFoods.indexOf(food), 1)
    }
  }

}
