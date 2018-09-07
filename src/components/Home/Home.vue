<template>
    <div id="Home" class="Home">
        <topBar/>
        <HomeTab/>
          <div v-show="this.$store.state.HomeTabSwiperShow" class="SwiperContainer" style="height: 4rem;">
        <HomeSwiper/>
          </div>
        <HomePopular/>
        <HomeOrder/>
        <div>
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
        }
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