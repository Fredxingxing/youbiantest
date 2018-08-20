<template>
    <div id="Home" class="Home">
        <topBar/>
        <HomeTab/>
          <div class="SwiperContainer" style="height: 4rem;">
        <HomeSwiper/>
          </div>
        <HomeHot/>
        <div class="blank">
        </div>
        <HomeOrder/>
        <bottomBar/>
    </div>
</template>

<script>
    import HomeTab from './HomeTab'
    import HomeSwiper from './HomeSwiper'
    import topBar from '../topBar'
    import bottomBar from '../bottomBar'
    import HomeHot  from './HomeHot'
    import HomeOrder from './HomeOrder'
    export default {
        name: "Home",
        components:{
            HomeHot,
            topBar,
            HomeTab,
            HomeSwiper,
            HomeOrder,
            bottomBar
        }
    }
</script>

<style scoped>
.Home{
    display: flex;
    width: 7.50rem;
    height: 32.87rem;
    flex-direction: column;
}
.blank{
    width: 7.50rem;
    height: .10rem;
    background: #F2F2F2;
}
</style>