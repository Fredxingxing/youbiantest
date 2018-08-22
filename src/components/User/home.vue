<template>
    <div class="main">
        <div class="userinfo">
            <div class="infobox">
                <div class="touxiang">
                    <img :src="img" alt="" v-if='img!="null"'>
                    <img src="../../assets/img/default.jpg" alt="" v-else='img=="null"'>
                </div>
                <div class="top">
                    <div class="username" v-if="username">
                        用户名：{{username}}
                    </div>
                    <div class="username" v-else="username">
                        <router-link tag='span' to="/other/login" >登录</router-link>/
                        <router-link tag='span' to="/other/register" >注册</router-link>
                    </div>
                    <div class="points">
                        <span>积分余额</span>
                        <span class='font-16 color-FCA62F'>1200</span>
                    </div>
                    <div class="chongzhi">
                        <router-link tag='button' to='/other/tx'>
                            积分提现
                        </router-link>
                        <router-link tag='button' to='/other/cz'>
                            积分充值
                        </router-link>
                    </div>
                </div>
                <p class='vip'>
                    普通会员 <span>去升级</span>
                </p>
            </div>
        </div>
        <div class="list order">
            <p class='title'>我的订单</p>
            <ul>
                <router-link to="/other/wfbd" tag='li'>
                    <span>
                        <img class='icon' src="../../assets/img/icon-wfbd.png" alt="">我发布的
                    </span>
                    <span>0<i class='iconfont icon-right'></i></span>
                </router-link>
                <router-link to='/other/bjsd' tag='li'>
                    <span>
                         <img class='icon' src="../../assets/img/icon-bjsd.png" alt="">被接收的
                    </span>
                    <span>0<i class='iconfont icon-right'></i></span>
                </router-link>
                <router-link to='/other/wjsd' tag='li'>
                    <span>
                        <img class='icon' src="../../assets/img/icon-wjsd.png" alt="">我接收的
                    </span>
                    <span>0<i class='iconfont icon-right'></i></span>
                </router-link>
            </ul>
        </div>
        <div class="list">
            <p class='title'>账号设置</p>
             <ul>
                <li>
                    <span>
                        <img class='icon' src="../../assets/img/icon-grzl.png" alt="">个人资料
                    </span>
                    <span><i class='iconfont icon-right'></i></span>
                </li>
                <router-link tag='li' to="/other/setpwd">
                    <span>
                        <img class='icon' src="../../assets/img/icon-mmsz.png" alt="">密码设置
                    </span>
                    <span><i class='iconfont icon-right'></i></span>
                </router-link>
                <li>
                    <span>
                        <img class='icon' src="../../assets/img/icon-lxkf.png" alt="">联系客服
                    </span>
                    <span><i class='iconfont icon-right'></i></span>
                </li>
            </ul>
        </div>
        <bottom-bar />
    </div>
</template>
<script>
    import BottomBar from '@/components/bottomBar'
    export default{
        data(){
            return {
                username:window.sessionStorage.getItem('username'),
                img:window.sessionStorage.getItem('img'),
            }
        },
        components:{
            BottomBar
        },
        
    }
</script>
<style lang="less" scoped>
.icon{
    width: 0.36rem;
    height: 0.36rem;
    vertical-align: middle;
    margin-right:.1rem;
}
.main{
    .userinfo{
        height: 2.6rem;
        width: 100%;
        background-color: #FCA62F;
        position: relative;
        .infobox{
            position: absolute;
            top:.8rem;
            height: 2.92rem;
            width: 6.52rem;
            left:50%;
            margin-left:-3.26rem;
            background: #FCA62F;
            border-radius:.08rem;
            .top{
                color:#666;
                background: #fff;
                height: 2.28rem;
                border-radius:.08rem;
                font-size:.24rem;
                .username{
                    height: 0.8rem;
                    font-size:.32rem;
                    padding-left:1.8rem;
                    line-height: .8rem;
                }
                .points{
                    span{
                        display: block;
                        text-align: center;
                    }
                }
                .chongzhi{
                    display: flex;
                    justify-content: space-around;
                    button{
                        background-color: #DD5519;
                        color:#fff;
                        border:0;
                        border-radius:.1rem;
                        width: 1.2rem;
                        height: 0.48rem;
                        font-size:.2rem;
                    }
                }
            }
            .touxiang{
                position: absolute;
                width: 1.06rem;
                height: 1.06rem;
                top:-.24rem;
                left:.48rem;
                border-radius:50%;
                overflow: hidden;
                background-color: #666;
                img{
                    width: 100%;
                }
            }
            .vip{
                text-indent:.26rem;
                text-align: left;
                font-size:.28rem;
                line-height: .64rem;
                color:#666;
                span{
                    margin-left: 4rem;
                    font-size: .24rem;
                }
            }
        }
    }
    .order{
        margin-top:1.3rem;
    }
    .list{

        .title{
            font-size:.34rem;
            text-indent: .4rem;
            line-height: .8rem;
        }
        ul{
            width: 100%;
            background-color: #fff;
            li{
                width: 100%;
                font-size:.28rem;
                height: 0.64rem;
                line-height: .64rem;
                padding:0 0.4rem;
                box-sizing: border-box;
                border-bottom:.01rem solid #eaeaea;
                display: flex;
                justify-content: space-between;
                position: relative;
            }
        }
    }
}
</style>

