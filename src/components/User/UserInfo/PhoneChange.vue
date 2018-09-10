<template>
    <div class="PhoneChangeContainer">
       <div class="changebox">
           <div>新手机号：</div>
           <input style="height: .4rem;" placeholder="输入手机号" v-model="phonenum">
       </div>
        <div  class="changebox">
            <div style="width:1.6rem;text-align: right;">验证码：</div>
            <input style="height: .4rem;" placeholder="输入验证码" v-model="checknum">
            <button class='repwd' :disabled="disabled" @click='getCheck'>{{check}}</button>
        </div>
        <div class="ChangeInfo" @click='CommitInfo()'>
            提交信息
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "PhoneChange",
        data(){
            return{
                checknum:'',
                phonenum:'',
                check:'获取验证码',
                disabled:false,
            }
        },
        methods:{
            getCheck(){
                var data = {
                    phone:this.phonenum
                }
                console.log(this.phonenum)
                if(this.phonenum == ''){
                    Toast({
                        message: '请填写手机号',
                        position: 'middle',
                        duration: 4000
                    });
                }
                else {
                    this.$axios.post(
                        '/member/sendSms',
                        data
                    ).then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            Toast({
                                message: "发送成功",
                                position: 'middle',
                                duration: 4000
                            });
                        }
                        else {
                            Toast({
                                message: res.data.message,
                                position: 'middle',
                                duration: 4000
                            });
                        }
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
            CommitInfo:function(){
                if(this.phonenum === ''){
                    Toast({
                        message: '请填写手机号',
                        position: 'middle',
                        duration: 4000
                    });
                }
                else{
                    this.$axios.post('user/phone_edit',{
                        phone:this.phonenum,
                        code:this.checknum
                    },{
                        headers:{
                            'token':window.sessionStorage.getItem('token')
                        }})
                        .then(function (res) {
                            console.log(res)
                            Toast({
                                message: res.data.message,
                                position: 'middle',
                                duration: 4000
                            });
                        })
                }
            },
        },
    }
</script>

<style scoped>
    .PhoneChangeContainer{
        background: #fff;
        display: flex;
        flex-direction: column;
        height: 94vh;
    }
    .ChangeInfo{
        text-align: center;
        line-height: .7rem;
        display: block;
        margin:auto;
        margin-top:2.5rem;
        width: 6rem;
        height: 0.7rem;
        background-color: #DD5519;
        color:#fff;
        border-radius:.1rem;
        border:0;
        font-size:.32rem;
    }
    .changebox{
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: baseline;
        padding-top: 10%;
        font-size: .32rem;
    }
    .repwd{
        font-size: .12rem;
        float: right;
        background-color: #DC551B;
        color: #fff;
        border: 0;
        outline: none;
        position: absolute;
        left: 67%;
        margin-top: .08rem;
    }
</style>