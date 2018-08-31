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
        </div>
        <div v-if="ShowFilterSelectList" class="SelectorOverLayer" @touchmove.prevent>
            <div class="ShowFilterSelectList" >
                <mt-radio v-model="SelectRes" v-on:click="CheckSelector()" :options="FilterSelectList" align="right"> </mt-radio>
            </div>
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
                    <router-link :to="{path:'/OrderDetail',query:{OrderId:Order.id}}">
                    <mt-button class="Btndetail" v-on:click="GoToDetail(Orderindex)">查看详情</mt-button>
                    </router-link>
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
                SelectRes:'-5',
                TypeSelected:"",
                Getobject:{},
                TypeList:["OrderSelector","PriceSelector"," DateSelector","StatusSelector"],
            }
        },
        mounted() {

            this.Getobject = new Object()
            this.Getobject.levelone = this.$route.query.level_one
            this.Getobject.leveltwo = this.$route.query.level_two
            this.Getobject.levelthree = this.$route.query.level_three

            console.log(this.Getobject)
            this.$store.dispatch('getOrderList',this.Getobject)
            this.$store.commit('setTopBarShow',false)
        },
        watch:{
            OrderList:function (val) {
                //do method again
            },
            SelectRes:function (val) {
                var SearchPrice = ["0-20","20-50","50-100","100-200","200-300","400-500","500-99999"] //价格
                console.log(this.TypeSelected)
                switch (this.TypeSelected){
                    case 0:
                        this.Getobject.type = val
                        break
                    case 1:
                        this.Getobject.price = SearchPrice[val]
                        console.log(SearchPrice[val])
                        break
                    case 2:
                        this.Getobject.time = val
                        break
                    case 3:
                        this.Getobject.status = val
                        break
                }
                console.log(val)
                    this.ShowFilterSelectList = false
                this.$store.dispatch('getOrderList',this.Getobject)
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
            CheckSelector:function(){
            },
            GoToDetail:function (Orderindex) {
                this.$store.dispatch('getOrderDetail',this.OrderList[Orderindex].id)
               // this.$router.push('/OrderDetail')
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
.ShowFilterSelectList{
    position: absolute;
    background: white;
    /*margin-top: 0.44rem;*/
    width: 100%;
}
.SelectorType{
    display: flex;
    text-align: center;
    margin-left: 30%;
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
    margin-top: 1.64rem
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