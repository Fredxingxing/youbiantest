<template>
    <div class="Order">
     <topBar/>
        <div class="OrderFilter" style="z-index: 9999;">
            <div class="FilterName" v-for="(FilterType,Typeindex) in FilterName">
               <div class="SelectorType" v-on:click="SelectedType(Typeindex)">
                   <div>{{FilterType}}</div>
                   <i class="iconfont icon-down IconDown"></i>
               </div>
            </div>
            <div v-if="ShowFilterSelectList&& TypeSelected === 0" class="SelectorOverLayer" @touchmove.prevent>
                <div class="ShowFilterSelectList" >
                    <mt-radio v-model="OrderSelNum" :options="FilterSelectList" align="right"> </mt-radio>
                </div>
            </div>
            <div v-if="ShowFilterSelectList&& TypeSelected === 1" class="SelectorOverLayer" @touchmove.prevent>
                <div class="ShowFilterSelectList" >
                    <mt-radio v-model="PriceSelNum" :options="FilterSelectList" align="right"> </mt-radio>
                </div>
            </div>
            <div v-if="ShowFilterSelectList&& TypeSelected === 2" class="SelectorOverLayer" @touchmove.prevent>
                <div class="ShowFilterSelectList" >
                    <mt-radio v-model="DateSelNum"  :options="FilterSelectList" align="right"> </mt-radio>
                </div>
            </div>
            <div v-if="ShowFilterSelectList&& TypeSelected === 3" class="SelectorOverLayer" @touchmove.prevent>
                <div class="ShowFilterSelectList" >
                    <mt-radio v-model="StatusSelNum" v-on:click="CheckSelector()" :options="FilterSelectList" align="right"> </mt-radio>
                </div>
            </div>
            <div v-if="OrderSelNum!==''" class="line one"></div>
            <div v-if="PriceSelNum!==''" class="line two"></div>
            <div v-if="DateSelNum!==''" class="line three"></div>
            <div v-if="StatusSelNum!==''" class="line four"></div>
        </div>
        <div class="OrderSort">
            <div :class="SortSelect===index ? 'SortNameCheck':'SortName'"  v-for="(item,index) in SortName" v-on:click="SelectSort(index)">
                <div>{{item}}</div>
                <i class="iconfont icon-up Up"></i>
            </div>
        </div>
        <div class="OrderList">
            <ul style="height: 100%;width: 100%" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
             <li class="order" v-for="(Order,Orderindex) in OrderListshow" v-on:click="GoToDetail(Orderindex)">
                <div class="orderdetail">
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
                        <div class="orderIntegral">{{Order.price}}积分
                         </div>
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
                <div class="orderTop" >
                    <div class="user" v-on:click.stop="GotoUser(Orderindex)">
                        <img v-if="Order.get_user.img" :src="Order.get_user.img" style="width: 0.45rem;height: .45rem;border-radius: 50%;">
                        <i  v-else class="iconfont icon-icon_user"></i>
                        <img v-if="Order.get_user.grade_status ==1" src="../../assets/vip.png" style="position: absolute; left: 0.5rem;margin-top: 0.25rem;width: 0.2rem;height: 0.2rem;">
                        <span style="font-size: .25rem;margin-left: .15rem;">{{Order.get_user.name}}</span>
                    </div>
                    <div class="orderDate">
                        <div class="FontSize DateSize" >{{Order.update_time}}</div>
                    </div>
                </div>
             </li>
                <div class="CheckMore" v-if="OrderListshow.length > 5 && ShowCheckMore">
                    <div style="font-size: 0.32rem; margin-bottom: 0.25rem;">{{CheckMore}}</div>
                    <i class="iconfont icon-More"></i>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import topBar from '../topBar'
    import { Toast } from 'mint-ui';
    import { mapState } from 'vuex'
    export default {
        name: "OrderList",
        components:{
            topBar,
        },
        data(){
            return{
                FilterName:["派单","价格","日期","状态"],
                OrderSelector:[{label:"普通",value:'0'},{label:"优单",value:'1'}],  //type 1 2
                PriceSelector:["0积分-20积分","20积分-50积分","50积分-100积分","100积分-200积分","200积分-300积分","400积分-500积分","500积分以上"], //价格
                // PriceSelector:["0-20","20-50","50-100","100-200","200-300","400-500","500-99999"],
                DateSelector:["今天","三天内","一周","半个月内","一个月内"],//12345
                StatusSelector:["全部","未开始","进行中","已完成",], //0 1 2 3
                FilterSelectList:[],
                NewPriceSelector:[],
                ShowFilterSelectList:false,
                SelectRes:'',
                TypeSelected:"",
                Getobject:{},
                TypeList:["OrderSelector","PriceSelector"," DateSelector","StatusSelector"],
                SortSelect:-1,
                SortName:["综合","价格","完成时间","发布数量",],
                OrderSelNum:'',
                PriceSelNum:'',
                DateSelNum:'',
                StatusSelNum:'',
                //infine scroll
                loading:false,
                AllList:[],
                i:0,
                OrderListshow:[],
                CheckMore:'查看更多',
                ShowCheckMore:true
            }
        },
        filters:{
            title :function (val) {
                return val.substring(0,20)
            }
        },
        mounted() {
            this.Getobject = new Object()
            this.Getobject.levelone = this.$route.query.level_one
            this.Getobject.leveltwo = this.$route.query.level_two
            this.Getobject.levelthree = this.$route.query.level_three
            console.log(this.Getobject)
            this.i = 0;
            this.$store.dispatch('getOrderList',this.Getobject)
            this.$store.commit('setTopBarShow',false)
        },
        created(){
            // var _this = this
            // window.onscroll = function(){
            //     //变量scrollTop是滚动条滚动时，距离顶部的距离
            //     var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //     //变量windowHeight是可视区的高度
            //     var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //     //变量scrollHeight是滚动条的总高度
            //     var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            //     //滚动条到底部的条件
            //     if(scrollTop+windowHeight==scrollHeight){
            //         //写后台加载数据的函数
            //         console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            //         if(_this.loading == true){
            //             setTimeout(function () {
            //                 Toast({
            //                     message: '没有更多订单',
            //                     position: 'bottom',
            //                     duration: 4000
            //                 });
            //             },1000)
            //             _this.CheckMore = '已全部加载'
            //             setTimeout(function () {
            //                 _this.ShowCheckMore = false
            //             },1200)
            //         }
            //     }
            // }
        },
        watch:{
            OrderList:function (val) {
                //do method again
                console.log('OrderList')
                this.AllList = val
                console.log(this.AllList)
                console.log('over')
            },
            OrderSelNum:function(val){
                this.Getobject.type = parseInt(val)+1
                this.OrderSelNum = val
                this.ShowFilterSelectList = false
                //    this.$store.dispatch('getOrderList',this.Getobject)
            },
            PriceSelNum:function(val){
                this.Getobject.type = parseInt(val)+1
                this.PriceSelNum = val
                this.ShowFilterSelectList = false
            //    this.$store.dispatch('getOrderList',this.Getobject)
            },
            DateSelNum:function(val){
                this.Getobject.type = parseInt(val)+1
                this.DateSelNum = val
                this.ShowFilterSelectList = false
                //    this.$store.dispatch('getOrderList',this.Getobject)
            },
            StatusSelNum:function(val){
                this.Getobject.type = parseInt(val)+1
                this.StatusSelNum = val
                this.ShowFilterSelectList = false
                //    this.$store.dispatch('getOrderList',this.Getobject)
            },
            i:function (val) {
                if(val > this.AllList.length||val==this.AllList.length){
                    this.loading = true;
                    if(val > 5) {
                        Toast({
                            message: '没有更多了',
                            position: 'bottom',
                            duration: 4000
                        });
                    }
                }
            }
        },
        computed:{
            ...mapState({
                OrderList:'OrderList',
            })
        },
        methods:{
            SelectedType:function(Typeindex){
                this.ShowFilterSelectList = !this.ShowFilterSelectList
                this.TypeSelected = Typeindex
              //  console.log(Typeindex)
                switch (Typeindex){
                    case 0:
                         this.FilterSelectList = this.OrderSelector
                        break;
                    case 1:
                        var Price = new Array()
                        for(var i in this.PriceSelector){
                            Price.push({"label":this.PriceSelector[i],"value":i})
                        }
                        this.FilterSelectList = Price
                        break;
                    case 2:
                        var Date = new Array()
                        for(var i in this.DateSelector){
                            Date.push({"label":this.DateSelector[i],"value":i})
                        }
                        this.FilterSelectList = Date
                        break;
                    case 3:
                        var Status = new Array()
                        for(var i in this.StatusSelector){
                            Status.push({"label":this.StatusSelector[i],"value":i})
                        }
                        this.FilterSelectList =  Status
                        break;
                }
            },
            SelectSort:function (index) {
               this.SortSelect = index
               this.Getobject.order_status = index
               this.$store.dispatch('getOrderList',this.Getobject)
            },
            CheckSelector:function(){
            },
            GoToDetail:function (index) {
                this.$router.push({path:'/OrderDetail',query:{OrderId:this.OrderListshow[index].id}})
            },
            GotoUser:function(index){
                var user = this.OrderListshow[index].user_id
                this.$router.push({path:'/UserOrder',query:{UserId:user}})
            },
            loadMore:function() {
                console.log("im in")
                this.loading = true;
                setTimeout(() => {
                    var PushList = this.AllList.slice(this.i, this.i + 5)
                    console.log(PushList)
                    for(var j in PushList){
                        this.OrderListshow.push(PushList[j])
                    }
                    this.i = this.i + 5
                    console.log('this.OrderListshow')
                    console.log(this.OrderListshow)
                    this.loading = false;
                }, 500);
            }
        }
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
.Order{
    display: flex;
    flex-direction: column;
}
.OrderFilter{
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    padding: 0.2rem 0 0.2rem 0;
    border-bottom: 1px solid #F2F2F2;
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
    display: flex;
    color: #8A8B8C;
    align-items: center;
    justify-content: center;
}
.SortNameCheck{
    font-size: 0.3rem;
    width: 25%;
    text-align: center;
    display: flex;
    color: #E7926A;
    align-items: center;
    justify-content: center;
}
.Up{
  font-size: .20rem;
}
.line{
    width: 1rem;
    height: .05rem;
    position: absolute;
    background: #E26932;
    top:1.65rem;
}
.one{
 left:.4rem;
}
.two{
    left: 2.3rem;
}
.three{
    left: 4.2rem;
}
.four{
    left: 6.1rem;
}
.OrderList{
    display: flex;
    flex-direction: column
}
.FontSize{
    font-size: 0.12rem;
}
.DateSize{
    color: #A5A5A5;
    font-size: .28rem;
    margin-right: .45rem;
}
.ShowFilterSelectList{
    position: absolute;
    background: white;
    /*margin-top: 0.44rem;*/
    width: 100%;
}
.SelectorType{
    display: flex;
    text-align: center;
    margin-left: 25%;
}
.IconDown{
    margin-top: 12%;
    margin-left: 5%;
    font-size: .08rem;
}
.SelectorOverLayer{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:10;
    background: rgba(0,0,0,0.3);
    margin-top: 1.64rem;
}
    /*****************order样式************/
.order{
    display: flex;
    width: 100%;
    height: 2.40rem;
    flex-direction: column;
    background: #ffffff;
    margin-top: 0.12rem;
}
.orderTop{
    width: 100%;
    height: .75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*box-shadow: .01rem 0.005rem 0rem .01rem #bbbbbb;*/
    border-top: 0.02rem solid #F0F0F0;
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
    /*justify-content: space-around;*/
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
</style>