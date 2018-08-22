<template>
    <div class="other">
        <div class='header'>
            <i class='iconfont icon-Left font-16' @click='back'></i> {{title}}
            <div class='srh'>

            </div>
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
        },
        methods:{
            back:function(){
                this.$router.push('/user');
            }
        },
        created(){
            var token = window.sessionStorage.getItem('token');
            if(!token){
                this.$router.push('/other/login')
            }
        }
    }
</script>
<style lang="less" scoped>
.other{
    .header{
        height: .8rem;
        background-color: #FCA62F;
        line-height: .8rem;
        font-size:.32rem;
        color:#fff;
        padding-left:.3rem;
    }
}
</style>
