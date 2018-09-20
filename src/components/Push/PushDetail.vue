<template>
    <div class="PushContainer">
        <div class="PushTop">我的发布</div>
       <div class="Basic">
           <div class="BasicInfo">
               <div class="BasicName">基本信息</div>
               <!--<div class="ImportantIcon">*</div>-->
           </div>
           <div class="BasicContainer">
             <div class="BasicCate">
              <div class="Name">
                  <img class="Pic" src="../../assets/Push/cate.png">
                  <div>分类</div>
              </div>
                 <select class="Cate" v-model="CateSelectOne" >
                     <option disabled value="">一级分类</option>
                 <option v-for="one in AllCate" v-bind:value="one.id">{{one.name}}</option>
                 </select>
                 <select class="Cate" v-model="CateSelectTwo">
                     <option disabled value="">二级分类</option>
                     <option v-for="two in TwoCate" v-bind:value="two.id">{{two.name}}</option>
                 </select>
                 <select class="Cate" v-model="CateSelectThree">
                     <option disabled value="">三级分类</option>
                     <option v-for="three in ThreeCate" v-bind:value="three.id">{{three.name}}</option>
                 </select>
             </div>
             <div class="BasicArea">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/area.png">
                     <div>地区</div>
                 </div>
                 <div class="cityName"  v-on:click="chooseCity">{{showCity.province}} {{showCity.city}} {{showCity.area}}
                   <div v-if="!SelectCity" v-on:click="chooseCity" style="color: #757575;">点击选择省市区</div>
                 </div>
                 <div class="slayer" v-show="SelectCity">
                     <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
                 </div>
             </div>
             <div class="BasicTitle">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/title.png">
                     <div>标题</div>
                 </div>
                 <input placeholder="请输入标题" class="InputBig" v-model="PushObject.title">
             </div>
             <div class="BasicPrice">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/price.png">
                     <div>价格</div>
                 </div>
                 <input placeholder="请输入价格（积分）" class="Input" v-model="PushObject.price" onkeyup="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')">
             </div>
             <div class="BasicTimes">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/times.png">
                     <div>次数</div>
                 </div>
                 <input placeholder="请输入次数" class="Input" v-model="PushObject.number" onkeyup="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')">
             </div>
             <div class="BasicCycle">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/cycle.png">
                     <div>周期</div>
                 </div>
                 <input placeholder="请输入完成周期" class="Input" v-model="PushObject.cycle" onkeyup="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')">
                 <select class="Cate" v-model="CycleSelect">
                     <option v-for=" Cycle in CycleType" v-bind:value="Cycle">{{Cycle}}</option>
                 </select>
             </div>
           </div>
       </div>
       <div class="Extra">
           <div class="ExtraInfo">
               <div class="ExtraName">信息补充</div>
               <!--<div class="ImportantIcon">*</div>-->
           </div>
           <div class="ExtraVideo">
               <div class="Name">
                   <img class="Pic" src="../../assets/Push/video.png">
                   <div>视频</div>
               </div>
               <input placeholder="请输入视频链接" class="Input" v-model="PushObject.video_url">
           </div>
           <div class="ExtraPlu">
               <div style="display: flex;">
                <div class="Name">
                   <img class="Pic" src="../../assets/Push/file.png">
                   <div>附件</div>
               </div>
                 <file-upload  class="SelectBtn"
                                      v-model="files"
                                      @input-filter="ExtraFiles"
                                      name="file"
                                      ref="upload1">
                   选择附件
               </file-upload>
                 <ul>
                     <li v-for="(file, index) in files" :key="file.id">
                       <span style="color: #E05417;text-decoration: underline; margin-left: .3rem">{{file.name}}</span>
                       <i class="iconfont icon-delete" style="color:#717171;font-size: .30rem; margin-left: .3rem;" @click.prevent="remove(file,1)"></i>
                   </li>
                 </ul>
               </div>
               <div style="display: flex;margin-left: 18%;align-items: baseline;" v-on:click="encryptionCheck" v-if="Showencryption" :class="encryption ? 'check':'uncheck'">
                   <i class="iconfont icon-check"></i>
                   <div style=" margin-left: 0.1rem;">文件加密</div>
               </div>
           </div>
       </div>
       <div class="Describe">
           <div class="DescribeInfo">
               <div class="DescribeName">详情描述</div>
               <!--<div class="ImportantIcon">*</div>-->
           </div>
           <textarea placeholder="请输入描述" class="DescribeWord" v-model="PushObject.describe"></textarea>
           <div class="DescribePic" style="display: flex;flex-direction: column-reverse;">
               <ul style="display: flex; flex-wrap: wrap;">
                   <li style="width: 25%;" v-for="(image, index) in images" :key="image.id">
                       <img v-if="image.thumb" :src="image.thumb" width="60" height="auto" />
                       <i class="iconfont icon-delete" style="color: #DD551B;position: absolute;margin-left: -0.1rem; margin-top: -0.1rem;" @click.prevent="remove(image,2)"></i>
                   </li>
                   <file-upload class="AddPic"
                                post-action="http://www.youbian.link/api/v2/release/img"
                                v-model="images"
                                :multiple="true"
                                extensions="jpg,jpeg,png,webp"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                @input-filter = "AddPic"
                                name="img"
                                ref="upload2">
                       <i style="font-size: 0.7rem;color: #98999B;" class="iconfont icon-add"></i>
                       <div style="color: #98999B;">添加</div>
                   </file-upload>
               </ul>
           </div>

       </div>
       <div class="ConfirmBtn" v-on:click="ConfirmPush()">确认发布</div>
        <bottom-bar/>

    </div>
</template>
<script>
    import bottomBar from '../bottomBar'
    import VDistpicker from "v-distpicker/src/Distpicker";
    import { mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    export default {
        name: "PushDetail",
        components: {
            VDistpicker,
            bottomBar,
        },
        data(){
            return{
                PushObject:{},
                sheetVisible:false,
                SelectCity:false,
                showCity:{},
                CateSelectOne:'',
                CateSelectTwo:'',
                TwoCate:[],
                CateSelectThree:'',
                CycleSelect:'天',
                ThreeCate:[],
                actions:[
                    {
                       name:"拍照",
                       method:this.TakePic
                    },{
                       name:"打开相册",
                       method:this.OpenLiberay
                    }
                ],
                encryption:false,
                Showencryption:false,
                files:[],
                images:[],
                CycleType:['分钟','小时','天','月']
            }
        },
        mounted(){
            this.$store.dispatch('getHomeBanner')
        },
        watch: {
            AllCate: function (val) {
                console.log(val)
            },
            CateSelectOne:function(val){
                console.log(val)
                this.TwoCate = this.AllCate[val-1].son
                this.PushObject.level_one = val
                this.ThreeCate = ''
            },
            CateSelectTwo:function(val){
                console.log(val)
                console.log(this.TwoCate)
                for(var i in this. TwoCate){
                    if(val == this.TwoCate[i].id){
                        this.ThreeCate = this.TwoCate[i].sons
                    }
                }
                console.log(this.ThreeCate)
              //  this.ThreeCate = this.TwoCate[val-11].sons
                this.PushObject.level_two = val
            },
            CateSelectThree:function(val){
                this.PushObject.level_three = val
                console.log(this.PushObject)
            },
            files:function (val) {
                console.log("watch")
                console.log(val)
            },
            images:function (val) {
                console.log(val)
            }
        },
        computed:{
            ...mapState({
                AllCate:'AllCate',
            })
        },
        methods:{
            AddPic(newFile,oldFile){
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
                    if (!this.$refs.upload2.active) {
                        this.$refs.upload2.active = true
                    }
                }
            },
            TakePic:function(){
                console.log("拍照")
            },
            OpenLiberay:function(){
                console.log("打开相册")
                console.log(this.$refs)
                let fileList = this.$refs.file.files
                console.log(fileList)

            },
            chooseCity(){
                this.SelectCity = true
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
            CateOneSelect(oneindex){
                console.log(oneindex)
            },
            ExtraFiles(newFile,oldFile){
                this.Showencryption = true
                if (newFile && !oldFile) {
                    // add
                    this.PushObject.file = newFile.file
                    console.log(this.PushObject.file)
                    console.log('add', newFile)
                }
                if (newFile && oldFile) {
                    // update
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }
            },
            encryptionCheck(){
                this.encryption = !this.encryption
            },
            remove(File,index) {
                console.log(this.files)
                console.log(this.$refs)
                if(index==1){
                    this.$refs.upload1.remove(File)
                    this.Showencryption = false
                }
                if(index==2){
                    this.$refs.upload2.remove(File)
                }
                console.log(this.files)
            },
            ConfirmPush:function () {
                var Token = window.sessionStorage.getItem('token')
                if (Token) {
                    console.log(this.images)
                    var resUrl = []
                    for (var i in this.images) {
                        resUrl.push(this.images[i].response.data)
                    }
                    this.PushObject.resUrl = resUrl.toString()
                    if(this.encryption){
                        this.PushObject.encryption = 1
                    }
                    var _this = this
                    this.$axios.post('/release/release_info', {
                        level_one: this.PushObject.level_one,
                        level_two: this.PushObject.level_two,
                        level_three: this.PushObject.level_three,
                        title: this.PushObject.title,
                        price: this.PushObject.price,
                        number: this.PushObject.number,
                        cycle: this.PushObject.cycle+this.CycleSelect,
                        describe: this.PushObject.describe,
                        province_code: this.PushObject.province_code,
                        city_code: this.PushObject.city_code,
                        area_code: this.PushObject.area_code,
                        video_url: this.PushObject.video_url,
                        file: this.PushObject.file,
                        encryption: this.PushObject.encryption,
                        img: this.PushObject.resUrl
                    }, {
                        headers: {
                            'token': window.sessionStorage.getItem('token')
                        }
                    })
                        .then(function (response) {
                            console.log(response)
                            Toast({
                                message: response.data.message,
                                position: 'middle',
                                duration: 4000
                            });
                            setTimeout(function () {
                                if(response.data.code==200){
                                    _this.$router.push('/user')
                                }
                            },1000)
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
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
            }
        },
    }
</script>

<style lang="less" scoped>

.PushContainer{
    width: 100%;
    padding-bottom: 1.7rem;
.PushTop{
    height: .80rem;
    background: #FCA62F;
    font-size: 0.40rem;
    color: #ffff;
    text-align: center;
    line-height: .8rem;
}
.ImportantIcon{
    color: #dd5519;
    font-size: .4rem;
    line-height: 0.75rem;
    height: .6rem;
}
.Name{
    display: flex;
}
.cityName{
        height: 60%;
        border-radius: 0.05rem;
        border: 0.01rem solid #E2E2E2;
        background: #F4F4F4;
        width: 5rem;
        margin-left: 0.2rem;
        padding-left: 0.1rem;
        overflow: hidden;
        line-height: .5rem;
}
.Cate{
    height: 60%;
    border-radius: 0.05rem;
    border: 0.01rem solid #E2E2E2;
    background: #F4F4F4;
    width: 1.56rem;
    margin-left: 0.2rem;
    padding-left: 0.1rem;
    font-size: 0.20rem;
}
/*.chooseCity{*/
        /*width: 1.2rem;*/
        /*height: .4rem;*/
        /*background: #DD5519;*/
        /*float: right;*/
        /*margin-top: .05rem;*/
        /*margin-right: .05rem;*/
        /*color: #fff;*/
        /*font-size: .22rem;*/
        /*text-align: center;*/
        /*line-height: .4rem;*/
        /*border-radius: .4rem;*/
 /*}*/
.slayer{
    position: absolute;
    width: 100%;
    height: 100%;
    /* float: right; */
    top: 0;
    margin-left: -.3rem;
    /* padding-left: 1.5rem; */
    /* padding-top: 1.8rem; */
    background: #9999;
    padding-bottom: 13rem;
    z-index: 1;
}
.Pic{
    width: .4rem;
    height: .4rem;
    margin-right: .2rem;
}
.Input{
    height: 60%;
    border-radius: .05rem;
    border: 0.01rem solid #E2E2E2;
    background: #F4F4F4;
    width: 3rem;
    margin-left: .2rem;
    padding-left: .1rem;
}
.InputBig{
    height: 60%;
    border-radius: .05rem;
    border: 0.01rem solid #E2E2E2;
    background: #F4F4F4;
    width: 5rem;
    margin-left: .2rem;
    padding-left: .1rem;
}
.SelectBtn{
        width: 1.2rem;
        height: .4rem;
        background: #dd5519;
        color: #fff;
        border-radius: .1rem;
        font-size: .20rem;
        text-align: center;
        line-height: .4rem;
        margin-left: .2rem;
 }
.Basic{
     margin: .2rem 0;
     height: 6rem;
     background: #fff;
    .BasicInfo{
        display: flex;
        height: .6rem;
        border-bottom: 1px solid;
        .BasicName{
          font-size: .3rem;
          margin-left: .2rem;
            margin-right: 0.1rem;
            line-height: .6rem;
        }
    }
    .BasicContainer{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 5rem;
        margin-top: .1rem;
        margin-left: .3rem;
        .BasicCate{
            height: .833334rem;
            display: flex;
            align-items: center;
        }
        .BasicArea{
            height: .833334rem;
            display: flex;
            align-items: center;
        }
        .BasicTitle{
            height: .833334rem;
            display: flex;
            align-items: center;
        }
        .BasicPrice{
            height: .833334rem;
            display: flex;
            align-items: center;
        }
        .BasicTimes{
            height: .833334rem;
            display: flex;
            align-items: center;
        }
        .BasicCycle{
            height: .833334rem;
            display: flex;
            align-items: center;
        }
    }

}
.Extra{
    margin: .2rem 0;
    height: 3rem;
    background: #fff;
    .ExtraInfo{
        display: flex;
        height: .6rem;
        border-bottom: 1px solid;
        .ExtraName{
            font-size: .3rem;
            margin-left: .2rem;
            margin-right: 0.1rem;
            line-height: .6rem;
        }
    }
    .ExtraVideo{
        height: 30%;
        display: flex;
        align-items: center;
        margin-left: .3rem;
    }
    .ExtraPlu{
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: .3rem;
        .check{
            color:#0DC9BD
        }
        .uncheck{
            color: #2c3e50;
        }
    }
}
.Describe{
    margin: .2rem 0;
    height: 100%;
    background: #fff;
    .DescribeInfo{
        display: flex;
        height: .6rem;
        border-bottom: 1px solid;
        .DescribeName{
            font-size: .3rem;
            margin-left: .2rem;
            margin-right: 0.1rem;
            line-height: .6rem;
        }
    }
    .DescribeWord{
        height: 4rem;
        padding: 0.25rem 0.3rem;
        width: 83%;
        margin: 0.25rem 0.3rem;
    }
    .DescribePic{
        height: 30%;
        margin-bottom: .3rem;
        margin-left: .3rem;
    }
    .AddPic{
        width: 1.5rem;
        height: 1.5rem;
        background: #F4F4F4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
    .ConfirmBtn{
        width: 3rem;
        background-color: #DD5519;
        color: #fff;
        height: 0.7rem;
        line-height: .7rem;
        border-radius: 1rem;
        text-align: center;
        margin-top: 1.5rem;
        margin-left: 30%;
    }
}
</style>