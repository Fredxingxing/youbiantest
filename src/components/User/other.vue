<template>
    <div class="other">
        <div class='header'>
            <i class='iconfont icon-left'>{{title}}</i>
        </div>
        <router-view>

        </router-view>
    </div>
</template>
<script>
    export default{
        computed:{
            title:function(){
                return this.$store.state.userTitle
            }
        }
    }
</script>
<style lang="less" scoped>
.other{
    .header{
        height: 2.8rem;
        background-color: #FCA62F;
    }
}
</style>
