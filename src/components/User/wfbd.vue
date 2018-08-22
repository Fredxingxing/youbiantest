<template>
    <div class="main">
        <ul class="tabs">
            <li :class="{isActive:tabs==1}" @click='changeTab(1)'>待接单</li>
            <li :class="{isActive:tabs==2}" @click='changeTab(2)'>已接单</li>
            <li :class="{isActive:tabs==3}" @click='changeTab(3)'>已完成</li>
        </ul>
        <ul class="orderlist">
            <li>
                <div class="time-state">
                    <span class='time'>2016-02-09</span>
                    <span class='state color-FCA62F'>待接单</span>
                </div>
                <div class="info">
                    <div class="infoleft">
                        <div class='title'>标题啊实打实大声道阿萨德阿萨德阿萨德阿萨德</div>
                        <div class='type'><img src="../../assets/img/icon-type.png" alt="">同城便-同城便-同城便</div>
                        <div class="points">
                            120积分
                        </div>
                        <div class="sum">
                            <span class='color-FCA62F font-12'>已接单数：0</span>
                            <span class='color-85CCA1 font-12'>已通过数：0</span>
                        </div>
                    </div>
                    <div class="inforight">
                        <div class="num">
                            次数：1/10
                        </div>
                        <div class="cycle">
                            周期：一个月
                        </div>
                    </div>
                </div>
                <div class="operate">
                    <button class='del'>删除订单</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tabs:1
            }
        },
        methods:{
            changeTab(num){
                this.tabs=num;
                this.$store.dispatch('getWfbd',this.tabs)
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','我发布的')
            this.$store.dispatch('getHasSrh',false)
            this.$store.dispatch('getWfbd',this.tabs)
        }
    }
</script>
<style lang="less" scoped>
.isActive{
    border-bottom:.03rem solid #FCA62F; 
}

.main{
    .tabs{
        height: 0.8rem;
        line-height: .8rem;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        li{
            width: 1.2rem;
            text-align: center;
            font-size:.28rem;
        }
    }
    .orderlist{
        li{
            background-color: #fff;
            margin-top:.2rem;
            border-top:.02rem solid #eaeaea;
            border-bottom:.02rem solid #eaeaea;
            .time-state{
                font-size:.28rem;
                height: 0.8rem;
                line-height: .8rem;
                border-bottom:.02rem solid #eaeaea;
                .time{
                    float: left;
                    margin-left:.4rem;
                }
                .state{
                    float: right;
                    margin-right:.4rem;
                }
            }
            .info{
                height: 2.02rem;
                padding:.24rem .3rem;
                .infoleft{
                    float: left;
                    width: 4.6rem;
                    .title{
                        width: 4.6rem;
                        font-size:.28rem;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        margin-bottom:.1rem;
                    }
                    .type{
                          width: 4.6rem;
                          font-size:.24rem;
                          height: 0.36rem;
                          line-height: .36rem;
                        img{
                            vertical-align: middle;
                            width: 0.28rem;
                            margin-right:.1rem;
                        }
                    }
                    .points{
                        height: 0.6rem;
                        line-height: .6rem;
                        font-size: .32rem;
                        color:#E47E59;
                    }
                    .sum{
                        height: 0.4rem;
                        line-height: .4rem;
                        span:last-child{
                            margin-left:.2rem;
                        }
                    }
                }
                .inforight{
                    font-size:.24rem;
                    float: right;
                    width: 1.6rem;
                    height: 0.8rem;
                    border:.02rem dashed #FCA62F;
                    color:#E47E59;
                    div{
                        line-height: .4rem;
                        text-align: center;
                    }
                    .num{
                        background-color: #FEF1E1;
                    }
                }
            }
            .operate{
                height: 0.8rem;
                line-height: .8rem;
                border-top:.02rem solid #eaeaea;
                .del{
                    border:.02rem solid #727272;
                    background-color: #fff;
                    color:#727272;
                    height: 0.5rem;
                    width: 1.4rem;
                    border-radius:.1rem;
                    margin-top:.16rem;
                    float: right;
                    margin-right:.4rem;
                }
            }
        }
    }
}
</style>

