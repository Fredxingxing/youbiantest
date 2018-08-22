<template>
    <div class="Order">
        <div class="TopBar"  v-on:click="Back()">
                <i class="iconfont icon-Left Back TopSize" ></i>
                <div class="TopSize" >&nbsp详情</div>
        </div>
        <div class="OrderDetail">
            <div class="order">
            <div class="orderTop">
                <div class="user">
                    <i class="iconfont icon-icon_user oderTopFont"></i>
                    <span style="font-size: .25rem;margin-left: .15rem;">用户名</span>
                </div>
                <mt-button class="Btndetail">快速接单</mt-button>
            </div>
            <div class="orderdetail">
                <div class="detailText">
                    <div class="orderTitle">标题标题标题标题标题标题标题</div>
                    <div class="orderInfo">
                        <div class="orderCate">
                            <i class="iconfont icon-cate FontSize"></i>
                            <div class="FontSize">生活类-货运快递-中通快递</div>
                        </div>
                        <div class="orderDate">
                            <i class="iconfont icon-date FontSize"></i>
                            <div class="FontSize" >2018-12-25</div>
                        </div>
                    </div>
                    <div class="orderIntegral">120积分</div>
                </div>
                <div class="detailNumberBorder">
                    <div class="detailNum">
                        <div class="orderNum">次数 : 2/10</div>
                        <div class="orderTime">周期 : 1个月</div>
                    </div>
                </div>
            </div>
        </div>
            <div class="DetailInfo">
                <div class="InfoTitle">详细信息</div>
                <video :src = "videoUrl" class="InfoVideo" :poster="videoImg"  controls="controls" width="100%"></video>
                <div class="DownloadShare">
                   <div class="Download">下载</div>
                   <div class="Share">分享</div>
                 </div>
                <img class="InfoPicture" src="../../assets/OderDetail.png">
                <div class="InfoDescription">
                    <span>三个法师法师方法撒打算ad</span>
                    <span>萨达所撒多阿斯顿撒阿斯</span>
                    <span>a卫栖梧的奥所大所多 的 a</span>
                </div>
            </div>
            <div class="DetailComment">
                <div class="CommentTopBar">全部评论(3)</div>
                <div class="Comment">
                    <i class="iconfont UserImage icon-icon_user "></i>
                    <div class="UserContent">
                        <div class="UserTop">
                            <div class="UserName">用户名用户名</div>
                            <div class="CommentTime">三天前</div>
                        </div>
                        <div class="UserComment">
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                        </div>
                    </div>
                </div>
                <div class="Comment">
                    <i class="iconfont UserImage icon-icon_user "></i>
                    <div class="UserContent">
                        <div class="UserTop">
                            <div class="UserName">用户名用户名</div>
                            <div class="CommentTime">三天前</div>
                        </div>
                        <div class="UserComment">
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                        </div>
                    </div>
                </div>
                <div class="Comment">
                    <i class="iconfont UserImage icon-icon_user "></i>
                    <div class="UserContent">
                        <div class="UserTop">
                            <div class="UserName">用户名用户名</div>
                            <div class="CommentTime">三天前</div>
                        </div>
                        <div class="UserComment">
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                            不错不错不错不错不错不错不错不错不错不错不错不错不错不错
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        data(){
            return{
                videoUrl:'http://vjs.zencdn.net/v/oceans.mp4',
                videoImg:'',
                playStatus:'autoplay'
            }
        },
        methods:{
            Back:function () {
                this.$router.go(-1)
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
.Back{
    margin-left: 0.3rem;
}
.TopSize{
    font-size: 0.32rem;
    color: #ffff;
    line-height: 0.8rem;
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
    padding: 0.3rem 0 0.5rem 0.2rem;
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
    width: 7.50rem;
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