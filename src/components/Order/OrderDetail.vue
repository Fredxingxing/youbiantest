<template>
    <div class="Order">
        <!--<van-popup v-model="show">-->
            <!--<div class="ShareContent">-->
                <!--<div>分享至</div>-->
                <!--<div class="ContentBox">-->
                  <!--<div class="ShareItem" @click.stop="ShareTo(0)">-->
                     <!--<i class="iconfont icon-qq ShareIcon" ></i>-->
                      <!--QQ-->
                  <!--</div>-->
                  <!--<div class="ShareItem" @click.stop="ShareTo(1)">-->
                    <!--<i class="iconfont icon-weixin ShareIcon" ></i>-->
                      <!--微信-->
                  <!--</div>-->
                      <!--<a  class="ShareItem" href="http://service.weibo.com/share/share.php?appkey=&title=&url=&searchPic=false&style=simple" target="_blank">-->
                          <!--<i class="iconfont icon-weibo ShareIcon" ></i>-->
                          <!--微博-->
                      <!--</a>-->
                <!--</div>-->
            <!--</div>-->
        <!--</van-popup>-->
        <div class="TopBar"  v-on:click="Back()">
                <i class="iconfont icon-Left Back TopSize" ></i>
                <div class="TopSize" >&nbsp详情</div>
        </div>
        <div class="OrderDetail">
            <div class="order">
            <div class="orderTop" >
                <div class="user" v-on:click.stop="GotoUser(Orderindex)">
                    <img v-if="OrderDetail.get_user.img" :src="OrderDetail.get_user.img" style="width: 0.45rem;height: .45rem;border-radius: 50%;">
                    <i  v-else class="iconfont icon-icon_user"></i>
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
                            <div class="FontSize" v-if="OrderDetail.get_one" style="display:flex;">
                                {{OrderDetail.get_one.name}}
                                <div v-if="OrderDetail.get_two"> -{{OrderDetail.get_two.name}}</div>
                                <div v-if="OrderDetail.get_three">-{{OrderDetail.get_three.name}}</div>
                            </div>
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
                <embed v-if="OrderDetail.video_url" frameborder="0" :src="OrderDetail.video_url" allowFullScreen="true" align="middle" style="width: 100%;height: 5rem;margin-bottom: 0.5rem;">
                <div class="UrlBox">

                    <div class="DownloadShare" v-if="OrderDetail.file">
                        <a class="Download" :herf="DownloadFile" @click="Download()" download="附件">
                            <i class="iconfont icon-download" style="font-size: 0.37rem;line-height: 0.37rem;margin-right: 0.1rem;"></i>
                            下载附件
                        </a>
                        <!--<div class="Share" @click="Share()">-->
                            <!--<i class="iconfont icon-share"></i>-->
                            <!--分享订单-->
                        <!--</div>-->
                    </div>
                </div>
                <div v-if="OrderDetail.img">
                    <div   v-for="img in OrderDetail.img">
                        <img  class="InfoPicture" :src="img">
                    </div>
                </div>
                <div v-html="OrderDetail.describe" class="InfoDescription" v-if="OrderDetail.describe!=''">
                   {{OrderDetail.describe}}
                </div>
            </div>
            <div class="DetailComment">
                <div class="CommentTopBar">全部评论({{OrderComments.length}})</div>
                <ul style="height: 100%;width: 100%" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li class="Comment" v-for="(Comments,CommentsIndex) in CommentsListshow">
                    <img v-if="Comments.get_user.img" :src="Comments.get_user.img" style="width: 0.84rem;height: .84rem;margin-right: 0.2rem;border-radius: 50%;">
                    <i v-else class="iconfont UserImage icon-icon_user "></i>
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

<script >
    import { Toast } from 'mint-ui';
    import { mapState } from 'vuex'
    // import Txshare from '../../util/TXshare'
    // require('../../util/TXshare')
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
                CommentsListshow:[],
                DownloadFile:{},
                // show:false
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
                console.log(val)
            },
            OrderComments:function (val) {
                for(var i in val){
                    val[i].DateDiff = this.getDateDiff(this.getDateTimeStamp(val[i].get_user.update_time))
                }
        //        console.log("updated")
           //     console.log(val)
                this.$store.commit('setOrderComments',this.OrderComments)
                this.AllList = val
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
                    if(val>5){
                    Toast({
                        message: '没有更多评论了',
                        position: 'bottom',
                        duration: 4000
                    });
                    }
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
            Download:function(){
                var Token  = window.sessionStorage.getItem('token')
                if(Token) {
                    var _this = this
                    this.$axios.get('/receive/download_file', {
                        params: {
                            order_id: _this.OrderDetail.id
                        },
                        headers: {
                            token: Token
                        }
                    })
                        .then(function (response) {
                            console.log(response)
                            _this.DownloadFile = response.data.data
                            console.log(_this.DownloadFile)
                            location.href = _this.DownloadFile;
                            // var UserInfo = response.data.data
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }
                else{
                    Toast({
                        message: '请登录',
                        position: 'bottom',
                        duration: 4000
                    });
                    setTimeout(() => {
                        this.$router.push('/other/login')
                    },500)
                }
            },
            Share:function(){
                this.show = true
            },
            ColseShare:function(){
                this.show= false
            },
            // ShareTo:function(index){
            //     switch (index){
            //         case 0://QQ
            //             console.log('分享至QQ')
            //               setShareInfo({
            //                     title:          '优便，带来便捷生活',
            //                     summary:        '好友给你分享了一条优便订单，快打开看看吧',
            //                     pic:            '../../assets/logo.png',
            //                     url:            'http://www.youbian.link/mobile/#/OrderDetail?OrderId='+this.OrderDetail.id,
            //                     WXconfig:       {
            //                         swapTitleInWX: true,
            //                         appId: '',
            //                         timestamp:'',
            //                         nonceStr: '',
            //                         signature: ''
            //                     }
            //                 });
            //             console.log(this.OrderDetail.img[0])
            //             break;
            //         case 1://微信
            //             console.log('分享至微信')
            //             break;
            //         case 2: //微博
            //             console.log('分享至微博')
            //             break;
            //     }
            // },
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
    font-size: 0.2rem;
}
.OrderDetail{
    display: flex;
    flex-direction: column;
}
.DetailInfo{
    display: flex;
    flex-direction: column;
    background: #fff;
}
.InfoTitle{
    background: #ffffff;
    font-size: .28rem;
    padding: 0.3rem;
}
.UrlBox{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.InfoVideo{
    background: #fff;
    padding: 0.5rem 0 0.1rem 0.4rem;
    display: flex;
    color: #E28667;
}
.DownloadShare{
    display: flex;
    flex-direction: row;
    background: #ffff;
    padding: 0rem 0 0.5rem 0.4rem;
}
.Download{
    display: flex;
    color: #E28667;
}
.Share{
    color: #E68763;
    margin-left: 0.2rem;
}
.ShareContent{
    width: 5rem;
    height: 3rem;
    align-items: center;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
}
.ContentBox{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 70%;
    align-items: center;
}
.ShareItem{
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #555;
}
.ShareIcon{
    color: #555;
    font-size: 0.65rem;
}
.InfoPicture{
    width: 100%;
}
.InfoDescription{
    display: flex;
    flex-direction: column;
    background: #ffff;
    padding: 1.5rem 0.3rem 0.5rem 0.3rem;
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
    width: 100%;
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
    width: 22%;
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
    width: 30%;
    margin-top: 0.4rem;
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