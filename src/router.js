import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './components/Home/Home'
import Activity from './components/Activity/Activity'
import ActivityDetail from './components/Activity/ActivityDetail'
import List from './components/List/List'
import HomeTabDetail from './components/Home/HomeTabDetail'
import bottomBar from './components/bottomBar'
Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'Home',
          component: Home
      },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
      {
          path: '/Activity',
          name: 'Activity',
          component: Activity
      },
      {
          path: '/Activity/Detail',
          name: 'ActivityDetail',
          component: ActivityDetail
      },
      {
          path: '/List',
          name: 'List',
          component: List
      },
      {
          path:'/HomeTabDetail',
          name:'HomeTabDetail',
          component:HomeTabDetail
      },
      {
          path:'/bottomBar',
          name:'bottomBar',
          component:bottomBar
      }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
