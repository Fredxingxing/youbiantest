import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      login:false,
      show:false,
      userTitle:''
  },
  mutations: {
    setUserTitle(context,data){
      console.log(data)
      state.userTitle = data;
    }
  },
  actions: {
    getUserTitle(context,data){
      context.commit('setUserTitle',data)
    }
  }
})
