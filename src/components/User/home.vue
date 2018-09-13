<template>
    <div class="main">
        <div class="userinfo">
            <div class="infobox">
                <div class="touxiang">
                    <img :src="img" alt="" v-if='img'>
                    <img src="../../assets/img/default.jpg" alt="" v-else>
                </div>
                <div class="top">
                    <div class="username" v-if="user.name" style="   display: flex; justify-content: space-between;">
                        用户名：{{user.name}}
                        <div style="height: 1rem;margin-right: 0.5rem;">
                            <div style=" font-size:0.1rem;height:0.4rem;">接单：{{user.receive_num1}}</div>
                            <div style=" font-size:0.1rem;height:0.4rem;">发单：{{user.release_num1}}</div>
                        </div>
                    </div>
                    <div class="username" v-else="username">
                        <router-link tag='span' to="/other/login" >登录</router-link>/
                        <router-link tag='span' to="/other/register" >注册</router-link>
                    </div>
                    <div class="points">
                        <span style='line-height:.3rem;text-align: left;'>积分余额</span>
                        <span class='font-16 color-FCA62F' style="text-align: left;">{{user.integral}}<router-link tag='span' to='/other/detail' style='display:inline;font-size:.2rem;color:#727272;margin-left:.1rem'>明细>></router-link></span>
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
                <p class='vip' v-if='user.grade_status==0'>
                    普通会员 <router-link tag='span' to="/other/vip">去升级</router-link>
                </p>
                 <p class='vip' v-if='user.grade_status==1'>
                     <img src="../../assets/userVip.png" style="width: 8%;">
                    {{user.members_end}}到期 <router-link tag='span' to="/other/vip">去续费</router-link>
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
                    <span>{{user.release_num1}}<i class='iconfont icon-right'></i></span>
                </router-link>
                <router-link to='/other/bjsd' tag='li'>
                    <span>
                         <img class='icon' src="../../assets/img/icon-bjsd.png" alt="">被接收的
                    </span>
                    <span>{{user.receive_num2}}<i class='iconfont icon-right'></i></span>
                </router-link>
                <router-link to='/other/wjsd' tag='li'>
                    <span>
                        <img class='icon' src="../../assets/img/icon-wjsd.png" alt="">我接收的
                    </span>
                    <span>{{user.receive_num1}}<i class='iconfont icon-right'></i></span>
                </router-link>
            </ul>
        </div>
        <div class="list">
            <p class='title'>账号设置</p>
             <ul>
                <router-link tag="li" to="/other/UserInfo">
                    <span>
                        <img class='icon' src="../../assets/img/icon-grzl.png" alt="">个人资料
                    </span>
                    <span><i class='iconfont icon-right'></i></span>
                </router-link>
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
        <div class="logout" @click='logout' v-if='username'>
            退出登录
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
                point:window.sessionStorage.getItem('point')
            }
        },
        methods:{
            logout(){
                window.sessionStorage.clear();
                this.$router.push('/other/login')
                this.$store.commit('setUser',{})
            }
        },
        computed:{
            user:function(){
                return this.$store.state.user
            }
        },
        components:{
            BottomBar
        },
        created(){
            if(window.sessionStorage.getItem('token')){
                this.$store.dispatch('getUser')
            }
        }
        
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
                    margin-left: 40%;
                    span{
                        width:100%;
                        display: inline-block;
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
              //  background-color: #666;
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
                    float: right;
                    margin-right:.2rem;
                    text-decoration: underline;
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
    .logout{
        text-align: center;
        line-height: .7rem;
        display: block;
        margin:auto;
        margin-top:.5rem;
        width: 6rem;
        height: 0.7rem;
        background-color: #DD5519;
        color:#fff;
        border-radius:.1rem;
        border:0;
        font-size:.32rem;
    }
}
</style>

