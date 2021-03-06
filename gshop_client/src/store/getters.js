/*
* 多个基于state的getter计算属性对象
* */

export default {
  // 计算购物车上物品总数量
  totalCount (state) {
    return state.cartFoods.reduce((total, food) => total + food.count, 0)
  },
  // 计算购物车上所有物品总价格
  totalPrice (state) {
    return state.cartFoods.reduce((total, food) => total + food.price * food.count, 0)
  },
  // 计算满意评论的数量
  positiveRatingsSize (state) {
    return state.shopRatings.reduce((total, rating) => total + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
