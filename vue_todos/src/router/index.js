import Vue from 'vue'
import Router from 'vue-router'
import TodoIndex from '../components/TodoIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoIndex',
      component: TodoIndex
    }
  ]
})
