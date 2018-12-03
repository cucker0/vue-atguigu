// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Spinner, Cell, Checklist } from 'mint-ui'

Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)
Vue.component(Cell.name, Cell)
Vue.component(Checklist.name, Checklist)


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
