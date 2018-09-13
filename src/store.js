import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import { Toast } from 'mint-ui';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      login:false,
      show:false,
      //主页
      HomeTabSelected:0,
      HomeCategory:[],
      HomeDetail:[],
      HomeBanner:[],
      HomePopular:[],
      AllCate:[],
      HomeTabSwiperShow:true,
      //订单
      OrderList:[],
      OrderSelected:{},
      OrderId:0,
      OrderDetail:{},
      OrderComments:[],
      TakeOrderRes:{},
      UserOrder:{},
      //活动
      ActivityList:[],
      ActivityDetail:{},
      ActivityType:'1',
      ActivityBanner:{},
      //榜单
      PublishList:[],
      TakenList:[],
      TopBarCityShow:false,
      SearchResult:{},
      //个人中心头部
      userTitle:'',
      hasSrh:'',
      UserInfo:{},
      user:'',
      //订单管理:''
      wfbd:'',
      wjsd:'',
   //   OrderManagerTabNum:5,
      bjsd:'',
      //升级会员显示
      vip:'',
      //积分明细
      integral:'',
  },
  mutations: {
    setUserTitle(state,data){
      state.userTitle = data;
    },
    setHasSrh(state,data){
      state.hasSrh = data;
    },
    HomeTabSelected(state,SelectedId){
      state.HomeTabSelected = SelectedId
      state.HomeDetail = state.HomeCategory[state.HomeTabSelected].SecCate
    },
    setHomeCategory(state,HomeCate){
      state.HomeCategory = HomeCate
        //console.log(HomeCate)
    },
    setHomeBanner(state,Banner){
        state.HomeBanner = Banner
        //console.log(state.HomeBanner)
    },
    setHomePopular(state,Popular){
        state.HomePopular = Popular
      //  console.log(state.HomePopular)
    },
    setHomeTabSwiperShow(state,show){
        state.HomeTabSwiperShow = show
     },
    setAllCate(state,Cate){
        state.AllCate = Cate
       // console.log(state.AllCate)
    },
    setOrderSelected(state,OrderSelected){
        state.OrderSelected = OrderSelected
    },
    setOrderList(state,OrderList){
        var list = OrderList.data
        for(var a in list){
            list[a].update_time = list[a].update_time.substring(0,10)
        }
      state.OrderList = list
    },
    setOrderId(state,OrderId){
      state.OrderId = OrderId
    },
    setOrderDetail(state,OrderDetail){
      OrderDetail.update_time = OrderDetail.update_time.substring(0,10)
      state.OrderDetail = OrderDetail
    },
    setOrderComments(state,Comments){
        state.OrderComments = Comments
    },
    setTakeOrderRes(state,Res){
        state.TakeOrderRes = Res
    },
    setUserOrder(state,UserOrder){
        state.UserOrder = UserOrder
    },
    setActivityList(state,List){
      state.ActivityList = List
    },
   setActivityBanner(state,Banner){
        state.ActivityBanner = Banner
   },
    setActivityDetail(state,Detail){
      state.ActivityDetail = Detail
    },
    setActivityType(state,type){
      state.ActivityType = type
    },
      //PublishList TakenList
    setPublishList(state,PublishList){
      state.PublishList = PublishList
        // if(PublishList == undefined){
        //
        // }
   },
   setTakenList(state,TakenList){
      state.TakenList = TakenList
   },
    setTopBarShow(state,ChangeShow){
      state.TopBarCityShow = ChangeShow
    },
    setSearchResult(state,Result){
        state.SearchResult = Result
    },
    setUserInfo(state,Info){
        state.UserInfo = Info
    },
    setBjsd(state,data){
      console.log(data)
      state.bjsd = data
    },
    setWjsd(state,data){
      console.log(data)
      state.wjsd = data
    },
    //  setOrderManagerTabNum(state,data){
    //   state.OrderManagerTabNum = data
    // },
    setWfbd(state,data){
      console.log(data)
      state.wfbd = data
    },
    setVip(state,data){
      console.log(data)
      state.vip = data
    },
    setIntegral(state,data){
      console.log(data)
      state.integral = data;
    },
    setUser(state,data){
        console.log(data)
        state.user=data
    }
  },
  actions: {
    getUserTitle(context,data){
      context.commit('setUserTitle',data)
    },
    getHasSrh(context,data){
      context.commit('setHasSrh',data)
    },
    getHomeCategory(context,id){
        axios.get('/index/all_cate')
            .then(function (response) {
                var HomeCate = []
                var CateRes = response.data.data.cate
                for(var i in CateRes){
                    HomeCate.push({Name:CateRes[i].name,Image:CateRes[i].id + '.png',SecCate:CateRes[i].son,Id:CateRes[i].id})
                }
                context.commit('setHomeCategory',HomeCate)
                if(isNaN(id)) {
                }
                else{
                    context.commit('HomeTabSelected', id - 1);
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getHomeBanner(context){
        axios.get('/index/index')
            .then(function (response) {
                console.log(response.data.data)
                var Banner = response.data.data.banner
                var Popular = response.data.data.popular
                var Cate = response.data.data.cate
                context.commit('setHomeBanner',Banner)
                context.commit("setHomePopular",Popular)
                context.commit("setAllCate",Cate)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getOrderList(context,Getobject){
        context.commit('setOrderSelected',Getobject)
        axios.post('index/same_city',{
            level_one: Getobject.levelone,
            level_two: Getobject.leveltwo,
            level_three: Getobject.levelthree,
            price: Getobject.price,
            time: Getobject.time,
            type: Getobject.type,
            status:Getobject.status,
            order_status:Getobject.order_status
            })
            .then(function (response) {
                var OrderList = response.data.data.order_list
                context.commit('setOrderList',OrderList)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getOrderDetail(context,OrderId){
        context.commit('setOrderId',OrderId)
        axios.get('/index/order_details',{  //url?order_id=
            params:{
                order_id:OrderId
            }
        })
        .then(function (response) {
            var detail = response.data.data
            context.commit('setOrderDetail',detail)
            context.commit('setOrderComments',detail.order_comments)
        })
        .catch(function (error) {
            console.log(error)
        })
     },
     getUserOrder(context,UserId){
        axios.get('/user/enter_img',{
            params:{
                user_id:UserId
            }
         })
        .then(function (res) {
            var UserOrderInfo = res.data.data
            context.commit('setUserOrder',UserOrderInfo)
            console.log(UserOrderInfo)
        })
        .catch(function (res) {

         })
     },
    getTakeOrder(context,OrderId){
    //    console.log(window.sessionStorage.getItem('token'))
        axios.post('/receive/receive_order',{
            order_id:OrderId
        },{
            headers:{
            'token':window.sessionStorage.getItem('token')
        }})
            .then(function (response) {
                var TakeOrderRes = response.data
                context.commit('setTakeOrderRes',TakeOrderRes)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getActivityList(context,type){
          axios.post('/activity/index',{
                  type:type-1
          })
              .then(function (response) {
                  console.log(response)
                  var ActivityList = response.data.data.activity_list.data
                  var ActivityBanner = response.data.data.banner
                  context.commit('setActivityList',ActivityList)
                  context.commit('setActivityBanner',ActivityBanner)
              })
              .catch(function (error) {
                  console.log(error)
              });
     },
    getActivityDetail(context,id){
        axios.get('/activity/activity_details',{
            params: {
                id: id  //0为进行中，1为长期，2为已过期，默认传0
            }})
            .then(function (response) {
                var ActivityDetail = response.data.data
                console.log(ActivityDetail)
                context.commit('setActivityDetail',ActivityDetail)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getPublishList(context,type){
        axios.get('index/release_list',{
            params:{
                type:type
            }
           })
            .then(function (response) {
                var PublishList = response.data.data
                context.commit('setPublishList',PublishList)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getTakenList(context,type){
        axios.get('index/list_orders',{
            params:{
                type:type
            },
        })
            .then(function (response) {
                var TakenList = response.data.data
                context.commit('setTakenList',TakenList)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getTopSearch(context,SearchObject){
          axios.post('index/search',{
              search_top:SearchObject.searchtop,
              level_one: SearchObject.levelone,
              level_two: SearchObject.leveltwo,
              level_three: SearchObject.levelthree,
              price: SearchObject.price,
              time: SearchObject.time,
              type: SearchObject.type,
              search: SearchObject.search
          })
              .then(function (response) {
                  var Search = response.data.data
                  context.commit('setSearchResult',Search)
              })
              .catch(function (error) {
                  console.log(error)
              });
     },
     getUserInfo(context){
         axios.get('/user/user_edit',{
             headers:{
                 token:window.sessionStorage.getItem('token')
             }
         })
             .then(function (response) {
                 var UserInfo = response.data.data
                 context.commit('setUserInfo',UserInfo)
             })
             .catch(function (error) {
                 console.log(error)
             });
     },
    getWfbd(context,type){
      var data={
        type
      }
      console.log(data)
      axios({
        method:'get',
        url:'/order/release_order',
        params:data,
        headers:{
          token:window.sessionStorage.getItem('token')
        }
      }).then(res=>{
        var data =res.data.data;
        context.commit('setWfbd',data)
      })
    },
    getWjsd(context,type){
      var data={
        type
      }
      axios({
        method:'get',
        url:'/order/received',
        params:data,
        headers:{
          token:window.sessionStorage.getItem('token')
        }
      }).then(res=>{
        var data =res.data.data;
        context.commit('setWjsd',data)
      })
    },
    getBjsd(context,type){
      var data={
        type
      }
      axios({
        method:'get',
        url:'/order/be_received',
        params:data,
          headers:{
            token:window.sessionStorage.getItem('token')
          }
      }).then(res=>{
        var data =res.data.data;
        context.commit('setBjsd',data)
      })
    },
    getVip(context){
      axios({
        method:'get',
        url:'/user/user_member',
          headers:{
            token:window.sessionStorage.getItem('token')
          }
      }).then(res=>{
        var data =res.data.data;
        context.commit('setVip',data);
      })
    },
    getUser(context){
        axios.get(
            '/user/info',
            {headers:{
                token:window.sessionStorage.getItem('token')
            }}
        ).then(res=>{
            context.commit('setUser',res.data.data)
        })
    },
    getIntegral(context){
      axios({
        method:'get',
        url:'/user/info',
          headers:{
            token:window.sessionStorage.getItem('token')
          }
      }).then(res=>{
        var data =res.data.data.integral_detail;
        context.commit('setIntegral',data);
      })
    }
  }
})
