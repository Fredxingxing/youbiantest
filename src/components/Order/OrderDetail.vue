<template>
    <div class="OrderDetail">
        <div class="TopBar"  v-on:click="Back()">
                <i class="iconfont icon-Left Back FontSize" ></i>
                <div class="FontSize" >&nbsp详情</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        methods:{
            Back:function () {
                this.$router.go(-1)
            }
        },
    }
</script>

<style scoped>
.OrderDetail{
    display: flex;
    flex-direction: column;
}
.TopBar{
    height: .8rem;
    display: flex;
    background: #FCA62F;
}
.Back{
    margin-left: 0.3rem;
}
.FontSize{
    font-size: 0.32rem;
    color: #ffff;
    line-height: 0.8rem;
}
</style>