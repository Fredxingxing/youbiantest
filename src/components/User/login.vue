<template>
    <div class="main">
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="">
        </div>
        <div class="iptbox">
            <input type="text" v-model="username" placeholder="手机号/用户名">
        </div>
        <div class="iptbox">
            <input type="password" v-model="password" placeholder="输入密码"><router-link tag='span' to="/other/getlose" class='repwd'>忘记密码？</router-link>
        </div>
        <button class='login' @click='login'>登录</button>
        <router-link tag='div' to="/other/register" class="register">没有账号？去注册</router-link>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                username:'',
                password:'',
            }
        },
        methods:{
            login(){
                var data = {
                    phone:this.username,
                    password:this.password
                }
                this.$axios.post(
                    '/member/login',
                    data
                ).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        console.log(res.data)
                        window.sessionStorage.setItem('token',res.data.data.token);
                        window.sessionStorage.setItem('username',res.data.data.user.name);
                        window.sessionStorage.setItem('img',res.data.data.user.img)
                        window.sessionStorage.setItem('point',res.data.data.user.integral)
                        // this.$router.push({path:'/other/login',query:{OrderId:this.$route.query.OrderId}})
                        if(this.$route.query.OrderId != undefined){
                            this.$router.push({path:'/OrderDetail',query:{OrderId:this.$route.query.OrderId}})
                        }
                        if(this.$route.query.OrderId == undefined) {
                            this.$router.push('/user')
                        }
                    }else{
                        alert('账号或密码错误')
                    }
                })
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','登录')
            this.$store.dispatch('getHasSrh',false)
        }
    }
</script>
<style lang="less" scoped>
.main{
    height: calc(100vh - 0.8rem);
    background: #fff;
    padding:0 .6rem;
    .logo{
        padding:.3rem 0;
        width: 2rem;
        height: 1.2rem;
        margin:auto;
        img{
            width: 100%;
        }
    }
    .iptbox{
        border-bottom:.02rem solid #fca;
        padding:.2rem .4rem;
        input{
            border:0;
        }
        .repwd{
            font-size:.24rem;
            color:#727272;
            float: right;
        }
    }
    .login{
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
    .register{
        margin-top:.2rem;
        text-align: right;
        font-size:.28rem;
        color:#727272;
    }
}
</style>

