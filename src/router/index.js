import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '@/components/NotFound'
import Dashboard from '@/components/Dashboard'
import WorkQuery from '@/components/WorkQuery'
import WorkReport from '@/components/WorkReport'
import HandleRegister from '@/components/HandleRegister'
import WorkItemFirstLevel from '@/components/WorkItemFirstLevelDefinition'
import WorkItemSecondLevel from '@/components/WorkItemSecondLevelDefinition'
import WorkTaskDefinition from '@/components/WorkTaskDefinition'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {title: '登录'}
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
          path: 'firstWorkLevelDef',
          components: {
            mainArea: WorkItemFirstLevel
          }
        },
        {
          path: 'secondWorkLevelDef',
          components: {
            mainArea: WorkItemSecondLevel
          }
        },
        {
          path: 'taskDefinition',
          components: {
            mainArea: WorkTaskDefinition
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
      path: '*',
      name: 'NotFound',
      component: NotFound

    }
  ]
})
