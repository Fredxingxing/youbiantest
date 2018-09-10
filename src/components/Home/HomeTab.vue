<template>
    <div id="HomeTab" class="HomeTab">
     <div class="HomeTab HomeCate">
         <router-link :to="{path:'/HomeTabDetail',query:{id:item.Id}}" tag="span" class="cate" v-for="(item,index) in HomeCategory"
                      v-on:click="ToTabDetail(index)">
         <img  class="CateImage" :src="imgUrl(item.Image)">
         <div>{{item.Name}}</div>
         </router-link>
     </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    var images = require.context('../../assets/HomeCate/',false,/\.png$/)
    export default {
        name: "HomeTab",
        data(){
            return{
               TabDetailPath:'/'
            }
        },
        created:function(){
            this.HomeTabView()
            this.$store.commit('setTopBarShow',true)
        },
        watch:{
          HomeCategory:function (val) {
              //do method again
          }
        },
        computed:{
            ...mapState({
                HomeCategory:'HomeCategory'
            })
        },
        methods:{
          HomeTabView:function () {
              this.$store.dispatch('getHomeCategory')
          },
          ToTabDetail(index){
          },
          imgUrl:function (path) {
                return images('./'+path)
          },
       },
    }
</script>

<style scoped>
.HomeTab{
    width: 100%;
    height: 3.50rem;
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    font-size: .25rem;
    background: #ffffff;
}
.HomeTab.HomeCate{

}
.CateImage{
    width: .75rem;
    height: .80rem;
}
.cate{
    width: 20%;
    height: 1.20rem;
    text-align: center;
 }
</style>