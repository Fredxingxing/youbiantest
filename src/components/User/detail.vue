<template>
    <div class="main">
        <ul class="title">
            <li>
                来源/用途
            </li>
            <li>
                积分变化
            </li>
            <li>
                时间
            </li>
            <li>
                备注
            </li>
        </ul>
        <ul class="list">
            <li v-for="(item,key) in integral" :key=key>
                <ul class='item'>
                    <li style="text-align: left; margin-left: 0.3rem;">
                        <img src='../../assets/img/icon-cz.png' v-if="item.status==0||item.status==5||item.status==6">
                        <img src='../../assets/img/icon-tx.png' v-if="item.status==1">
                        <img src='../../assets/img/icon-jl.png' v-if="item.status==2">
                        <img src='../../assets/img/icon-wfbd.png' v-if="item.status==3">
                        <img src='../../assets/img/icon-wjsd.png' v-if="item.status==4">
                        <span >{{PointSource[item.status]}}</span>
                    </li>
                    <li :class='{decrease:item.status==1||item.status==3,add:item.status==2||item.status==4}'>
                      <span v-if="item.status==0||item.status==2||item.status==4">+</span>
                      <span v-else>-</span>
                        {{item.recharge}}
                    </li>
                    <li>
                        {{item.update_time.substring(0,10)}}
                    </li>
                    <li>
                        {{item.content}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                PointSource:['充值','提现','奖励','发布订单','接单完成','开通会员','会员续期']
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','积分明细')
            this.$store.dispatch('getHasSrh',false);
            this.$store.dispatch('getIntegral');
        },
        computed:{
            integral(){
                return this.$store.state.integral
            }
        },
    }
</script>
<style lang="less" scoped>
.decrease{
    color:#FFAA54
}
.add{
    color:#f00;
}
.main{
    min-height: calc(100vh - 0.8rem);
    background: #fff;
    .title{
        display: flex;
        justify-content: space-between;
        background-color: #E6E6E6;
        height: 0.6rem;
        line-height: .6rem;
        text-align: center;
        li{
            width: 25%;
        }
    }
    .item{
        font-size:.2rem;
        display: flex;
        justify-content: space-between;
        height: 0.7rem;
        line-height: .7rem;
        text-align: center;
        border-bottom:1px solid #eaeaea;
        li{
            width: 25%;
            img{
                width: 0.4rem;
                vertical-align: middle;
                margin-right:.1rem;
            }
        }
    }
}
</style>

