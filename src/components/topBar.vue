<template>
    <div class="TopBar">
      <div class="City" v-if="TopBarCityShow === true">
          <div class="CityName" v-on:click="chooseCity">{{showCity.city}}</div>
          <i class="iconfont icon-jiantou" style="color: white"></i>
          <!--<div class="slayer" v-show="SelectCity">-->
              <!--<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>-->
          <!--</div>-->
          <van-popup v-model="SelectCity" position="bottom" :overlay="true">
              <van-area  :area-list="areaList" :columns-num="2" @confirm="CitySelected" @cancel="CityCancel" />
          </van-popup>
      </div>
        <div class="City" v-if="TopBarCityShow === false" v-on:click="Back()">
        <i class="iconfont icon-Left Back" ></i>
    </div>
      <div class="Search">
          <mt-search  class="Searchcontainer" v-model="InputSearch">
              <mt-cell v-for="(item,index) in SearchResult" :title="item.title" :value="item.price+'积分'"
              v-on:click.native="GoToOrder(index)">
              </mt-cell>
          </mt-search>
          <!--<div class="Searchcontainer">-->
             <!--<i class="iconfont icon-search" style="margin-top: 0.1rem;"></i>-->
             <!--<input type="search" class="SearchInput mint-searchbar-core" v-model="InputSearch" placeholder="文献翻译">-->
          <!--</div>-->
          <div class="mint-search-list Searchdropdown" style="display: none;">
              <div class="mint-search-list-warp"></div>
          </div>
      </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import areaList from'../util/area'
    export default {
        name: "topBar",
        data(){
          return{
              InputSearch:'',
              SearchObject:{},
              SelectCity:false,
              showCity:{
                  'city':"武汉市"
              },
              areaList:areaList
          }
        },
        filters:{
            cityName:function (val) {

            }
        },
        watch:{
            TopBarCityShow:function (val) {
                //do method again
            },
            InputSearch:function (val) {
                console.log(val)
                this.SearchObject.searchtop = val
                this.$store.dispatch('getTopSearch',this.SearchObject)
                if(val ==''){
                    this.$store.commit('setHomeTabSwiperShow',true)
                }
                else{
                    this.$store.commit('setHomeTabSwiperShow',false)
                }
            },
            SearchResult:function (val) {
                console.log(val)
            }
        },
        computed:{
            ...mapState({
                TopBarCityShow:'TopBarCityShow',
                SearchResult:'SearchResult'
            })
        },
        mounted(){
        },
        methods:{
            Back:function(){
                if(this.$route.name === 'HomeTabDetail'){
                     this.$router.push('/Home')
                }
                if(this.$route.name === 'OrderList'){
                 //   this.$router.push('/HomeTabDetail')
                    this.$router.go(-1)
                }
            },
            GoToOrder:function (index) {
                this.$router.push({path:'/OrderDetail', query:{OrderId:this.$store.state.SearchResult[index].id}})
            },
            chooseCity(){
                this.SelectCity = true
            },
            CitySelected(data){
                console.log(data)
                this.showCity.city = data[1].name
                this.SelectCity =false
            },
            CityCancel(){
                this.SelectCity =false
            }
            // onSelected(data) {
            //     this.showCity.city = data.city.value
            //     console.log(data)
            //     this.SelectCity = false
            //
            // },
        },
    }
</script>

<style scoped>
  .TopBar{
      width: 100%;
      height: .80rem;
      display: flex;
      justify-content: space-evenly;
      background: #FCA62F;
  }
  .City{
      flex-direction: row;
      display: flex;
      align-items: baseline;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  .CityName{
      color: white;
      margin-top: .20rem;
      font-size: .28rem;
}
  .Search{
      width: 6.15rem;
      /*z-index: 999;*/
      /*height: .50rem;*/
      /*background: white;*/
      /*margin-top: .18rem;*/
      /*border-radius: .1rem;*/
      /*display: flex;*/
      /*justify-content: space-evenly;*/
      /*box-shadow: 0px 1px 3px #A56D1F;*/
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
  .cityName{
      height: 60%;
      border-radius: 0.05rem;
      border: 0.01rem solid #E2E2E2;
      background: #F4F4F4;
      width: 5rem;
      margin-left: 0.2rem;
      padding-left: 0.1rem;
      overflow: hidden;
      line-height: .5rem;
  }
  .slayer{
      position: absolute;
      width: 100%;
      /* height: 100%; */
      /* float: right; */
      top: 0;
       /*margin-left: -.06rem;*/
      /* padding-left: 1.5rem; */
      padding-top: .8rem;
      background: #9999;
      padding-bottom: 13rem;
      z-index: 5;
  }
</style>