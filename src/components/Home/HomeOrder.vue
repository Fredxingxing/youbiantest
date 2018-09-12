<template>
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
                                    <div class="FontSize">{{Order.get_one.name}}-{{Order.get_two.name}}-{{Order.get_three.name}}</div>
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
          <div class="orderTop" v-on:click.stop="GotoUser(Orderindex)">
             <div class="user">
                 <img v-if="Order.get_user.img !=''" :src="Order.get_user.img" style="width: 0.45rem;height: .45rem;border-radius: 50%;">
                 <i  v-else class="iconfont icon-icon_user"></i>
                 <img v-if="Order.get_user.grade_status ==1" src="../../assets/vip.png" style="position: absolute; left: 0.5rem;margin-top: 0.25rem;">
                 <span style="font-size: .3rem;margin-left: .15rem;">{{Order.get_user.name}}</span>
             </div>
               <div class="orderDate">
                 <div class="FontSize DateSize" >{{Order.update_time}}</div>
             </div>
         </div>
         </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { Toast } from 'mint-ui';
    export default {
        name: "HomeOrder",
        data(){
            return{
                loading:false,
                AllList:[],
                i:0,
                OrderListshow:[]
            }
        },
        created(){
            var Getobject = new Object()
            this.$store.dispatch('getOrderList',Getobject)
            console.log('HomeOrder')
            console.log(this.$store.state.OrderList)
        },
        mounted() {
            this.i = 0;
        },
        beforeUpdate(){

        },
        watch:{
            OrderList:function (val) {
           //     console.log(val.slice(0,3))
                this.AllList = val
                //do method again
            },
            i:function (val) {
                if(val>this.AllList.length||val==this.AllList.length){
                    this.loading = true;
                    Toast({
                        message: '没有更多了',
                        position: 'bottom',
                        duration: 4000
                    });
                }
            }
        },
        computed:{
            ...mapState({
                OrderList:'OrderList',
            }),
        },
        methods:{
            GoToDetail:function(index){
                this.$router.push({path:'/OrderDetail',query:{OrderId:this.OrderListshow[index].id}})
            },
            loadMore:function() {
                console.log("im in")
                 this.loading = true;
                setTimeout(() => {
                    var PushList = this.AllList.slice(this.i, this.i + 3)
                     for(var j in PushList){
                         this.OrderListshow.push(PushList[j])
                     }
                        this.i = this.i + 3
                    console.log(this.OrderListshow)
                    this.loading = false;
                }, 500);
            },
            GotoUser:function(index){
                var user = this.OrderListshow[index].user_id
                this.$router.push({path:'/UserOrder',query:{UserId:user}})
            },
        },
    }
</script>

<style scoped>
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
    box-shadow: .01rem 0.005rem 0rem .01rem #bbbbbb;
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
    margin-top: .1rem;
    color: #DD5519;
    /*width: 1.80rem;*/
    height: .9rem;
    margin-left: .15rem;
    width: 20%;
 }
.detailNum{
    border-style: dashed;
    border-width: 0.02rem;
}
.orderNum{
    background: #FFF1E1;
    padding-left: .15rem;
    border-bottom: dashed;
    border-width: 0.02rem;
}
.orderTime{
    padding-left: .15rem;
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