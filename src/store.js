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
      TopBarCityShow:false,
      //个人中心头部标题
      userTitle:'',
      //订单管理:''
      wfbd:'',
      wjsd:'',
      bjsd:''
  },
  mutations: {
    setUserTitle(state,data){
      console.log(data)
      state.userTitle = data;
    },
    HomeTabSelected(state,SelectedId){
      state.HomeTabSelected = SelectedId
      state.HomeDetail = state.HomeCategory[state.HomeTabSelected].SecCate
        console.log(state.HomeDetail)
    },
    setHomeCategory(state,HomeCate){
     state.HomeCategory = HomeCate
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
    getHomeCategory(context){
      console.log("im in getHomeCategory")
        axios.get('/index/all_cate')
            .then(function (response) {
                var HomeCate = []
                var CateRes = response.data.data.cate
                for(var i in CateRes){
                    HomeCate.push({Name:CateRes[i].name,Image:CateRes[i].id+'.png',SecCate:CateRes[i].son})
                }
                context.commit('setHomeCategory',HomeCate)
                context.commit('HomeTabSelected',0)
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
