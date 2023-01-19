import Vue from 'vue'
import Router from 'vue-router'
import VueDemo from '../pages/vue-demo'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueDemo',
      component: VueDemo
    },
  ]
})
