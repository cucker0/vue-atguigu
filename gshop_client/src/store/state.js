/*
* 状态对象
* */

export default {
  longitude: 116.36867, // 经度
  latitude: 40.10038, // 纬度
  address: {}, // 地址信息
  foodCategorys: [], // 食物分类列表
  shops: [], // 商家列表
  userinfo: {}, // 用户信息
  shopInfo: {}, // 商家信息
  goods: [], // 商品列表
  shopRatings: [], // 商家评价列表
  cartFoods: [], // 选购车中的食物列表，并且food.count 大于0
  searchShops: [] // 搜索得到的商家列表
}
