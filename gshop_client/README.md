# gshop_client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 其他
this.$store.dispatch()传回调函数方法，是以数据的方法传递的
```
举例：
组件中使用下面这处方式给action传回调函数
this.$store.dispatch('xxAction', {data, callback: () => {}})
this.$store.dispatch('xxAction', {data, callback: () => {
    this.$nextTick(() => {
    })}
})

#


```

## 第三方组件
* Moment.js时间组件
```
# 网址
http://momentjs.cn/

# 安装
bower install moment --save # bower
npm install moment --save   # npm
Install-Package Moment.js   # NuGet
spm install moment --save   # spm
meteor add momentjs:moment  # meteor

# 使用
import Moment from 'moment'
获取时间戳 : var res = Moment(Date.now(), 'YYYY-MM-DD HH:mm:ss').valueOf();
获取格式时间: var res = Moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');



```
* better-scroll滑动组件

```
# 网址
http://ustbhuangyi.github.io/better-scroll/doc/api.html

# 安装
better-scroll 托管在 Npm 上，执行如下命令安装：

npm install better-scroll --save
接下来就可以在代码中引入了，webpack 等构建工具都支持从 node_modules 里引入代码：

# 使用
import BScroll from 'better-scroll'

new BScroll('.xx-class', {
  click: true,
  probeType: 2 // 1, 2, 3
})

```
