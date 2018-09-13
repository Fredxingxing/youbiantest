<template>
    <div class="main">
        <div class="czbox">
            <p>
                　可提金额：<span class='points color-FCA62F font-16 fat'>{{point}}</span> 积分
            </p>
            　  <span class='left'>提现积分：</span><input type="text" class="czipt" placeholder="请输入数值" v-model='recharge'><br />
                <span class='left'>支付宝账号：</span><input type="text" class="czipt" placeholder="单行输入" v-model='alipay'><br />
            　  <span class='left'>真实姓名：</span><input type="text" class="czipt" placeholder="单行输入" v-model="rel_name">
        </div>
        <div class="static">
            <p class='static-title'>积分提现说明：</p>
            <p class='static-content'>
                1、积分提现唯一途径为支付宝交易。
            </p>
            <p class='static-content'>
                2、“可提金额” 为用户最大可提金额。
            </p>
            <p class='static-content'>
                3、“提现积分” 处填写本次提现金额。
            </p>
            <p class='static-content'>
                4、“支付宝账号” 处填写本次提现金额到账支付宝账户。
            </p>
            <p class='static-content'>
                5、“真实姓名” 处填写本次提现金额到账支付宝账户真实用姓名。
            </p>
            <p class='static-content'>
                6、提交成功后，后台审核通过，即转账到指定账户。
            </p>
        </div>
        <button class='czbtn' @click='tixian'>确认提现</button>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                 alipay:'',
                recharge:'',
                rel_name:'',
                point:window.sessionStorage.getItem('point')
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','积分提现')
            this.$store.dispatch('getHasSrh',false)
        },
        methods:{
            tixian(){
                var data= {
                    alipay:this.alipay,
                    recharge:this.recharge,
                    rel_name:this.rel_name
                }
                var _this = this
                this.$axios.post(
                    '/money/withdrawal',
                    data,
                    {headers:{token:window.sessionStorage.getItem('token')}}
                ).then(res=>{
                    if(res.data.code==400){
                        Toast({
                            message: res.data.message,
                            position: 'middle',
                            duration: 4000
                        });
                    }else{
                        Toast({
                            message: res.data.message,
                            position: 'middle',
                            duration: 4000
                        });
                        setTimeout( function () {
                            _this.$router.go(-1)
                        },1000)
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
.main{
    height: calc(100vh - 0.8rem);
    background: #fff;
    .czbox{
        border-bottom:.02rem solid #eaeaea;
        padding:.8rem;
        line-height: .6rem;
        .czipt{
             width: 3rem;
            height: 0.4rem;
            border-radius:.1rem;
            border:.02rem solid #eaeaea;
            text-indent: .06rem;
            font-size:.2rem;
        }
        .left{
            display: inline-block;
            width: 1.8rem;
            text-align: right;
        }
    }
    .static{
        padding:.8rem;
        font-size:.2rem;
    }
    .czbtn{
        display: block;
        margin:auto;
        width: 6rem;
        border-radius:.1rem;
        border:0;
        background-color: #dd5519;
        color:#fff;
        height: 0.6rem;
        margin-top:1rem;
    }
}
</style>

