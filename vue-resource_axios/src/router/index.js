import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import VueResource from '../components/VueResource'
import VueAxios from '../components/VueAxios'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueResource',
      component: VueResource
    },
    {
      path: '/axios',
      name: 'VueAxios',
      component: VueAxios
    }
  ]
})
