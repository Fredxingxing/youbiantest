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
import UserOrder from './components/Order/UserOrder'
//发布
import PushDetail from './components/Push/PushDetail'
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
//个人资料修改密码冲会员
import UserInfo from './components/User/UserInfo/UserInfo'
import ChangeUserInfo from './components/User/UserInfo/ChangeUserInfo'
import PhoneChange from './components/User/UserInfo/PhoneChange'
import IdChange from './components/User/UserInfo/IdChange'
import SetPwd from '@/components/User/setpwd'
import Vip from '@/components/User/vip'
//充值提现
import Cz from '@/components/User/cz'
import Tx from '@/components/User/tx'
import PDetail from '@/components/User/detail'

Vue.use(Router)

const router = new Router({
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
          path: '/PushDetail',
          name: 'PushDetail',
          component: PushDetail
      },
      {
        path:'/UserOrder',
        name:'UserOrder',
        component:UserOrder
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
          path: 'vip',
          component: Vip,
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
        },
        {
          path:'setpwd',
          component:SetPwd
        },
        {
          path:'detail',
          component:PDetail
        },
          {
              path:'UserInfo',
              component:UserInfo
          },
          {
              path:'ChangeUserInfo',
              component:ChangeUserInfo
          },
          {
              path:'PhoneChange',
              component:PhoneChange
          },
          {
              path:'IdChange',
              component:IdChange
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
router.beforeEach((to,from,next)=>{
  const TestIdPage = ['PushDetail']
    var isLogin = window.sessionStorage.getItem('token')
    if(TestIdPage.indexOf(to.name)>= 0) {
        if (!isLogin) {
            router.push('/other/login')
        }
    }
    //已登录的情况进入登录页 跳转首页
    if(to.name =='/other/login'){
    if(isLogin) {
      router.push({name:'home'})
    }
    }
    next()
});
export default router