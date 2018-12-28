/*
*  使用mockjs提供mock数据接口
* */

import Mock from 'mockjs'
import data from './data'

// 返回goods列表接口
Mock.mock('/goods', data.goods)

// 返回ratings列表接口
Mock.mock('/ratings', data.ratings)

// 返回good Info列表接口
Mock.mock('/info', data.info)

// 这里不需向export任务方法、变量、对象等。所以不需要写export default xxx
