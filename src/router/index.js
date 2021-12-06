import Vue from 'vue'
import Router from 'vue-router'
import mockIndex from '../components/mockIndex'
import primary from '../components/primary'
import middle from '../components/middle'
import height from '../components/height'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mockIndex',
      component: mockIndex
    },
    {
      path: '/primary',
      name: 'primary',
      component: primary
    },
    {
      path: '/middle',
      name: 'middle',
      component: middle
    },
    {
      path: '/advanced',
      name: 'advanced',
      component: height
    }
  ]
})
