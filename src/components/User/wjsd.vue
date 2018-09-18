<template>
    <div class="main">
        <ul class="tabs">
            <li :class="{isActive:tabs==5}" @click='changeTab(5)'>全部</li>
            <li :class="{isActive:tabs==1}" @click='changeTab(1)'>已接单</li>
            <li :class="{isActive:tabs==2}" @click='changeTab(2)'>待确认</li>
            <li :class="{isActive:tabs==3}" @click='changeTab(3)'>未通过</li>
            <li :class="{isActive:tabs==4}" @click='changeTab(4)'>已通过</li>
        </ul>
        <ul class="orderlist">
            <li v-for="(item,key) in wjsd" :key="key"  @click="GotoDetail(key)">
                <div class="time-state" v-on:click.stop="GotoUser(key)">
                    <span class='time'>发布人</span>
                    <span class='state'>
                        <img v-if="item.get_order.get_user.img !=undefined" :src="item.get_order.get_user.img " class="txbox">
                        <i  v-else  class="iconfont icon-icon_user" style="margin-left: 0.4rem;font-size: 0.45rem;"></i>
                        {{item.get_order.get_user.name}}
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
                    <div class="inforightbottom">{{item.create_time}}</div>
                </div>
                <div class="operate">
                    <span style='margin-right:3.8rem;margin-left:.4rem' v-if="item.status==0">已接单</span>
                    <span style='margin-right:3.8rem;margin-left:.4rem' v-if="item.status==1" class='color-ea910f'>待确认</span>
                    <span style='margin-right:3.8rem;margin-left:.4rem' v-if="item.status==2" class='color-f00'>未通过</span>
                    <span style='margin-right:3.8rem;margin-left:.4rem' v-if="item.status==3||item.status==4">已通过</span>
                    <span style='margin-right:3.8rem;margin-left:.4rem' v-if="item.status==5||item.status==7" class='color-5cce5c'>已评价</span>
                    <!--  -->
                    <span v-if="item.status==0"><span class='wancheng' @click.stop='complate(item.order_no)'>确认完成</span><span class='del' @click="del(item.order_no)">删除</span></span>
                    <span v-if="item.status==1"><span>等待确认</span><span class='del' @click.stop="del(item.order_no)">删除</span></span>
                    <span v-if="item.status==2"><span class='cxwc' @click.stop='cxwc(item.order_no)'>重新完成</span><span class='del' @click.stop="del(item.order_no)">删除</span></span>
                    <span v-if="item.status==3||item.status==4"><span class='pingjia' @click.stop='dialog(item.order_no,item.get_order.get_user)'>评价</span></span>
                        <!-- <span v-if="item.status==5"><span>等待确认</span><span class='del' @click="del(item.order_no)">删除</span></span> -->
                    <span v-if="item.status==5||item.status==7"><span class='color-5cce5c'></span></span>
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
                this.tabs=num;
                this.$store.dispatch('getWjsd',this.tabs)
            },
                        cxwc(order_no){
                var data= {
                    order_no
                }
                this.$axios({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/re_completion',
                    params:data,
                    headers: {
                                token:window.sessionStorage.getItem('token')
                            }
                    }).then(res=>{
                        if(res.data.code==400){
                            Toast({
                                message: '失败，请重试',
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
            complate(order_no){
                 var data= {
                    order_no
                }
                this.$axios({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/confirm_completed',
                    params:data,
                    headers: {
                                token:window.sessionStorage.getItem('token')
                            }
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
            del(order_no){
                 var data= {
                    order_no
                }
                this.$axios({
                    methods: "get",
                    url:'http://www.youbian.link/api/v1/order/del_order',
                    params:data,
                    headers: {
                                token:window.sessionStorage.getItem('token')
                            }
                    }).then(res=>{
                         if(res.data.code==400){
                             Toast({
                                 message: '操作失败，请重试',
                                 position: 'middle',
                                 duration: 4000
                             });
                        }else{
                             Toast({
                                 message: '删除成功',
                                 position: 'middle',
                                 duration: 4000
                             });
                            this.$store.dispatch('getWjsd',this.tabs)
                        }
                    })
            },
            GotoDetail(index){
                this.$router.push({path:'/OrderDetail',query:{OrderId:this.wjsd[index].goods_id}})
            },
            GotoUser:function(index){
                var user = this.wjsd[index].get_order.get_user.id
                this.$router.push({path:'/UserOrder',query:{UserId:user}})
            },
            dialog(order_no,get_user){
                this.$router.push({path:'/other/comment',query:{OrderId:order_no,User:get_user,Type:1}}) //我接收的为1 被接收的为0
          },
        },
        mounted(){
            this.$store.dispatch('getUserTitle','我接收的')
            this.$store.dispatch('getHasSrh',true)
            this.$store.dispatch('getWjsd',this.tabs)
        },
        computed:{
            wjsd:function(){
                return this.$store.state.wjsd
            }
        },
        watch:{
            bjsd:function (val) {
                console.log(val)
            }
        },
    }
</script>
<style lang="less" scoped>
.isActive{
    border-bottom:.03rem solid #FCA62F; 
}
//
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
.wancheng{
    display: inline-block;
    padding:.04rem;
    height: 0.3rem;
    line-height: .3rem;
    border:1px solid #ea910f;
    color:#ea910f;
    border-radius:.04rem;
}
.cxwc{
    display: inline-block;
    padding:.04rem;
    height: 0.3rem;
    line-height: .3rem;
    border:1px solid #ea910f;
    color:#ea910f;
    border-radius:.04rem;
}
.del{
    display: inline-block;
    padding:.04rem;
    height: 0.3rem;
    line-height: .3rem;
    border:1px solid #f00;
    color:#f00;
    border-radius:.04rem;
    margin-left:.1rem;
}
.pingjia{
    color:#5cce5c;
    border:1px solid #5cce5c;
    display: inline-block;
    padding:.04rem;
    height: 0.3rem;
    line-height: .3rem;
    border-radius:.04rem;
    margin-left:.1rem;
}
//

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
                    .icon-icon_user{
                        font-size: .45rem;
                    }
                }
            }
            .info{
                height: 1.28rem;
                padding:.24rem .3rem;
                .infoleft{
                    float: left;
                    width: 3.6rem;
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
                .inforightbottom{
                    width: 3rem;
                    height: 0.5rem;
                    float: right;
                    margin-top: 0.2rem;
                    text-align: center;
                    color: #A5A5A5;
                }
            }
            .operate{
                height: 0.8rem;
                line-height: .8rem;
                border-top:.02rem solid #eaeaea;
                .state{
                    margin-left:.4rem;
                }
            }
        }
    }
}
</style>

