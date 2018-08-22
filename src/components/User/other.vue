<template>
    <div class="other">
        <div class='header'>
            <i class='iconfont icon-Left font-16' @click='back'></i> {{title}}
            <div class='srh' v-if="hasSrh">
                <i class='iconfont icon-search'></i>
                <input type="text" placeholder="输入订单号" @keyup.enter="search">
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
            },
            hasSrh(){
                return this.$store.state.hasSrh
            }
        },
        methods:{
            back:function(){
                this.$router.push('/user');
            },
            search(){
                var path= this.$route.path.replace("/other/",'');
                if(path=='bjsd'){
                    alert('回车键被打了,现在的路由是'+path);
                }else if(path=='wjsd'){
                    alert('回车键被打了,现在的路由是'+path);
                }
            }
        },
        created(){
            var token = window.sessionStorage.getItem('token');
            if(!token){
                this.$router.push('/other/login')
            }
        },
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
        .srh{
            color:#727272;
            margin-top:.16rem;
            margin-right:.2rem;
            padding:0 .1rem;
            line-height: .5rem;
            height: 0.5rem;
            width:2rem;
            float: right;
            border-radius:.06rem;
            background-color: #fff;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            input{
                border:0;
                background-color: #fff;
            }
        }
    }
}
</style>
