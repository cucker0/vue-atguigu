/*
* 直接更新state状态的多个对象
* */

import {
  RECIVE_ADDRESS,
  RECIVE_FOODCATEGORYS,
  RECIVE_SHOPS,
  RECIVE_USERINFO,
  RESET_USERINFO
} from './mutation-types'

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
  }
}
