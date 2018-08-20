<template>
    <div class="other">
        <header>
            <i class='iconfont icon-left'>{{title}}</i>
        </header>
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

</style>
