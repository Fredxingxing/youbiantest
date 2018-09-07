<template>
    <div class="PushContainer">
        <div class="PushTop">我的发布</div>
       <div class="Basic">
           <div class="BasicInfo">
               <div class="BasicName">基本信息</div>
               <div class="ImportantIcon">*</div>
           </div>
           <div class="BasicContainer">
             <div class="BasicCate">
              <div class="Name">
                  <img class="Pic" src="../../assets/Push/cate.png">
                  <div>分类</div>
              </div>
                 <select class="Cate" v-model="CateSelectOne" >
                 <option v-for="one in AllCate" v-bind:value="one.id">{{one.name}}</option>
                 </select>
                 <select class="Cate" v-model="CateSelectTwo">
                     <option v-for="two in TwoCate" v-bind:value="two.id">{{two.name}}</option>
                 </select>
                 <select class="Cate" v-model="CateSelectThree">
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
                 <input placeholder="请输入价格" class="Input" v-model="PushObject.price">
             </div>
             <div class="BasicTimes">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/times.png">
                     <div>次数</div>
                 </div>
                 <input placeholder="请输入次数" class="Input" v-model="PushObject.number">
             </div>
             <div class="BasicCycle">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/cycle.png">
                     <div>周期</div>
                 </div>
                 <input placeholder="请输入完成（如：1天）" class="Input" v-model="PushObject.cycle">
             </div>
           </div>
       </div>
       <div class="Extra">
           <div class="ExtraInfo">
               <div class="ExtraName">信息补充</div>
               <div class="ImportantIcon">*</div>
           </div>
           <div class="ExtraVideo">
               <div class="Name">
                   <img class="Pic" src="../../assets/Push/video.png">
                   <div>视频</div>
               </div>
               <input placeholder="请输入视频链接" class="Input" v-model="PushObject.video_url">
           </div>
           <div class="ExtraPlu">
               <div class="Name">
                   <img class="Pic" src="../../assets/Push/file.png">
                   <div>附件</div>
               </div>
               <file-upload  class="SelectBtn"
                                      v-model="files"
                                      @input = "inputFile()"
                                      ref="upload">
                   选择附件
               </file-upload>
               <ul>
                   <li v-for="(file, index) in files" :key="file.id">
                       <span>{{file.name}}</span>
                       <button type="button" @click.prevent="remove(file)">移除</button>
                   </li>
               </ul>
           </div>
       </div>
       <div class="Describe">
           <div class="DescribeInfo">
               <div class="DescribeName">详情描述</div>
               <div class="ImportantIcon">*</div>
           </div>
           <textarea placeholder="请输入描述" class="DescribeWord" v-model="PushObject.describe"></textarea>
           <div class="DescribePic">
               <file-upload class="AddPic"
                            post-action="http://www.youbian.link/api/v2/release/img"
                            v-model="images"
                            :multiple="true"
                            extensions="gif,jpg,jpeg,png,webp"
                            accept="image/png,image/gif,image/jpeg,image/webp"
                            @input = "AddPic()"
                            name="img"
                            ref="upload">
                   <i style="font-size: 0.7rem;color: #98999B;" class="iconfont icon-add"></i>
                   <div style="color: #98999B;">发布</div>
               </file-upload>
               <ul>
                   <li v-for="(image, index) in images" :key="image.id">
                       <span>{{image.name}}</span>
                       <button type="button" @click.prevent="remove(image)">移除</button>
                   </li>
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
                CateSelectOne:{},
                CateSelectTwo:{},
                TwoCate:[],
                CateSelectThree:{},
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
                files:[],
                images:[],
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
                this.TwoCate = this.AllCate[val-1].son
                this.PushObject.level_one = val
            },
            CateSelectTwo:function(val){
                //console.log(typeof (val)) number
                this.ThreeCate = this.TwoCate[val-11].sons
                this.PushObject.level_two = val
            },
            CateSelectThree:function(val){
                this.PushObject.level_three = val
                console.log(this.PushObject)
            },
            files:function (val) {
                console.log("watch")
                console.log(val)
                this.PushObject.file = val[0].file
                console.log(this.PushObject.file)
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
                    }
                    if (newFile && oldFile) {
                        // update
                        console.log('update', newFile)
                    }
                    if (!newFile && oldFile) {
                        // remove
                        console.log('remove', oldFile)
                    }
                    this.$refs.upload.active = true
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
            inputFile(newFile,oldFile){
                if (newFile && !oldFile) {
                    // add
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
            remove(file) {
                this.$refs.upload.remove(file)
            },
            ConfirmPush:function () {
                this.$axios.post('/release/release_info',{
                    level_one:this.PushObject.level_one,
                    level_two:this.PushObject.level_two,
                    level_three:this.PushObject.level_three,
                    title:this.PushObject.title,
                    price:this.PushObject.price,
                    number:this.PushObject.number,
                    cycle:this.PushObject.cycle,
                    describe:this.PushObject.describe,
                    province_code:this.PushObject.province_code,
                    city_code:this.PushObject.city_code,
                    area_code:this.PushObject.area_code,
                    video_url:this.PushObject.video_url,
                    file:this.PushObject.file,
                    encryption:this.PushObject.encryption,
                    img:this.PushObject.imgUrl
                },{
                    headers:{
                        'token':window.sessionStorage.getItem('token')
                    }})
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
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
    font-size: 0.1rem;
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
        align-items: center;
        margin-left: .3rem;
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