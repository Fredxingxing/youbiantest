<template>
    <div style="display: flex;flex-direction: column">
     <div class="order">
          <div class="orderTop">
           <div class="user">
             <i class="iconfont icon-icon_user"></i>
              <span style="font-size: .25rem;margin-left: .15rem;">用户名</span>
             </div>
                <mt-button class="Btndetail">查看详情</mt-button>
         </div>
           <div class="orderdetail">
            <div class="detailText">
                <div class="orderTitle">标题标题标题标题标题标题标题</div>
                  <div class="orderInfo">
                    <div class="orderCate">
                        <i class="iconfont icon-cate"></i>
                        <div>生活类-货运快递-中通快递</div>
                    </div>
                  <div class="orderDate">
                        <i class="iconfont icon-date"></i>
                        <div>2018-12-25</div>
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
     <div class="order">
            <div class="orderTop">
                <div class="user">
                    <i class="iconfont icon-icon_user"></i>
                    <span style="font-size: .25rem;margin-left: .15rem;">用户名</span>
                </div>
                <mt-button class="Btndetail">查看详情</mt-button>
            </div>
            <div class="orderdetail">
                <div class="detailText">
                    <div class="orderTitle">标题标题标题标题标题标题标题</div>
                    <div class="orderInfo">
                        <div class="orderCate">
                            <i class="iconfont icon-cate"></i>
                            <div>生活类-货运快递-中通快递</div>
                        </div>
                        <div class="orderDate">
                            <i class="iconfont icon-date"></i>
                            <div>2018-12-25</div>
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
     <div class="order">
            <div class="orderTop">
                <div class="user">
                    <i class="iconfont icon-icon_user"></i>
                    <span style="font-size: .25rem;margin-left: .15rem;">用户名</span>
                </div>
                <mt-button class="Btndetail">查看详情</mt-button>
            </div>
            <div class="orderdetail">
                <div class="detailText">
                    <div class="orderTitle">标题标题标题标题标题标题标题</div>
                    <div class="orderInfo">
                        <div class="orderCate">
                            <i class="iconfont icon-cate"></i>
                            <div>生活类-货运快递-中通快递</div>
                        </div>
                        <div class="orderDate">
                            <i class="iconfont icon-date"></i>
                            <div>2018-12-25</div>
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
    </div>
</template>

<script>
    export default {
        name: "HomeOrder"
    }
</script>

<style scoped>
.order{
    display: flex;
    width: 7.50rem;
    height: 2.40rem;
    flex-direction: column;
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
    margin-bottom: .25rem;
}
.detailText{
    margin-left: 0.1rem;
    text-align: left;
}
.orderdetail{
    width: 7.50rem;
    height: 1.63rem;
    box-shadow: 0rem .02rem 0rem 0rem #bbbbbb;
    display: flex;
    justify-content: space-between;
}
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