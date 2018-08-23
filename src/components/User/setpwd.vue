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
            <input type="password" placeholder="请输入旧密码" v-model="password">
        </div>
        <div class="iptbox">
            <div class="left">
                <span class='color-FCA62F'>*</span>新密码：
            </div>
            <input type="password" placeholder="请输新密码" v-model="password2">
        </div>
        <div class="iptbox">
            <div class="left">
                <span class='color-FCA62F'>*</span>确认新密码：
            </div>
            <input type="password" placeholder="请确认新密码" v-model="password2_confirm">
        </div>
        <button class="reset" @click="setpwd">保存</button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                username:window.sessionStorage.getItem('username'),
                password:'',
                password2:'',
                password2_confirm:''
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','密码设置')
            this.$store.dispatch('getHasSrh',false)
        },
        methods:{
            setpwd(){
                var data={
                    password:this.password,
                    password2:this.password2,
                    password2_confirm:this.password2_confirm
                }
                this.$axios.post(
                    '/user/password_edit',
                    data,
                    {
                        headers:{
                            token:window.sessionStorage.getItem('token')
                        }
                    }
                ).then(res=>{
                    console.log(res)
                })
            }
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

