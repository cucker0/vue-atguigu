/*
* ajax请求函数模块
* */

import axiox from 'axios'
// 向外暴露一个函数
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') { // GET请求
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&')) // 去掉最后一个&
        url = url + '?' + dataStr // 拼接最终的完整URL
      }
      // 发送get请求
      promise = axiox.get(url)
    } else {
      // POST请求
      promise = axiox.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resove()
      resolve(response.data)
    }).catch(function (error) {
      // 失败了调用reject()
      reject(error)
    })
  })
}
