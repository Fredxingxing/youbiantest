import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      login:false,
      show:false,
      HomeTabSelected:0,
      HomeCategory:[],
      HomeDetail:[],
      OrderList:[],
      OrderSelected:{},
      OrderId:0,
      OrderDetail:{},
      ActivityList:[],
      ActivityDetail:{},
      TopBarCityShow:false,
      //个人中心头部
      userTitle:'',
      hasSrh:'',
      //订单管理:''
      wfbd:'',
      wjsd:'',
      bjsd:''
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
        console.log(state.OrderList)
    },
    setOrderId(state,OrderId){
          state.OrderId = OrderId
    },
    setOrderDetail(state,OrderDetail){
        OrderDetail.update_time = OrderDetail.update_time.substring(0,10)
        state.OrderDetail = OrderDetail
    },
    setActivityList(state,List){
        state.ActivityList = List
    },
    setActivityDetail(state,Detail){
        state.ActivityDetail = Detail
    },
    setTopBarShow(state,ChangeShow){
      state.TopBarCityShow = ChangeShow
    },
    setBjsd(state,data){
      state.bjsd = data
    },
    setWjsd(state,data){
      state.wjsd = data
    },
    setWfbd(state,data){
      state.wfbd = data
    },
  },
  actions: {
    getUserTitle(context,data){
      context.commit('setUserTitle',data)
    },
    getHasSrh(context,data){
      context.commit('setHasSrh',data)
    },
    getHomeCategory(context){
        axios.get('/index/all_cate')
            .then(function (response) {
                var HomeCate = []
                var CateRes = response.data.data.cate
                for(var i in CateRes){
                    HomeCate.push({Name:CateRes[i].name,Image:CateRes[i].id + '.png',SecCate:CateRes[i].son})
                }
                context.commit('setHomeCategory',HomeCate)
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
            type: Getobject.type
            })
            .then(function (response) {
                var OrderList = response.data.data.order_list
                context.commit('setOrderList',OrderList)
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
            console.log(detail)
            context.commit('setOrderDetail',detail)
        })
        .catch(function (error) {
            console.log(error)
        })
     },
    getActivityList(context,type){
          axios.post('/activity/index',{
              type:type  //0为进行中，1为长期，2为已过期，默认传0
          })
              .then(function (response) {
                  var ActivityList = response.data.data
                  context.commit('setActivityList',ActivityList)
              })
              .catch(function (error) {
                  console.log(error)
              });
     },
    getActivityDetail(context,id){
        axios.post('/activity/index',{
            id:id  //0为进行中，1为长期，2为已过期，默认传0
        })
            .then(function (response) {
                var ActivityDetail = response.data.data
                context.commit('setActivityDetail',ActivityDetail)
            })
            .catch(function (error) {
                console.log(error)
            });
    },
    getWfbd(context,type){
      var data={
        type
      }
      axios.post(
        '/order/release_order',
        data,
        {
          headers:{
            token:window.sessionStorage.getItem('token')
          }
        }
      ).then(res=>{
        var data =res.data;
        console.log(data);
      })
    },
    getWjsd(context,type){
      var data={
        type
      }
      axios.post(
        '/order/received',
        data,
        {
          headers:{
            token:window.sessionStorage.getItem('token')
          }
        }
      ).then(res=>{
        var data =res;
        console.log(data);
      })
    },
    getBjsd(context,type){
      var data={
        type
      }
      axios.post(
        '/order/be_received',
        data,
        {
          headers:{
            token:window.sessionStorage.getItem('token')
          }
        }
      ).then(res=>{
        var data =res.data.data;
        console.log(data);
      })
    }
  }
})
