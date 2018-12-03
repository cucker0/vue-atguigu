import Vue from 'vue'
import Router from 'vue-router'
import CommentPage from '../components/CommentPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CommentPage',
      component: CommentPage
    }
  ]
})
