<template>
    <div style="display: flex;flex-direction: column;height: 100%;width: 100%;">
        <ul style="height: 100%;width: 100%;" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
         <li class="order" v-for="(Order,Orderindex) in OrderListshow" v-on:click="GoToDetail(Orderindex)">
          <div class="orderdetail" >
                <div class="detailText">
                    <div class="orderTitle">
                        <div style="overflow: hidden;margin-right: 0.1rem;text-overflow:ellipsis;white-space: nowrap;">{{Order.title|title}}</div>
                        <img v-if="Order.order_type==2" style="width: .3rem;" src="../../assets/goodorder.png">
                        <img v-if="Order.encryption==1" style="width: .3rem;" src="../../assets/secret.png">
                    </div>
                    <div class="orderContent">
                        <div class="orderLeftBox" style=" width: 70%;">
                            <div class="orderDescribe">{{Order.describe}}</div>
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
          <div class="orderTop" v-on:click.stop="GotoUser(Orderindex)">
             <div class="user">
                 <img v-if="Order.get_user.img" :src="Order.get_user.img" style="width: 0.45rem;height: .45rem;border-radius: 50%;">
                 <i  v-else class="iconfont icon-icon_user"></i>
                 <img v-if="Order.get_user.grade_status ==1" src="../../assets/vip.png" style="position: absolute; left: 0.5rem;margin-top: 0.25rem;width: 0.2rem;height: 0.2rem;">
                 <span style="font-size: .3rem;margin-left: .15rem;">{{Order.get_user.name}}</span>
             </div>
               <div class="orderDate">
                 <div class="FontSize DateSize" >{{Order.update_time}}</div>
             </div>
         </div>
         </li>
            <div class="CheckMore" v-show="ShowCheckMore">
                <div v-show="LoadingWord" style=" text-align: center;">
                  <div style="font-size: 0.32rem; margin-bottom: 0.25rem;">{{CheckMore}}</div>
                  <i class="iconfont icon-More"></i>
                </div>
                <mt-spinner type="snake" color="#DD5519" :size="20" v-show="LoadingSpinner"></mt-spinner>
            </div>
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
                OrderListshow:[],
                CheckMore:'查看更多',
                ShowCheckMore:true,
                LoadingWord:true,
                LoadingSpinner:false,
            }
        },
        filters:{
            title :function (val) {
                return val.substring(0,20)
            }
        },
        created(){
            var Getobject = new Object()
            this.$store.dispatch('getOrderList',Getobject)
            console.log('HomeOrder')
            console.log(this.$store.state.OrderList)
            // var _this = this
            //     window.onscroll = function () {
            //         //变量scrollTop是滚动条滚动时，距离顶部的距离
            //         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //         //变量windowHeight是可视区的高度
            //         var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //         //变量scrollHeight是滚动条的总高度
            //         var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //         //滚动条到底部的条件
            //         if(_this.$route.path==='/Home'||_this.$route.path.substring(0.9)==='/OrderDetail') {
            //         if (scrollTop + windowHeight == scrollHeight) {
            //             //写后台加载数据的函数
            //             if (_this.loading == true && _this.ShowCheckMore ==true) {
            //                 // console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
            //                 setTimeout(function () {
            //                     Toast({
            //                         message: '没有更多',
            //                         position: 'bottom',
            //                         duration: 2000
            //                     });
            //                 }, 800)
            //                 _this.CheckMore = '已全部加载'
            //                 setTimeout(function () {
            //                     _this.ShowCheckMore = false
            //                 }, 1100)
            //             }
            //         }
            //     }
            // }
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
                    setTimeout(function () {
                                 Toast({
                                         message: '没有更多',
                                         position: 'bottom',
                                         duration: 2000
                                            });
                                   }, 800)
                     this.CheckMore = '已全部加载'
                     var _this = this
                      setTimeout(function () {
                            _this.ShowCheckMore=false
                            },1500)
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
                var _this = this
                _this.LoadingWord = false
                _this.LoadingSpinner = true
                _this.loading = true
                setTimeout(() => {
                    var PushList = _this.AllList.slice(_this.i, _this.i + 3)
                     for(var j in PushList){
                         _this.OrderListshow.push(PushList[j])
                     }
                    _this.i = _this.i + 3
                    console.log(_this.OrderListshow)
                    _this.loading = false;
                    _this.LoadingWord = true
                    _this.LoadingSpinner = false
                }, 1800);
            },
            GotoUser:function(index){
                var user = this.OrderListshow[index].user_id
                this.$router.push({path:'/UserOrder',query:{UserId:user}})
            },
        },
    }
</script>

<style scoped>
    .CheckMore{
        height: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.2rem;
        margin-top: 0.5rem;
        color: #747577;
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
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.orderdetail{
    padding-left: 0.3rem;
    height: 1.63rem;
    /*box-shadow: 0rem .02rem 0rem 0rem #bbbbbb;*/
    display: flex;
    justify-content: space-between;
}
/*查看详情按钮*/
.Btndetail{
    background: #DD5519;
    color: #ffff;
    width: 22%;
    height: .48rem;
    font-size: .25rem;
    border-radius: .15rem;
    margin-right: .25rem;
}
.icon-icon_user{
    font-size: .45rem;
}
.orderTitle{
    font-size: .3rem;
    margin-top: .1rem;
    margin-bottom: .05rem;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    height: .4rem;
    margin-right: .45rem;
    width: 6.5rem;
}
.orderContent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.orderDescribe{
    font-size: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.orderInfo{
    margin-top: .05rem;
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
    margin-top: .05rem;
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