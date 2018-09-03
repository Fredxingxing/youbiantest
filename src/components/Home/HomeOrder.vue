<template>
    <div style="display: flex;flex-direction: column;height: 100%;">
        <!--v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"-->
     <div class="order" v-for="(Order,Orderindex) in OrderListshow" v-on:click="GoToDetail(Orderindex)">
            <div class="orderdetail">
                <div class="detailText">
                    <div class="orderTitle">{{Order.title}}</div>
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
         <div class="orderTop">
             <div class="user">
                 <i class="iconfont icon-icon_user"></i>
                 <span style="font-size: .3rem;margin-left: .15rem;">{{Order.get_user.name}}</span>
             </div>
               <div class="orderDate">
                 <div class="FontSize DateSize" >{{Order.update_time}}</div>
             </div>
         </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "HomeOrder",
        data(){
            return{
                loading:false,
                AllList:[],
                i:1,
                OrderListshow:[]
            }
        },
        mounted() {
            var Getobject = new Object()
            this.$store.dispatch('getOrderList',Getobject)
            console.log('HomeOrder')
            console.log(this.$store.state.OrderList)
        },
        watch:{
            OrderList:function (val) {
                console.log(val.slice(0,3))
                this.OrderListshow = val.slice(0,3)

                //do method again
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

        },
        // loadMore:function() {
        //     console.log("im in")
        //     this.loading = true;
        //     setTimeout(() => {
        //         if(this.i>this.AllList||this.i==this.AllList.length){
        //             this.loading = false;
        //         }
        //         else {
        //             this.OrderListshow.push(this.AllList.slice(this.i, this.i + 3))
        //             this.i = this.i + 3
        //         }
        //         console.log(this.OrderList)
        //         this.loading = false;
        //     }, 2500);
        // }
    }
</script>

<style scoped>
.order{
    display: flex;
    width: 7.50rem;
    height: 2.40rem;
    flex-direction: column;
    background: #ffffff;
    margin-top: .2rem;
}
.orderTop{
    width: 7.50rem;
    height: .75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: .01rem 0.005rem 0rem .01rem #bbbbbb;
}
.user{
    margin-left: .25rem;
}
.detailText{
    margin-left: 0.1rem;
    text-align: left;
}
.orderdetail{
    width: 7.50rem;
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
    font-weight: bold
}
.orderInfo{
    margin-top: .08rem;
    margin-left: -.05rem;
    display: flex;
    /*width: 4.40rem;*/
    justify-content: space-around;
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
    margin-top: .25rem;
    color: #DD5519;
    /*width: 1.80rem;*/
    height: .9rem;
    margin-left: .15rem;
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