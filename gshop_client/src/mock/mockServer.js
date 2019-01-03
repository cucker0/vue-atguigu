/*
*  使用mockjs提供mock数据接口
* */

import Mock from 'mockjs'
import data from './data'

// 返回goods列表接口
Mock.mock('/goods', {code: 0, data: data.goods})

// 返回ratings列表接口
Mock.mock('/shop_ratings', {code: 0, data: data.ratings})

// 返回good Info列表接口
Mock.mock('/shop_info', {code: 0, data: data.info})

// 这里不需向export任务方法、变量、对象等。所以不需要写export default xxx
