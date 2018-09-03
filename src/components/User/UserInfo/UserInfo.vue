<template>
    <div class="UserInfo">
        <!--<div class="TopBar"  v-on:click="Back()">-->
            <!--<i class="iconfont icon-Left Back TopSize" ></i>-->
            <!--<div class="TopSize" >&nbsp详情</div>-->
        <!--</div>-->
        <div class="protrait">
            <div style="width: 1.12rem;height: 0.64rem; line-height: .64rem;">头像</div>
        <img  class="protraitImage" src="../../../assets/img/default.jpg">
        </div>
        <div class="list">
            <ul>
            <li>
                <span>
                         <div class='icon'  alt="">昵称</div>
                    </span>
                <span>{{UserInfo.name}}</span>
            </li>
            <li>
                    <span>
                        <div class='icon'  alt="">性别</div>
                    </span>
                <span>{{UserInfo.sex|sex}}</span>
            </li>
            <li>
                    <span>
                        <div class='icon' alt="">地址</div>
                    </span>
                <span>{{UserInfo.province_code+UserInfo.city_code+UserInfo.area_code}}</span>
            </li>
                <li>
                    <span>
                        <div class='icon' alt="">手机</div>
                    </span>
                    <span>{{UserInfo.phone}}</span>
                </li>
        </ul></div>
        <div class="UserIdCard">
             <div class="UserIdName">
                 <div class="IdName">真实姓名</div>
                 <div class="IdName">{{UserInfo.rel_name|rel_name}}</div>
             </div>
             <div class="UserIdName">
                 <div class="IdName">身份证号</div>
                 <div class="IdName">{{UserInfo.id_card|id_card}}</div>
             </div>
        </div>
        <div class="ChangeInfo" @click='ChangeInfo()' >
            修改信息
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "UserInfo",
        filters:{
            sex:function (val) {
                if(val==1){
                    return '男'
                }
                if(val==2){
                    return '女'
                }
                else
                    return '未设置'
            },
            rel_name:function (val) {
                if(val==null){
                    return '未设置'
                }
            },
            id_card:function (val) {
                if(val==null){
                    return '未设置'
                }
                else{
                    var len = str.length-3-3;
                    var xing = '';
                    for (var i=0;i<len;i++) {
                        xing+='*';
                    }
                    return str.substring(0,3)+xing+str.substring(str.length-3);
                }
            }
        },
        watch:{
            UserInfo:function (val) {
                //do method again
                console.log(val)
            }
        },
        computed:{
            ...mapState({
                UserInfo:'UserInfo',
            })
        },
        mounted(){
            this.$store.dispatch('getUserInfo')
        },
        methods:{
            Back:function(){
                this.$router.go(-1)
            },
            ChangeInfo:function () {
                  this.$router.push('/other/ChangeUserInfo')
            }
        }
    }
</script>

<style lang="less" scoped>
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
    .protrait{
        display: flex;
        background: #fff;
        border-bottom: 0.01rem solid #eaeaea;
        /* flex-direction: row; */
        justify-content: space-between;
        padding: 0 0.2rem 0 0.4rem;
        margin-top: 0.2rem;
        align-items: flex-end;
        color: #1A1A1A;
    }
    .protraitImage{
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
    }
    .UserIdCard{
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-top: 0.3rem;
        padding-bottom: 0.4rem;
    }
    .UserIdName{
        display: flex;
        height: 0.65rem;
        justify-content: space-between;
        padding: 0 0.4rem;
        border-bottom: 0.01rem solid #eaeaea;
    }
    .IdName{
        color: #595959;
        height: .64rem;
        line-height: .64rem;
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
        color:#595959;
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
    .ChangeInfo{
        text-align: center;
        line-height: .7rem;
        display: block;
        margin:auto;
        margin-top:2.5rem;
        width: 6rem;
        height: 0.7rem;
        background-color: #DD5519;
        color:#fff;
        border-radius:.1rem;
        border:0;
        font-size:.32rem;
    }
</style>