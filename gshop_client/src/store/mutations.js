/*
* 直接更新state状态的多个对象
* */

import {
  RECIVE_ADDRESS,
  RECIVE_FOODCATEGORY,
  RECIVE_SHOPS
} from './mutation-types'

export default {
  [RECIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECIVE_FOODCATEGORY] (state, {foodCategorys}) {
    state.foodCategorys = foodCategorys
  },
  [RECIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  }
}
