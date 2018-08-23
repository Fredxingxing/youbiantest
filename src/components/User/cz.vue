<template>
    <div class="main">
        <div class="qrcode">
            <img src="../../assets/img/pay-qrcode.png" alt="">
        </div>
        <div class="tip">
            <i class='iconfont icon-warning icon'></i>扫码转账需备注手机号
        </div>
        <div class="czbox">
            充值金额： <input type="text" class='czipt ' placeholder="单行输入" v-model="recharge">
        </div>
        <div class="static">
            <p class='static-title'>积分充值说明：</p>
            <p class='static-content'>
                1、积分充值唯一途径为支付宝转账。
            </p>
            <p class='static-content'>
                2、用户打开支付宝扫描上方二维码，等价输入所需充值金额，并备注所充值账户手机号等价输入所属。
            </p>
            <p class='static-content'>
                3、转账成功后，后台审核通过，即转账到指定账户,等价输入所属。
            </p>
        </div>
        <button class='czbtn' @click='chongzhi'>已转账</button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                 recharge:'',
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','积分充值')
            this.$store.dispatch('getHasSrh',false)
        },
        methods:{
            chongzhi(){
                var data = {
                    recharge : this.recharge
                }
                this.$axios.post(
                    '/money/recharge',
                    data,
                    {headers:{token:window.sessionStorage.getItem('token')}}
                ).then(res=>{
                    if(res.data.code==400){

                    }else{
                         alert('success')
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
.icon{
    color:#f00;
}
.main{
    height: calc(100vh - 0.8rem);
    background: #fff;
    padding:0 .6rem;
    .qrcode{
        width: 2rem;
        margin:auto;
        img{
            margin:.4rem 0 .2rem 0;
            width: 100%;
        }
    }
    .tip{
        text-align: center;
        font-size:.2rem;
    }
    .czbox{
        padding:0 .6rem;
        margin:.4rem 0;
        font-size:.2rem;
        input{
            width: 2rem;
            height: 0.4rem;
            border-radius:.1rem;
            border:.02rem solid #eaeaea;
            text-indent: .06rem;
            font-size:.2rem;
        }
    }
    .static{
        font-size:.2rem;
        padding:0 .6rem;
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

