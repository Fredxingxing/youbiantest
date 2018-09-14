<template>
     <div class="UserOrderContainer">
         <mt-header title="" class="DetailTop">
             <div  slot="left" tag="span">
                 <div class="TopBar"  v-on:click="Back()">
                     <i class="iconfont icon-Left Back TopSize" ></i>
                     <div class="TopSize" >&nbsp查看</div>
                 </div>
             </div>
         </mt-header>
         <div class="UserInfoContainer">
               <div class="UserInfoBox">
                   <img v-if="UserOrder.img" class="UserProtrait" :src="UserOrder.img">
                   <img v-else class="UserProtrait" src="../../assets/img/default.jpg">
                   <div class="UserInfo">
                       <div>用户名：{{UserOrder.name}}</div>
                       <div>性别：{{UserOrder.sex}}</div>
                       <div>地址：{{UserOrder.province_code}}-{{UserOrder.city_code}}-{{UserOrder.area_code}}</div>
                   </div>
               </div>
               <div class="TakePushBtn">
                   <div class="Take" :class="Btn==0?'CheckBtn':'defualtBtn'" v-on:click="ChangeOrderList(0)">接单&nbsp{{UserOrder.receive_num}}</div>
                   <div class="Push" :class="Btn==1?'CheckBtn':'defualtBtn'" v-on:click="ChangeOrderList(1)">发单&nbsp{{UserOrder.release_num}}</div>
               </div>
         </div>
         <div style="display: flex;flex-direction: column;height: 100%;width: 100%;">
             <ul style="height: 100%;width: 100%;" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                 <li class="order" v-for="(Order,Orderindex) in OrderListshow" v-on:click="GoToDetail(Orderindex)">
                     <div class="orderdetail">
                         <div class="detailText">
                             <div class="orderTitle">
                                 <div style="overflow: hidden;margin-right: 0.1rem;text-overflow:ellipsis;white-space: nowrap;">{{Order.title}}</div>
                                 <img v-if="Order.order_type==2" style="width: .3rem;" src="../../assets/goodorder.png">
                                 <img v-if="Order.encryption==1" style="width: .3rem;" src="../../assets/secret.png">
                             </div>
                             <div class="orderContent">
                                 <div class="orderLeftBox">
                                     <div class="orderInfo">
                                         <div class="orderCate">
                                             <i class="iconfont icon-cate FontSize"></i>
                                             <div class="FontSize" v-if="Order.get_one" style="display:flex;">
                                                 {{Order.get_one.name}}
                                                 <div v-if="Order.get_two"> -{{Order.get_two.name}}</div>
                                                 <div v-if="Order.get_three">-{{Order.get_three.name}}</div>
                                             </div>
                                         </div>
                                     </div>
                                     <div class="orderIntegral">{{Order.price}}积分</div>
                                 </div>
                                 <div class="detailNumberBorder">
                                     <div class="detailNum">
                                         <div class="orderNum">次数 : {{Order.singular}}/{{Order.number}}</div>
                                         <div class="orderTime">周期 : {{Order.cycle}}</div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="orderTop">
                         <div class="user">
                             <img v-if="Order.get_user.img" :src="Order.get_user.img" style="width: 0.45rem;height: .45rem;border-radius: 50%;">
                             <i  v-else class="iconfont icon-icon_user"></i>
                             <span style="font-size: .3rem;margin-left: .15rem;">{{Order.get_user.name}}</span>
                         </div>
                         <div class="orderDate">
                             <div class="FontSize DateSize" >{{Order.update_time|update_time}}</div>
                         </div>
                     </div>
                 </li>
             </ul>
         </div>
     </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    export default {
        name: "UserOrder",
        data(){
            return{
                Btn:0,
                loading:false,
                AllList:[],
                i:0,
                OrderListshow:[]
            }
        },
        filters:{
            update_time:function (val) {
             return val.slice(0,10)
            }
        },
        created(){
            var userid = this.$route.query.UserId
            console.log(userid)
            this.$store.dispatch('getUserOrder',userid)
        },
        computed:{
            ...mapState({
                UserOrder:'UserOrder',
            })
        },
        watch:{
            i:function (val) {
                if(val > this.AllList.length||val==this.AllList.length){
                    this.loading = true;
                    if(val>5) {
                        Toast({
                            message: '没有更多订单',
                            position: 'bottom',
                            duration: 4000
                        });
                    }
                }
            },
            UserOrder:function (val) {
                this.AllList = val.order_receive
            }
        },
        methods:{
            Back:function () {
                this.$router.go(-1)
            },
            ChangeOrderList(index){
                this.Btn = index;
                if(index==0){
                    this.AllList = this.UserOrder.order_receive
                    console.log(this.AllList)
                    this.OrderListshow=[]
                    this.i = 0
                    this.loadMore()
                }
                if(index==1){
                    this.AllList =this.UserOrder.order_release
                    console.log(this.AllList)
                    this.OrderListshow=[]
                    this.i = 0
                    this.loadMore()
                }
            },
            GoToDetail:function(index){
                this.$router.push({path:'/OrderDetail',query:{OrderId:this.OrderListshow[index].id}})
            },
            loadMore:function() {
                console.log("im in")
                this.loading = true;
                setTimeout(() => {
                    var PushList = this.AllList.slice(this.i, this.i + 5)
                    for(var j in PushList){
                        this.OrderListshow.push(PushList[j])
                    }
                    this.i = this.i + 5
                    console.log(this.OrderListshow)
                    this.loading = false;
                }, 500);
            }
        },
    }
</script>

<style scoped>
    .UserOrderContainer{
        width: 100%;
    }
    .DetailTop{
        width: 100%;
        height: .8rem;
        display: flex;
        background: #FCA62F;
    }
    .TopBar{
        height: .8rem;
        display: flex;
        background: #FCA62F;
    }
    .TopSize{
        font-size: 0.32rem;
        color: #ffff;
        line-height: 0.8rem;
    }
    .UserInfoContainer{
        width: 100%;
        margin: 5% 0;
    }
    .UserInfoBox{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 0 15% 5% 15%;
    }
    .UserProtrait{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
    }
    .UserInfo{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .TakePushBtn{
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }
    .CheckBtn{
        width: 25%;
        text-align: center;
        background: #dd5519;
        color: #fff;
        border-radius: .2rem;
        height: .5rem;
        line-height: .5rem;
        transition: .5s;
    }
    .defualtBtn{
        width: 25%;
        text-align: center;
        background: #EFF3F6;
        color: #5D5E60;
        border-radius: .2rem;
        height: .5rem;
        line-height: .5rem;
        border: 0.01rem solid #C4C5C7;
        transition: .5s;
    }
    .order{
        display: flex;
        width: 100%;
        height: 2.40rem;
        flex-direction: column;
        background: #ffffff;
        margin-top: .2rem;
    }
    .orderTop{
        width: 100%;
        height: .75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*box-shadow: .01rem 0.005rem 0rem .01rem #bbbbbb;*/
        border-top: 0.02rem solid #ECECEC;
    }
    .user{
        margin-left: .2rem;
    }
    .detailText{
        margin-left: 0.3rem;
        text-align: left;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .orderdetail{
        width: 100%;
        height: 1.63rem;
        /*box-shadow: 0rem .02rem 0rem 0rem #bbbbbb;*/
        display: flex;
        justify-content: space-between;
    }
    /*查看详情按钮*/
    .Btndetail{
        background: #DD5519;
        color: #ffff;
        width: 1.56rem;
        height: .48rem;
        font-size: .25rem;
        border-radius: .15rem;
        margin-right: .25rem;
    }
    .icon-icon_user{
        font-size: .45rem;
    }
    .orderTitle{
        font-size: .26rem;
        margin-top: .25rem;
        margin-bottom: .05rem;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        height: .3rem;
        margin-right: .45rem;
        width: 6.5rem;
    }
    .orderContent{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .orderInfo{
        margin-top: .08rem;
        margin-left: -.05rem;
        display: flex;
        /*width: 4.40rem;*/
        text-align: left;
        align-items: baseline;
        font-size: .15rem;
    }
    .orderCate{
        display: flex;
    }
    .orderDate{
        display: flex;
        margin-left: 0.1rem;
    }
    .icon-cate{
        margin-top: .03rem;
        margin-right: .02rem;
    }
    .icon-date{
        margin-right: .02rem;
    }
    .orderCate{
        color: #EDA249;
    }
    .orderIntegral{
        font-size: .27rem;
        color: #DD5519;
        margin-top: .12rem;
        text-align: left;
    }
    .detailNumberBorder{
        font-size: .15rem;
        text-align: left;
        margin-right: .45rem;
        color: #DD5519;
        /*width: 1.80rem;*/
        height: .9rem;
        margin-left: .15rem;
        width: 20%;
    }
    .detailNum{
        border-style: dashed;
        border-width: 0.02rem;
        height: 100%;
        font-size: 0.24rem;
    }
    .orderNum{
        height: 50%;
        background: #FFF1E1;
        padding-left: .15rem;
        border-bottom: dashed;
        border-width: 0.02rem;
    }
    .orderTime{
        padding-left: .15rem;
        height: 50%;
    }
    .FontSize{
        font-size: 0.12rem;

    }
    .DateSize{
        color: #A5A5A5;
        font-size: .28rem;
        margin-right: .45rem;
    }
</style>