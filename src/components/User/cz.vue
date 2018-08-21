<template>
    <div class="main">
        <div class="top">

        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','充值')
        }
    }
</script>
<style lang="less" scoped>
.main{
    height: calc(100vh - 0.8rem);
    background: #fff;
    padding:0 .6rem;
}
</style>

