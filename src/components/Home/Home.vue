<template>
    <div id="Home" class="Home">
        <topBar/>
        <div v-show="this.$store.state.HomeTabSwiperShow">
        <HomeTab/>
        <div class="SwiperContainer" style="height: 4rem;">
            <HomeSwiper/>
        </div>
        <HomePopular/>
        <HomeOrder/>
          <bottomBar/>
        </div>
    </div>
</template>

<script>
    import HomeTab from './HomeTab'
    import HomeSwiper from './HomeSwiper'
    import topBar from '../topBar'
    import bottomBar from '../bottomBar'
    import HomeHot  from './HomeHot'
    import HomeOrder from './HomeOrder'
    import HomePopular from './HomePopular'
    import { mapState } from 'vuex'
    import { Indicator } from 'mint-ui';
    export default {
        name: "Home",
        components:{
            HomeHot,
            topBar,
            HomeTab,
            HomeSwiper,
            HomeOrder,
            bottomBar,
            HomePopular
        },

        watch: {
            TopBarCityShow: function (val) {
                //do method again
            },
        },
        mounted(){
          this.$store.commit('setHomeTabSwiperShow',true)
        },
        computed:{
            ...mapState({
                TopBarCityShow:'TopBarCityShow',
                SearchResult:'SearchResult'
            })
        },
    }
</script>

<style scoped>
.Home{
    display: flex;
    width: 100%;
    padding-bottom: 1.05rem;
    flex-direction: column;
}
.blank{
    width: 7.50rem;
    height: .10rem;
    background: #F2F2F2;
}
</style>