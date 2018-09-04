<template>
    <div class="PushContainer">
        <div class="PushTop">我的发布</div>
       <div class="Basic">
           <div class="BasicInfo">
               <div class="BasicName">基本信息</div>
               <div class="ImportantIcon">*</div>
           </div>
           <div class="BasicContainer">
             <div class="BasicCate">分类</div>
             <div class="BasicArea">地区</div>
             <div class="BasicTitle">标题</div>
             <div class="BasicPrice">价格</div>
             <div class="BasicTimes">次数</div>
             <div class="BasicTime">周期</div>
           </div>
       </div>
       <div class="Extra">
           <div class="ExtraInfo">
               <div class="ExtraName">信息补充</div>
               <div class="ImportantIcon">*</div>
           </div>
           <div class="ExtraVideo">视频</div>
           <div class="ExtraPlu">附件</div>
       </div>
       <div class="Describe">
           <div class="DescribeInfo">
               <div class="DescribeName">详情描述</div>
               <div class="ImportantIcon">*</div>
           </div>
           <div class="DescribeWord">详情描述</div>
           <div class="DescribePic"></div>
       </div>
       <div class="ConfirmBtn" v-on:click="ConfirmPush()">确认发布</div>
        <bottom-bar/>
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
                PushObject:{}
            }
        },
        methods:{
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
          margin-left: .5rem;
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
        .BasicCate{
            height: 16.666667%;
        }
        .BasicArea{
            height: 16.666667%;
        }
        .BasicTitle{
            height: 16.666667%;
        }
        .BasicPrice{
            height: 16.666667%;
        }
        .BasicTimes{
            height: 16.666667%;
        }
        .BasicTime{
            height: 16.666667%;
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
            margin-left: .5rem;
            margin-right: 0.1rem;
            line-height: .6rem;
        }
    }
    .ExtraVideo{
        height: 30%;
    }
    .ExtraPlu{
        height: 50%;
    }
}
.Describe{
    margin: .2rem 0;
    height: 6rem;
    background: #fff;
    .DescribeInfo{
        display: flex;
        height: .6rem;
        border-bottom: 1px solid;
        .DescribeName{
            font-size: .3rem;
            margin-left: .5rem;
            margin-right: 0.1rem;
            line-height: .6rem;
        }
    }
    .DescribeWord{
        height: 55%;
        padding: 0.25rem 0.3rem;
    }
    .DescribePic{
        height: 30%;
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