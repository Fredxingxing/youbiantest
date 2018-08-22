<template>
    <div class="bottomBar">
        <router-link to="/Home" tag="div" active-class="iconActive">
        <div class="item">
            <i class="iconfont icon-home"></i>
            <div>首页</div>
        </div>
        </router-link>
        <router-link to="/Activity" tag="div" active-class="iconActive">
        <div class="item">
            <i class="iconfont icon-hot"></i>
            <div>活动</div>
        </div>
        </router-link>
        <router-link to="/List" tag="div" active-class="iconActive">
        <div class="item">
            <i class="iconfont icon-diamond"></i>
            <div>榜单</div>
        </div>
        </router-link>
        <router-link to="/User" tag="div">
        <div class="item">
            <i class="iconfont icon-myselected"></i>
            <div>我的</div>
        </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "bottomBar"
    }
</script>

<style scoped>
.bottomBar{
    display: flex;
    width:7.50rem;
    height: 1.05rem;
    justify-content: space-around;
    background: #ffff;
    font-size: .25rem;
    color:#707070;
    box-shadow: .01rem -.02rem .01rem 0rem #bbbbbb;
    position:fixed;
    bottom:0;
    z-index: 1;
}
.iconfont{
    font-size: .40rem;
}
.iconActive{
    color: darkorange;
}
/*.iconfont:hover{*/
   /*color: darkorange;*/
/*}*/
.item{
   margin-top: .10rem;
   margin-bottom: .05rem;
    text-align: center;
}


</style>