<template>
    <div class="ChangeInfoContainer">
    <div class="ChangeUserInfo">
        <div class="ChangeProtrait">
            <file-upload class="AddPic"
                         post-action="http://www.youbian.link/api/v2/release/img"
                         v-model="images"
                         extensions="jpg,jpeg,png,webp"
                         accept="image/png,image/jpeg,image/jpg,image/webp"
                         @input-filter = "AddPic"
                         name="img"
                         ref="upload">
                <li style="width: 25%;" v-for="(image, index) in images" :key="image.id">
                    <img v-if="image.thumb" :src="image.thumb" class="protraitImage" />
                </li>
                <img v-if="showdefualtpic" class="protraitImage" src="../../../assets/img/default.jpg">
          <div class="ProtraitWord">修改头像</div>
             </file-upload>
        </div>
        <div class="list">
            <ul>
                <li>
                <span>
                         <div class='icon'  alt="">昵称</div>
                    </span>
                    <input :placeholder="UserInfo.name" class="Input" v-model="PushObject.name">
                </li>
                <li>
                    <span>
                        <div class='icon'  alt="">性别</div>
                    </span>
                    <div style="display: flex;width: 2rem;justify-content: space-between;">
                        <div>
                         <input type="radio" id="female" value="1" v-model="picked">
                         <label for="female">女</label>
                        </div>
                        <div>
                          <input type="radio" id="male" value="2" v-model="picked">
                          <label for="male">男</label>
                        </div>
                    </div>
                </li>
                <li>
                    <span>
                        <div class='icon' alt="">地址</div>
                    </span>
                    <div>
                        <div class="cityName"  v-on:click="chooseCity">{{showCity.province}} {{showCity.city}} {{showCity.area}}
                            <div v-if="!SelectCity" v-on:click="chooseCity" style="color: #757575;">点击选择省市区</div>
                        </div>
                    </div>
                </li>
                <li>
                    <span>
                        <div class='icon' alt="">手机</div>
                    </span>
                    <div style="display: flex;"  v-on:click="changePhone">
                        <div>{{UserInfo.phone|phone}}</div>
                        <img  style="height: .2rem;margin-top: .22rem; margin-left: 0.1rem;" src="../../../assets/changphone.png">
                    </div>
                </li>
            </ul>
        </div>
        <!--<div class="slayer" v-show="SelectCity">-->
            <!--<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>-->
        <!--</div>-->
        <van-popup v-model="SelectCity" position="bottom" :overlay="true">
            <van-area  :area-list="areaList" :columns-num="3" @confirm="CitySelected" @cancel="CityCancel" />
        </van-popup>
        <div class="UserIdCard">
            <div class="UserIdName">
                <div class="IdName">真实姓名</div>
                <div class="IdName">{{UserInfo.rel_name|rel_name}}</div>
            </div>
            <div class="UserIdName">
                <div class="IdName">身份证号</div>
                <div class="IdName" style="display: flex;" v-on:click="changeId">
                    <div>
                        {{UserInfo.id_card|id_card}}
                    </div>
                    <img  style="height: .2rem;margin-top: .24rem;margin-left: 0.1rem;" src="../../../assets/changeid.png">
                </div>
            </div>
        </div>
        <div class="ChangeInfo" @click='CommitInfo()' >
            提交信息
        </div>
    </div>
    </div>
</template>

<script>
    import VDistpicker from "v-distpicker/src/Distpicker";
    import { Toast } from 'mint-ui';
    import {mapState} from 'vuex'
    import areaList from'../../../util/area'
    export default {
        name: "ChangeUserInfo",
        components: {
            VDistpicker,
        },
        data(){
            return{
                ChangeObject:{},
                images:[],
                picked:'',
                SelectCity:false,
                showCity:{},
                showdefualtpic:true,
                PushObject:{
                    province_code:'',
                    city_code:'',
                    area_code:''
                },
                areaList:areaList
            }
        },
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
            phone:function(val){
                if(val==null){
                    return '未设置'
                }
                else{
                    var len = val.length-3-3;
                    var xing = '';
                    for (var i=0;i<len;i++) {
                        xing+='*';
                    }
                    return val.substring(0,3)+xing+val.substring(val.length-3);
                }
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
                    var len = val.length-3-3;
                    var xing = '';
                    for (var i=0;i<len;i++) {
                        xing+='*';
                    }
                    return val.substring(0,3)+xing+val.substring(val.length-3);
                }
            }
        },
        watch:{
            UserInfo:function (val) {
                //do method again
                console.log(val)
                this.ChangeObject = this.UserInfo
                if(this.UserInfo.sex != 1 && this.UserInfo.sex != 2){
                    this.picked = 1
                }
                else{
                    this.picked = this.UserInfo.sex
                }
            },
            picked:function (val) {
                this.ChangeObject.sex = val
            },
            images:function (val) {
              console.log("watch")
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
            AddPic:function (newFile,oldFile) {
                if (newFile && !oldFile) {
                    // add
                    console.log('add', newFile)
                    // 创建 `blob` 字段 用于缩略图预览
                    newFile.blob = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                    // Thumbnails
                    // 缩略图
                    newFile.thumb = ''
                    if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                        newFile.thumb = newFile.blob
                    }
                    this.showdefualtpic =  false
                }
                if (newFile && oldFile) {
                    // update
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }
                //自动上传
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                    if (!this.$refs.upload.active) {
                        this.$refs.upload.active = true
                    }
                }
            },
            chooseCity(){
                this.SelectCity = true
            },
            CitySelected(data){
                this.showCity.province = data[0].name
                this.PushObject.province_code = data[0].code
                this.showCity.city = data[1].name
                this.PushObject.city_code = data[1].code
                this.showCity.area = data[2].name
                this.PushObject.area_code = data[2].code
                this.SelectCity =false
            },
            CityCancel(){
                this.SelectCity =false
            },
            onSelected(data) {
                //  alert(data.province + ' | ' + data.city + ' | ' + data.area)
                //        var city = new Object()
                this.showCity.province = data.province.value
                this.showCity.city = data.city.value
                this.showCity.area = data.area.value
                console.log(data)
                this.SelectCity = false
                this.PushObject.province_code = data.province.code
                this.PushObject.city_code = data.city.code
                this.PushObject.area_code = data.area.code
                console.log(this.PushObject)
            },
            changePhone:function () {
                console.log('changePhone')
                this.$router.push('/other/PhoneChange')
            },
            changeId:function () {
                console.log('changeID')
                this.$router.push('/other/IdChange')
            },
            CommitInfo:function(){
                console.log(this.images)
                var resUrl = []
                for(var i in this.images){
                    resUrl.push(this.images[i].response.data)
                }
                this.PushObject.resUrl = resUrl.toString()
                console.log(this.PushObject)
                var _this = this
                this.$axios.post('/user/user_edit',{
                    province_code:this.PushObject.province_code,
                    city_code:this.PushObject.city_code,
                    area_code:this.PushObject.area_code,
                    img:this.PushObject.resUrl,
                    name:this.PushObject.name,
                    sex:this.picked
                },{
                    headers:{
                        'token':window.sessionStorage.getItem('token')
                    }})
                    .then(function (response) {
                        if(response.data.code ==200){
                        Toast({
                            message: response.data.message,
                            position: 'middle',
                            duration: 4000
                        });
                        setTimeout(function () {
                            _this.$router.push('/other/UserInfo')
                        },800)
                        }
                        else{
                            Toast({
                                message: response.data.message,
                                position: 'middle',
                                duration: 4000
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
.Input{
    height: 90%;
    border-radius: 0.05rem;
    border: 0.01rem solid #fff;
    background: #fff;
    width: 3rem;
    margin-left: 0.2rem;
    padding-left: 0.1rem;
    text-align: right;
}
/*input[type="radio"]:checked + label::before {*/
    /*background-color: #01cd78;*/
    /*background-clip: content-box;*/
/*}*/
.cityName{
    height: 90%;
    border-radius: 0.05rem;
    border: 0.01rem solid #fff;
    background: #fff;
    width: 5rem;
    margin-left: 0.2rem;
    padding-left: 0.1rem;
    overflow: hidden;
    text-align: right;
}
.slayer{
    position: absolute;
    width: 100%;
    height: 100%;
    /* float: right; */
    top: 0;
    /* margin-left: -0.3rem; */
    /* padding-left: 1.5rem; */
    padding-top: .8rem;
    background: #9999;
    padding-bottom: 13rem;
    z-index: 1;
}
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