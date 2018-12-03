import Vue from 'vue'
import Router from 'vue-router'
import SearchSort from '../components/SearchSort'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchSort',
      component: SearchSort
    }
  ]
})
