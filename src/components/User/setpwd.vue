<template>
    <div class="main">
        <div class="iptbox">
            <div class="left">
                用户名：
            </div>
            {{username}}
        </div>
        <div class="iptbox">
            <div class="left">
                <span class='color-FCA62F'>*</span> 旧密码：
            </div>
            <input type="password" placeholder="请输入旧密码">
        </div>
        <div class="iptbox">
            <div class="left">
                <span class='color-FCA62F'>*</span>新密码：
            </div>
            <input type="password" placeholder="请输入旧密码">
        </div>
        <div class="iptbox">
            <div class="left">
                <span class='color-FCA62F'>*</span>确认新密码：
            </div>
            <input type="password" placeholder="请输入旧密码">
        </div>
        <button class="reset">保存</button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                username:window.sessionStorage.getItem('username')
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','密码设置')
            this.$store.dispatch('getHasSrh',false)
        }
    }
</script>
<style lang="less" scoped>
.main{
    height: calc(100vh - 0.8rem);
    background: #fff;
    padding:0 .6rem;
    .name{

    }
    .iptbox{
        height: 0.8rem;
        line-height: .8rem;
        .left{
            display: inline-block;
            text-align: right;
            width: 2.4rem;
        }
        input{
            height: 0.6rem;
            border-radius:.06rem;
            border:.02rem solid #eaeaea;
            text-indent: .1rem;
        }
    }
    .reset{
        display: block;
        margin:auto;
        margin-top:.5rem;
        width: 6rem;
        height: 0.7rem;
        background-color: #DD5519;
        color:#fff;
        border-radius:.1rem;
        border:0;
        font-size:.32rem;
    }
}
</style>

