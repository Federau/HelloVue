import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '@/components/NotFound'
import RepeatComponent from '@/components/RepeatComponent'
import Dashboard from '@/components/Dashboard'
import WorkQuery from '@/components/WorkQuery'
import WorkReport from '@/components/WorkReport'
import HandleRegister from '@/components/HandleRegister'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'report',
          components: {
            mainArea: WorkReport
          }
        },
        {
          path: 'handleRegister',
          components: {
            mainArea: HandleRegister
          }
        },
        {
          path: '/',
          components: {
            mainArea: WorkQuery
          }
        }
      ]
    },
    {
      path: '/repeatButton',
      name: 'RepeatComponent',
      component: RepeatComponent
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound

    }
  ]
})
