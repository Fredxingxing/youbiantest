<template>
    <div class="TopBar">
      <div class="City" v-if="TopBarCityShow === true">
          <div class="CityName">武汉</div>
          <i class="iconfont icon-jiantou" style="color: white"></i>
      </div>
        <div class="City" v-if="TopBarCityShow === false" v-on:click="Back()">
        <i class="iconfont icon-Left Back" ></i>
    </div>
      <div class="Search">
           <i class="iconfont icon-search" style="margin-top: 0.1rem;"></i>
          <input class="SearchInput" v-model="InputSearch" placeholder="文献翻译">
      </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "topBar",
        data(){
          return{
              InputSearch:'',
              SearchObject:{},
          }
        },
        watch:{
            TopBarCityShow:function (val) {
                //do method again
            },
            InputSearch:function (val) {
                console.log(val)
                this.SearchObject.searchtop = val
                this.$store.dispatch('getTopSearch',val)
            }
        },
        computed:{
            ...mapState({
                TopBarCityShow:'TopBarCityShow'
            })
        },
        methods:{
            Back:function(){
                if(this.$route.name === 'HomeTabDetail'){
                     this.$router.push('/Home')
                }
                if(this.$route.name === 'OrderList'){
                    this.$router.push('/HomeTabDetail')
                }
            },
        },
    }
</script>

<style scoped>
  .TopBar{
      width: 7.50rem;
      height: .80rem;
      display: flex;
      justify-content: space-evenly;
      background: #FCA62F;
  }
  .City{
      flex-direction: row;
      display: flex;
      align-items: baseline;
  }
  .CityName{
      color: white;
      margin-top: .20rem;
      font-size: .35rem;
}
  .Search{
      width: 6.15rem;
      height: .50rem;
      background: white;
      margin-top: .18rem;
      border-radius: .1rem;
      display: flex;
      justify-content: space-evenly;
      box-shadow: 0px 1px 3px #A56D1F;
  }
  .SearchInput{
      width: 5.00rem;
      height: .45rem;
      font-size: .28rem;
      border: 0;
      outline: none;
  }
  .Back{
      color: white;
      font-size: 0.5rem;
      line-height: .8rem;
  }
</style>