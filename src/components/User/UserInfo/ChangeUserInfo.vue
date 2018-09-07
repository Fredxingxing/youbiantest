<template>
    <div class="ChangeInfoContainer">
    <div class="ChangeUserInfo">
        <div class="ChangeProtrait">
          <img  class="protraitImage" src="../../../assets/img/default.jpg">
          <div class="ProtraitWord">修改头像</div>
        </div>
        <div class="list">
            <ul>
                <li>
                <span>
                         <div class='icon'  alt="">昵称</div>
                    </span>
                    <span></span>
                </li>
                <li>
                    <span>
                        <div class='icon'  alt="">性别</div>
                    </span>
                    <span></span>
                </li>
                <li>
                    <span>
                        <div class='icon' alt="">地址</div>
                    </span>
                    <span></span>
                </li>
                <li>
                    <span>
                        <div class='icon' alt="">手机</div>
                    </span>
                    <span></span>
                </li>
            </ul>
        </div>
        <div class="UserIdCard">
            <div class="UserIdName">
                <div class="IdName">真实姓名</div>
                <div class="IdName"></div>
            </div>
            <div class="UserIdName">
                <div class="IdName">身份证号</div>
                <div class="IdName"></div>
            </div>
        </div>
        <div class="ChangeInfo" @click='ChangeInfo()' >
            修改信息
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "ChangeUserInfo"
    }
</script>

<style lang="less" scoped>
.ChangeInfoContainer{
    width: 100%;
}
.protraitImage{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    margin-top: .1rem;
    /*left: 50%;*/
    /*margin-left: -.45rem;*/
    /*position: absolute;*/
}
.ChangeUserInfo{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.ChangeProtrait{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.ProtraitWord{
    /*margin-top: 1rem;*/
    margin-top: 0.1rem;
    color:#E17343;
    font-size: .12rem;
    text-align: center;
    margin-bottom: 0.1rem;
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