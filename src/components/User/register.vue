<template>
    <div class="main">
        <div class="logo">
            <img src="../../assets/img/logo.png" alt="">
        </div>
        <div class="iptbox">
            <input type="text" v-model="username" placeholder="用户名">
        </div>
        <div class="iptbox">
            <input type="text" v-model="phone" placeholder="手机号">
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
        <button class='login' @click='register'>注册</button>
        <router-link tag='div' to='/other/login' class="register">已有账号？去登录</router-link>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                username:'',
                password:'',
                repassword:'',
                checknum:'',
                phone:'',
                disabled:false,
                check:'获取验证码'
            }
        },
        methods:{
            getCheck(){
                var data = {
                    phone:this.phone
                }
                console.log(this.phone)
                if(!this.phone){
                    Toast({
                        message: '手机号不能为空',
                        position: 'middle',
                        duration: 1000
                    });
                }
                else {
                    this.$axios.post(
                        '/member/sendSms',
                        data
                    ).then(res => {
                        console.log(res)
                        Toast({
                            message: '已发送',
                            position: 'middle',
                            duration: 1000
                        });
                    })
                    var time = 60;
                    var timer = setInterval(() => {
                        time--;
                        this.check = time + "秒后重试";
                        this.disabled = true;
                        if (time == 0) {
                            clearInterval(timer);
                            this.check = "获取验证码";
                            this.disabled = false;
                        }
                    }, 1000);
                }
            },
            register(){
                var data = {
                    name:this.username,
                    phone:this.phone,
                    password:this.password,
                    password_confirm:this.repassword,
                    code:this.checknum
                }
                this.$axios.post(
                    '/member/register',
                    data
                ).then(res=>{
                    console.log(res)
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 1000
                        });
                    if(res.data.code==200){
                        this.$router.push('/user')
                    }
                })
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','注册')
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
            background-color: #fff;
            border:0;
            outline: none;
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

