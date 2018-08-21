import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
//主页
import Home from './components/Home/Home'
import HomeTabDetail from './components/Home/HomeTabDetail'
//活动
import Activity from './components/Activity/Activity'
import ActivityDetail from './components/Activity/ActivityDetail'
//榜单
import List from './components/List/List'

//分类进
import OrderList from './components/Order/OrderList'
import OrderDetail from './components/Order/OrderDetail'
//个人中心
import User from '@/components/User/home'
import Other from '@/components/User/other'
//个人中心下子路由
import Login from '@/components/User/login'

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
      path: '/HomeTabDetail',
      name: 'HomeTabDetail',
      component: HomeTabDetail
    },
    {
          path: '/OrderList',
          name: 'OrderList',
          component: OrderList
    },
      {
          path: '/OrderDetail',
          name: 'OrderDetail',
          component: OrderDetail
      },
    {
      path: '/user',
      component: User
    },
    {
      path: '/other',
      component: Other,
      children:[
        {
          path: 'login',
          component: Login,
        }
      ]
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
