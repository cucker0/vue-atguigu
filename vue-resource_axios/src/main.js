// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Axios from 'axios'

Vue.use(VueResource)      // 内部会给vue对象和组件添加一个属性 $http
Vue.prototype.$axios = Axios    //绑定原型, $后的变量自己定义，后面将用到这个变量

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
