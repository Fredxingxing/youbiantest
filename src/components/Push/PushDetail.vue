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
                 <div>选择器</div>
             </div>
             <div class="BasicArea">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/area.png">
                     <div>地区</div>
                 </div>
                 <div>选择器</div>
             </div>
             <div class="BasicTitle">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/title.png">
                     <div>标题</div>
                 </div>
                 <input placeholder="请输入标题" class="InputBig">
             </div>
             <div class="BasicPrice">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/price.png">
                     <div>价格</div>
                 </div>
                 <input placeholder="请输入价格" class="Input">
             </div>
             <div class="BasicTimes">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/times.png">
                     <div>次数</div>
                 </div>
                 <input placeholder="请输入次数" class="Input">
             </div>
             <div class="BasicCycle">
                 <div class="Name">
                     <img class="Pic" src="../../assets/Push/cycle.png">
                     <div>周期</div>
                 </div>
                 <input placeholder="请输入完成（如：1天）" class="Input">
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
               <input placeholder="请输入视频链接" class="Input">
           </div>
           <div class="ExtraPlu">
               <div class="Name">
                   <img class="Pic" src="../../assets/Push/file.png">
                   <div>附件</div>
               </div>
               <div>选择器</div>
           </div>
       </div>
       <div class="Describe">
           <div class="DescribeInfo">
               <div class="DescribeName">详情描述</div>
               <div class="ImportantIcon">*</div>
           </div>
           <textarea placeholder="请输入描述" class="DescribeWord"></textarea>
           <div class="DescribePic">
               <div class="AddPic" v-on:click="AddPic()">
                   <i style="font-size: 0.7rem;color: #98999B;" class="iconfont icon-add"></i>
                   <div style="color: #98999B;">发布</div>
               </div>
           </div>

       </div>
       <div class="ConfirmBtn" v-on:click="ConfirmPush()">确认发布</div>
        <bottom-bar/>
        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>
<script>
    import bottomBar from '../bottomBar'
    export default {
        name: "PushDetail",
        components: {
            bottomBar
        },
        data(){
            return{
                PushObject:{},
                sheetVisible:false,
                actions:[
                    {
                       name:"拍照",
                       method:this.TakePic
                    },{
                       name:"打开相册",
                       method:this.OpenLiberay
                    }
                ]
            }
        },
        methods:{
            AddPic:function(){
                //打开动作显示菜单
              this.sheetVisible = true
            },
            TakePic:function(){
                console.log("拍照")
            },
            OpenLiberay:function(){
                console.log("打开相册")
                
            },
            ConfirmPush:function () {
                this.$axios.post('/release/release_info',{
                    level_one:this.PushObject.level_one,
                    level_two:this.PushObject.level_two,
                    level_three:this.PushObject.level_three,
                    price:this.PushObject.price,
                    number:this.PushObject.number,
                    cycle:this.PushObject.cycle,
                    describe:this.PushObject.describe,
                    province_code:this.PushObject.province_code,
                    city_code:this.PushObject.city_code,
                    video_url:this.PushObject.video_url,
                    file:this.PushObject.file,
                    encryption:this.PushObject.encryption,
                })
                .then(function (response) {
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