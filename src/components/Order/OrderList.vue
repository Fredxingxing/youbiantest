<template>
    <div class="Order">
     <topBar/>
        <div class="OrderFilter">
            <div class="FilterName">派单</div>
            <div class="FilterName">价格</div>
            <div class="FilterName">日期</div>
            <div class="FilterName">状态</div>
        </div>
        <div class="OrderSort">
            <div class="SortName">综合</div>
            <div class="SortName">价格</div>
            <div class="SortName">完成时间</div>
            <div class="SortName">发布数量</div>
        </div>
        <div class="OrderList">
            <div class="order" v-for="(Order,Orderindex) in OrderList">
                <div class="orderdetail">
                    <div class="detailText">
                        <div class="orderTitle">{{Order.title}}</div>
                        <div class="orderInfo">
                            <div class="orderCate">
                                <i class="iconfont icon-cate FontSize"></i>
                                <div class="FontSize">{{Order.get_one.name}}-{{Order.get_two.name}}-{{Order.get_three.name}}</div>
                            </div>
                            <div class="orderDate">
                                <i class="iconfont icon-date FontSize"></i>
                                <div class="FontSize" >{{Order.update_time}}</div>
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
                        <span style="font-size: .25rem;margin-left: .15rem;">{{Order.get_user.name}}</span>
                    </div>
                    <mt-button class="Btndetail" v-on:click="GoToDetail(Orderindex)">查看详情</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import topBar from '../topBar'
    import { mapState } from 'vuex'
    export default {
        name: "OrderList",
        components:{
            topBar
        },
        data(){
            return{
            }
        },
        created:function(){
            this.$store.dispatch('getOrderList',this.$store.state.OrderSelected)
        },
        watch:{
            OrderList:function (val) {
                //do method again
            }
        },
        computed:{
            ...mapState({
                OrderList:'OrderList',
            })
        },
        methods:{
            GoToDetail:function (index) {
                this.$store.dispatch('getOrderDetail',this.OrderList[index].id)
                this.$router.push('/OrderDetail')
            }
        }
    }
</script>

<style scoped>
.Order{
    display: flex;
    flex-direction: column;
}
.OrderFilter{
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    padding: 0.2rem 0 0.2rem 0;
}
.FilterName{
    width: 25%;
    font-size: .35rem;
    color: #595959;
    text-align: center;
}
.OrderSort{
    background: #ffffff;
    display: flex;
    padding: 0.3rem 0 0.15rem 0;
}
.SortName{
    font-size: 0.3rem;
    width: 25%;
    text-align: center;
}
.OrderList{
    display: flex;
    flex-direction: column
}
.FontSize{
    font-size: 0.12rem;
}
    /*****************order样式************/
.order{
    display: flex;
    width: 7.50rem;
    height: 2.40rem;
    flex-direction: column;
    background: #ffffff;
    margin-top: 0.12rem;
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
.Btndetail{
    /*background: #DD5519;*/
    color: #E2744E;
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
</style>