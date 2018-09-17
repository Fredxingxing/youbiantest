<template>
    <div class="main">
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="">
        </div>
        <div class="iptbox">
            <input type="text" v-model="phone" placeholder="手机号/用户名">
        </div>
        <div class="iptbox">
            <input type="text" v-model="checknum" placeholder="输入验证码" ><button class='repwd' :disabled="disabled" @click='getCheck'>{{check}}</button>
        </div>
         <div class="iptbox">
            <input type="password" v-model="password" placeholder="设置密码">
        </div>
         <div class="iptbox">
            <input type="password" v-model="repassword" placeholder="确认密码">
        </div>
        <button class='login' @click='repwd'>重置密码</button>
        <div class="register" @click="GoTologin">登录/注册</div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                phone:'',
                password:'',
                repassword:'',
                checknum:'',
                disabled:false,
                check:'获取验证码'
            }
        },
        methods:{
             GoTologin(){
                this.$router.push('/other/login')
             },
             getCheck(){
                 Toast({
                     message: '已发送',
                     position: 'middle',
                     duration: 1000
                 });
                var data = {
                    phone:this.phone
                }
                this.$axios.post(
                    '/member/sendSms',
                    data
                ).then(res=>{
                    console.log(res)
                })
                var time = 60;
                var timer = setInterval(()=>{    
                    time--;
                    this.check = time + "秒后重试";
                    this.disabled = true;
                    if (time==0) {
                    clearInterval(timer); 
                    this.check = "获取验证码";
                    this.disabled = false;
                    }
                },1000);
            },
            repwd(){
                var data = {
                    phone:this.phone,
                    code:this.checknum,
                    password:this.password,
                    password_confirm:this.repassword
                }
                console.log(data)
                this.$axios.post(
                    '/member/retrieve_password',
                    data
                ).then(res=>{
                    Toast({
                        message: res.data.message,
                        position: 'middle',
                        duration: 1000
                    });
                })
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','忘记密码')
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
            border:0;
            background-color: #fff;

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
        width: 50%;
        margin-left: 50%;
        height: 5%;
    }
}
</style>

