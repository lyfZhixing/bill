import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Add from '@/components/base/add'
import Detail from '@/components/base/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
