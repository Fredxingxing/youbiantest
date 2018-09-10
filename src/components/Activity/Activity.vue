<template>
    <div id="Activity" class="Activity">
        <div class="ActivityTitle">
            <div class="Title">活动专区</div>
        </div>
        <!--<ActivitySwiper/>-->
        <div class="fakebanner">
            <img style="height: 2.6rem;width: 100%;" :src="ActivityBanner.img">
        </div>
        <ActivityNavbar/>
        <div style="height: 1.05rem"> </div>
        <bottom-bar/>
    </div>
</template>

<script>
    import ActivitySwiper from './ActivitySwiper'
    import ActivityNavbar from './ActivityNavbar'
    import bottomBar from '../bottomBar'
    import { mapState } from 'vuex'
    export default {
        name: "Activity",
        components:{
           ActivitySwiper,
           ActivityNavbar,
           bottomBar
        },
        watch:{
            ActivityBanner:function (val) {
            },
        },
        computed:{
            ...mapState({
                ActivityBanner:'ActivityBanner',
            })
        },
        mounted(){

        },
    }
</script>

<style scoped>
.Activity{
        display: flex;
        width: 100%;
        flex-direction: column;
        background: #ffffff;
}
.ActivityTitle{
    width: 100%;
    height: .80rem;
    background: #FCA62F;
    font-size: 0.40rem;
    color: #ffff;
    text-align: center;
}
.Title{
    margin-top: .1rem;
}
</style>