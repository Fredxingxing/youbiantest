import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      login:false,
      show:false,
      userTitle:'',
      HomeTabSelected:0,
      HomeCategory:[],
      HomeDetail:[],
      TopBarCityShow:false,
  },
  mutations: {
    setUserTitle(context,data){
      console.log(data)
      this.state.userTitle = data;
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
    }
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
  }
})
