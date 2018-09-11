<template>
    <div class="Order">
        <div class="TopBar"  v-on:click="Back()">
                <i class="iconfont icon-Left Back TopSize" ></i>
                <div class="TopSize" >&nbsp详情</div>
        </div>
        <div class="OrderDetail">
            <div class="order">
            <div class="orderTop" >
                <div class="user" v-on:click.stop="GotoUser(Orderindex)">
                    <i class="iconfont icon-icon_user oderTopFont"></i>
                    <span style="font-size: .25rem;margin-left: .15rem;">{{OrderDetail.get_user.name}}</span>
                </div>
                <mt-button class="Btndetail" @click="TakeOrder()">快速接单</mt-button>
            </div>
            <div class="orderdetail">
                <div class="detailText">
                    <div class="orderTitle">{{OrderDetail.title}}</div>
                    <div class="orderInfo">
                        <div class="orderCate">
                            <i class="iconfont icon-cate FontSize"></i>
                            <div class="FontSize">{{OrderDetail.get_one.name}}-{{OrderDetail.get_two.name}}-{{OrderDetail.get_three.name}}</div>
                        </div>
                        <div class="orderDate">
                            <i class="iconfont icon-date FontSize"></i>
                            <div class="FontSize" >{{OrderDetail.update_time}}</div>
                        </div>
                    </div>
                    <div class="orderIntegral">{{OrderDetail.price}}积分</div>
                </div>
                <div class="detailNumberBorder">
                    <div class="detailNum">
                        <div class="orderNum">次数 : {{OrderDetail.singular}}/{{OrderDetail.number}}</div>
                        <div class="orderTime">周期 : {{OrderDetail.cycle}}</div>
                    </div>
                </div>
            </div>
        </div>
            <div class="DetailInfo">
                <div class="InfoTitle">详细信息</div>
                <video v-if="OrderDetail.video_url!=''" :src = "OrderDetail.video_url" class="InfoVideo" :poster="videoImg"  controls="controls" width="100%"></video>
                <div class="DownloadShare">
                   <div class="Download" v-if="OrderDetail.file!=null">下载附件</div>
                   <!--<div class="Share">分享订单</div>-->
                 </div>
                <!--<img class="InfoPicture" src="../../assets/OderDetail.png">-->
                <div v-html="OrderDetail.describe" class="InfoDescription" v-if="OrderDetail.describe!=''">
                   {{OrderDetail.describe}}
                </div>
            </div>
            <div class="DetailComment">
                <div class="CommentTopBar">全部评论({{OrderComments.length}})</div>
                <ul style="height: 100%;width: 100%" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li class="Comment" v-for="(Comments,CommentsIndex) in CommentsListshow">
                    <i class="iconfont UserImage icon-icon_user "></i>
                    <div class="UserContent">
                        <div class="UserTop">
                            <div class="UserName">{{Comments.get_user.name}}</div>
                            <div class="CommentTime">{{Comments.DateDiff}}</div>
                        </div>
                        <div class="UserComment">{{Comments.content_receive}}</div>
                    </div>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { mapState } from 'vuex'
    export default {
        name: "OrderDetail",
        data(){
            return{
                // videoUrl:'http://vjs.zencdn.net/v/oceans.mp4',
                videoImg:'',
                playStatus:'autoplay',
                loading:false,
                i:0,
                AllList:[],
                CommentsListshow:[]
            }
        },
        mounted(){
          //  console.log(this.$route)
            this.$store.dispatch('getOrderDetail',this.$route.query.OrderId)
            // for(var i in this.OrderComments){
            //     this.OrderComments[i].DateDiff = this.getDateDiff(this.getDateTimeStamp(this.OrderComments[i].get_user.update_time))
            // }
            // this.$store.commit('setOrderComments',this.OrderComments)
        },
        updated:function(){

        },
        watch:{
            OrderDetail:function (val) {
            },
            OrderComments:function (val) {
                for(var i in val){
                    val[i].DateDiff = this.getDateDiff(this.getDateTimeStamp(val[i].get_user.update_time))
                }
        //        console.log("updated")
           //     console.log(val)
                this.$store.commit('setOrderComments',this.OrderComments)
            },
            TakeOrderRes:function (val) {
                if(val.code === 400 ){
                    Toast({
                        message: val.message,
                        position: 'middle',
                        duration: 4000
                    });
                    if(val.message === "token错误或已经过期"){
                     //   console.log(this.$route.query.OrderId)
                        this.$router.push({path:'/other/login',query:{OrderId:this.$route.query.OrderId}})
                    }
                }
                else if(val.code === 200){
                    Toast({
                        message: '成功接单',
                        position: 'bottom',
                        duration: 4000
                    });
                }
            },
            i:function (val) {
                if (val > this.AllList.length || val == this.AllList.length) {
                    this.loading = true;
                    Toast({
                        message: '没有更多评论了',
                        position: 'bottom',
                        duration: 4000
                    });
                }
            }
        },
        computed:{
            ...mapState({
                OrderDetail:'OrderDetail',
                OrderComments:'OrderComments',
                TakeOrderRes:'TakeOrderRes'
            }),
        },
        methods:{
            Back:function () {
                //this.$router.push('/OrderList')
                this.$router.go(-1)
            },
            TakeOrder:function () {
              //  console.log(this.$route.query)
              ////  console.log(window.sessionStorage.token)
                var token = window.sessionStorage.getItem('token')
                //console.log(token)
                if(token==null){
                    this.$router.push({path:'/other/login',query:{OrderId:this.$route.query.OrderId}})
                }
                 this.$store.dispatch('getTakeOrder',this.$route.query.OrderId)

            },
            GotoUser:function(){
                var user = this. OrderDetail.user_id
                this.$router.push({path:'/UserOrder',query:{UserId:user}})
            },
            loadMore:function() {
                console.log("im in")
                this.loading = true;
                setTimeout(() => {
                    var PushList = this.AllList.slice(this.i, this.i + 5)
                    for(var j in PushList){
                        this.CommentsListshow.push(PushList[j])
                    }
                    this.i = this.i + 5
                    console.log(this.CommentsListshow)
                    this.loading = false;
                }, 500);
            },
            getDateTimeStamp:function (dateStr){
                   return Date.parse(dateStr.replace(/-/gi,"/"));
            },
            getDateDiff:function(dateTimeStamp){
         var minute = 1000 * 60;
         var hour = minute * 60;
         var day = hour * 24;
         var halfamonth = day * 15;
         var month = day * 30;
         var now = new Date().getTime();
         var diffValue = now - dateTimeStamp;
         if(diffValue < 0){return;}
         var monthC =diffValue/month;
         var weekC =diffValue/(7*day);
         var dayC =diffValue/day;
         var hourC =diffValue/hour;
         var minC =diffValue/minute;
         if(monthC>=1){
            return("" + parseInt(monthC) + "月前");
           }
          else if(weekC>=1){
             return("" + parseInt(weekC) + "周前");
           }
           else if(dayC>=1){
             return(""+ parseInt(dayC) +"天前");
           }
           else if(hourC>=1){
             return(""+ parseInt(hourC) +"小时前");
           }
           else if(minC>=1){
             return(""+ parseInt(minC) +"分钟前");
           }else
             return("刚刚");
          }
        },
    }
</script>

<style scoped>
.Order{
    display: flex;
    flex-direction: column;
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
.Back{
    margin-left: 0.3rem;
}
.FontSize{
    font-size: 0.12rem;
}
.OrderDetail{
    display: flex;
    flex-direction: column;
}
.DetailInfo{
    display: flex;
    flex-direction: column;
}
.InfoTitle{
    background: #ffffff;
    font-size: .28rem;
    padding: 0.3rem;
}
.DownloadShare{
    display: flex;
    flex-direction: row;
    background: #ffff;
    padding: 0.3rem 0 0.5rem 0.4rem;
}
.Download{}
.Share{
    color: #E68763;
    font-size: 0.24rem;
    margin-left: 0.2rem;
}
.InfoPicture{

}
.InfoDescription{
    display: flex;
    flex-direction: column;
    background: #ffff;
    padding: 0.8rem 0 0.7rem 0.3rem;
    color: #4D4D4D;
}
.DetailComment{
    display: flex;
    flex-direction: column;
    margin-top: 0.3rem;
    background: #ffff;
}
.CommentTopBar{
    padding: 0.3rem 0.5rem;
    /*background: #ffff;*/
     font-size: .28rem;
    border-bottom: 0.02rem solid #F4F7F8;
 }
.Comment{
    margin: 0.4rem 0.3rem 0.05rem 0.4rem;
    padding-bottom: 0.25rem;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #EFF3F5;
}
.UserImage{
    padding-right: 0.2rem;
    font-size: 0.55rem;
}
.UserContent{
    display: flex;
    flex-direction: column;
 }
.UserTop{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 0.2rem;
}
.UserName{
     font-size: 0.28rem;
     font-weight: bold;
     color: #3F3F3F;
}
.CommentTime{
    font-size: 0.2rem;
    color: #B1B1B1;
    margin-left: 0.3rem;
}
.UserComment{
    color: #565656;
}
/*****************order样式************/
.order{
    display: flex;
    width: 100%;
    height: 2.40rem;
    flex-direction: column;
    background: #ffffff;
    margin: 0.12rem 0 0.3rem 0;
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
.oderTopFont{
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
</style>