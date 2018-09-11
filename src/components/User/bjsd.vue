<template>
    <div class="main">
        <ul class="tabs">
            <li :class="{isActive:tabs==5}" @click='changeTab(5)'>全部</li>
            <li :class="{isActive:tabs==1}" @click='changeTab(1)'>已接单</li>
            <li :class="{isActive:tabs==2}" @click='changeTab(2)'>待通过</li>
            <li :class="{isActive:tabs==3}" @click='changeTab(3)'>未通过</li>
            <li :class="{isActive:tabs==4}" @click='changeTab(4)'>已通过</li>
        </ul>
        <ul class="orderlist">
            <li v-for='(item,key) in bjsd' :key="key"  @click="GotoDetail(key)">
                <div class="time-state">
                    <span class='time'>接单人</span>
                    <span class='state'  v-on:click.stop="GotoUser(key)">
                        <div class="txbox">

                        </div>
                        {{item.get_user.name}}
                    </span>
                </div>
                <div class="info">
                    <div class="infoleft">
                        <div class='title'>{{item.get_order.title}}</div>
                        <div class='type'><img src="../../assets/img/icon-type.png" alt="">{{item.level_one.name}}-{{item.level_two.name}}-{{item.level_three.name}}</div>
                        <div class="points">
                            {{item.get_order.price}}积分
                        </div>
                    </div>
                    <div class="inforight">
                        <div class="num">
                            订单号：{{item.order_no}}
                        </div>
                        <div class="cycle">
                            周期：一个月
                        </div>
                    </div>
                </div>
                <div class="operate">
                    <span style='display:inline-block;width:2.5rem;margin-left:.4rem;margin-right:2.5rem' v-if="item.status==0" class='state color-ea910f'>等待对方完成</span>
                    <span style='display:inline-block;width:2.5rem;margin-left:.4rem;margin-right:2.5rem' v-if="item.status==1" class='state color-dd5519'>待确认</span>
                    <span style='display:inline-block;width:2.5rem;margin-left:.4rem;margin-right:2.5rem' v-if="item.status==2" class='state color-f00'>等待对方再次完成</span>
                    <span style='display:inline-block;width:2.5rem;margin-left:.4rem;margin-right:3rem' v-if="item.status==3||item.status==5" class='state color-5cce5c'>已通过</span>
                    <span style='display:inline-block;width:2.5rem;margin-left:.4rem;margin-right:2.5rem' v-if="item.status==4||item.status==7" class='state color-5cce5c'>已评价</span>
                    <!--  -->
                    <span v-if="item.status==1"><span class='butongguo' @click='unpass(item.order_no)'>不通过</span>　<span class='tongguo' @click='pass(item.order_no)'>通过</span></span>
                    <span v-if="item.status==3||item.status==5" class='pingjia' @click="dialog(item.order_no,item.get_user.id)">评价</span>
                    <span v-if="item.status==4||item.status==7"></span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                tabs:5
            }
        },
        methods:{
            changeTab(num){
                this.tabs = num;
                this.$store.dispatch('getBjsd',this.tabs)
            },
            pass(id){
                var data={
                    type:3,
                    order_no:id
                }
                 this.$axios({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/through',
                    params:data,
                    headers: {
                                token:window.sessionStorage.getItem('token')
                            },
                    }).then(res=>{
                      if(res.data.code==400){
                          Toast({
                              message: '操作失败，请重试',
                              position: 'middle',
                              duration: 4000
                          });
                        }else{
                          Toast({
                              message: '操作成功',
                              position: 'middle',
                              duration: 4000
                          });
                            this.changeTab(this.tabs)
                        }
                })
            },
            unpass(goods_id){
                 var data={
                    type:2,
                    order_no:goods_id
                }
                 this.$axios({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/through',
                    params:data,
                    headers: {
                                token:window.sessionStorage.getItem('token')
                            },
                    }).then(res=>{
                     if(res.data.code==400){
                         Toast({
                             message: '操作失败，请重试',
                             position: 'middle',
                             duration: 4000
                         });
                        }else{
                         Toast({
                             message: '操作成功',
                             position: 'middle',
                             duration: 4000
                         });
                            this.changeTab(this.tabs)
                        }
                })
            },
            GotoDetail(index){
                this.$router.push({path:'/OrderDetail',query:{OrderId:this.bjsd[index].goods_id}})
            },
            GotoUser:function(index){
                var user = this.wjsd[index].user_id
                this.$router.push({path:'/UserOrder',query:{UserId:user}})
            },
        },
        computed:{
            bjsd(){
                return this.$store.state.bjsd
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','被接收的')
            this.$store.dispatch('getHasSrh',true)
            this.$store.dispatch('getBjsd',this.tabs)
        }
    }
</script>
<style lang="less" scoped>
.color-dd5519{
 color:#dd5519;
}
.color-ea910f{
 color:#ea910f;
}
.color-f00{
 color:#f00;
}
.color-5cce5c{
 color:#5cce5c;
}
//
.tongguo{
    border:1px solid #ea910f;
    padding:.04rem;
    border-radius:.04rem;
    color:#ea910f;
    margin-left:.1rem;
}
.butongguo{
    padding:.04rem;
    border:1px solid #f00;
    border-radius:.04rem;
    color:#f00;
}
.pingjia{
    border:1px solid #ea910f;
    padding:.04rem;
    border-radius:.04rem;
    color: #ea910f;
    margin-left:.1rem;
}
//
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
                    .txbox{
                        display: inline-block;
                        vertical-align: middle;
                        width: 0.44rem;
                        height: 0.44rem;
                        border-radius:50%;
                        overflow: hidden;
                        background-color: #eaeaea;
                    }
                }
            }
            .info{
                height: 1.28rem;
                padding:.24rem .3rem;
                .infoleft{
                    float: left;
                    width: 3.6rem;
                    overflow: hidden;
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
                    font-size:.2rem;
                    float: right;
                    width: 2.8rem;
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
                .state{
                    margin-left:.4rem;
                }
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

