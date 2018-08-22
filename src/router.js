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
//登录注册找密码
import Login from '@/components/User/login'
import Register from '@/components/User/register'
import GetLose from '@/components/User/getlose'
//订单和评价
import Bjsd from '@/components/User/bjsd'
import Wjsd from '@/components/User/wjsd'
import Wfbd from '@/components/User/wfbd'
import Comments from '@/components/User/comment'
//充值提现
import Cz from '@/components/User/cz'
import Tx from '@/components/User/tx'

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
        },
        {
          path: 'register',
          component: Register,
        },
        {
          path: 'getlose',
          component: GetLose,
        },
        {
          path: 'wjsd',
          component: Wjsd,
        }, 
        {
          path: 'wfbd',
          component: Wfbd,
        },
        {
          path: 'bjsd',
          component: Bjsd,
        },
        {
          path:'comment',
          component:Comments
        },
        {
          path: 'cz',
          component: Cz,
        },
        {
          path:'tx',
          component:Tx
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
