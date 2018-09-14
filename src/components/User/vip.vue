<template>
    <div class="main">
        <div class="czbox">
            <div class="type" :class='{isActive:type==0}' @click='change(0,vip.rule[0].now_price)'>
                <p>
                    {{vip.rule[0].member_time}}VIP会员
                </p>
                <p>
                    <span class='nowprice'>{{vip.rule[0].now_price}}</span>
                    <span class='oldprice'>{{vip.rule[0].old_price}}</span>
                </p>
                <p v-if="vip.rule[0].now_price!=vip.rule[0].old_price" class='font-12'>
                    【立省】 {{vip.rule[0].discount}}积分
                </p>
            </div>
             <div class="type" :class='{isActive:type==1}' @click='change(1,vip.rule[1].now_price)'>
                <p>
                    {{vip.rule[0].member_time}}VIP会员
                </p>
                <p>
                    <span class='nowprice'>{{vip.rule[1].now_price}}</span>
                    <span class='oldprice'>{{vip.rule[1].old_price}}</span>
                </p>
                <p v-if="vip.rule[1].now_price!=vip.rule[1].old_price" class='font-12'>
                    【立享】 {{vip.rule[1].discount}}折优惠
                </p>
            </div>
             <div class="type" :class='{isActive:type==2}' @click='change(2,vip.rule[2].now_price)'>
                <p>
                    {{vip.rule[2].member_time}}VIP会员
                </p>
                <p>
                    <span class='nowprice'>{{vip.rule[2].now_price}}</span>
                    <span class='oldprice'>{{vip.rule[2].old_price}}</span>
                </p>
                <p v-if="vip.rule[2].now_price!=vip.rule[2].old_price" class='font-12'>
                    【立享】 {{vip.rule[2].discount}}折优惠
                </p>
            </div>
             <div class="type" :class='{isActive:type==3}' @click='change(3,vip.rule[3].now_price)'>
                <p>
                    {{vip.rule[3].member_time}}VIP会员
                </p>
                <p>
                    <span class='nowprice'>{{vip.rule[3].now_price}}</span>
                    <span>积分</span>
                </p>
                <p v-if="vip.rule[3].now_price!=vip.rule[3].old_price" class='font-12'>
                    【立省】 {{vip.rule[3].discount}}积分
                </p>
            </div>
        </div>
        <div class="static">
            <p class='static-content'>
                1、积分提现唯一途径为支付宝交易。
            </p>
            <p class='static-content'>
                2、“可提金额” 为用户最大可提金额。
            </p>
            <p class='static-content'>
                3、“提现积分” 处填写本次提现金额。
            </p>
        </div>
        <button class='czbtn' @click='cz'>确认支付{{points}}积分</button>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                points:88,
                type:0
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','优便会员')
            this.$store.dispatch('getHasSrh',false);
            this.$store.dispatch('getVip');
        },
        computed:{
            vip(){
                return this.$store.state.vip;
            }
        },
        methods:{
            cz(){
                var data = {
                    member_time:this.type,
                    now_price:this.points
                }
                var _this = this
                this.$axios.post(
                   '/user/open_members',
                    data,
                    {
                        headers:{
                            token:window.sessionStorage.getItem('token')
                        }
                    }
                ).then(res=>{
                    console.log(res)
                    Toast({
                        message: res.data.message,
                        position: 'middle',
                        duration: 2000
                    });
                    if(res.data.code==200) {
                        setTimeout(function () {
                            _this.$router.go(-1)
                        }, 500)
                    }
                })
            },
            change(num,price){
                this.type=num
                this.points = price;
            }
        }
    }
</script>
<style lang="less" scoped>
.isActive{
    background: linear-gradient(to bottom, #FF9D54 , #FA3B33);
    color:#fff!important;
}
.main{
    height: calc(100vh - 0.8rem);
    background: #fff;
    .czbox{
        background-color: #ffffff;
        display:flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding:1rem 0 .4rem;
        .type{
            width: 2.5rem;
            height: 1.3rem;
            box-shadow: 2px 2px 5px #888888;
            margin-bottom:.4rem;
            background-color: #F2F2F2;
            color:#dd5519;
            text-align: center;
            padding:.2rem;
            .oldprice{
                font-size:.1rem;
                text-decoration: line-through;
                margin-left:.1rem;
                line-height: .6rem;
            }
            .nowprice{
                font-size:.4rem;
                line-height: .6rem;
            }
        }
    }
    .static{
        padding:0 .4rem;
        font-size:.2rem;
    }
    .czbtn{
        display: block;
        margin:auto;
        width: 6rem;
        border-radius:.1rem;
        border:0;
        color:#fff;
        height: 0.6rem;
        margin-top:1rem;
        background: linear-gradient(to right, #FF9D54 , #FA3B33);
    }
}
</style>

