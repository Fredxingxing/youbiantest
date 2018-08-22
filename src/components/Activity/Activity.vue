<template>
    <div id="Activity" class="Activity">
        <div class="ActivityTitle">
            <div class="Title">活动专区</div>
        </div>
        <ActivitySwiper/>
        <ActivityNavbar/>
        <div style="height: 1.4rem"> </div>
        <bottom-bar/>
    </div>
</template>

<script>
    import ActivitySwiper from './ActivitySwiper'
    import ActivityNavbar from './ActivityNavbar'
    import bottomBar from '../bottomBar'
    export default {
        name: "Activity",
        components:{
           ActivitySwiper,
           ActivityNavbar,
           bottomBar
        }
    }
</script>

<style scoped>
.Activity{
        display: flex;
        width: 7.50rem;
        flex-direction: column;
        background: #ffffff;
}
.ActivityTitle{
    width: 7.50rem;
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