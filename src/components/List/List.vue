<template>
    <div class="List">
        <div class="ListTop">
            <div class="ListName">榜单</div>
            <div class="Tab">
                <mt-navbar class="TabList" v-model="selected">
                    <div class="TabContainer ">
                      <mt-tab-item id="1" class="TabName mint-tab-item-label">发布榜单</mt-tab-item>
                     </div>
                    <div class="TabContainer ">
                      <mt-tab-item id="2" class="TabName mint-tab-item-label">接单榜单</mt-tab-item>
                     </div>
                </mt-navbar>
            </div>
        </div>
        <img class="banner" src="../../assets/List/banner.png">
        <div class="ListTime">
            <img class="DateBtn" @click="ClickTime(1)" :src="type===1 ? DayShow : Day">
            <img class="DateBtn" @click="ClickTime(2)" :src="type===2 ? WeekShow : Week">
            <img class="DateBtn" @click="ClickTime(3)" :src="type===3 ? MonthShow : Month">
        </div>
        <div class="ListTop10">
                <div class="ListTopTitle">
                    <div class="ListItem">排名</div>
                    <div class="ListItem">发布订单</div>
                    <div class="ListItem">用户名称</div>
                </div>
            <div class="ListTopUser" v-for="(item,index) in Publishusers">
                <div class="ListItem" v-bind:class=" index < 3 ? 'ListTop3 img':'ListTop7'">
                    {{index+1}}
                     <!--<img v-if = "index < 3 && index > -1"  src="../../assets/medal.png">-->
                </div>
                <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{item.OderNum}}</div>
                <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{item.UserName}}</div>
            </div>
        </div>
        <div style="height: 1.7rem;background: #ffffff"></div>
        <bottom-bar/>
    </div>

</template>

<script>
    import bottomBar from '../bottomBar'
    export default {
        name: "List",
        components:{
            bottomBar
        },
        data(){
            return{
                type:1,
                selected:'1',
                Listtype:1,
                Publishusers:[
                    {
                        "OderNum": "15231",
                        "UserName":"Fred"
                    },
                    {
                        "OderNum": "9695",
                        "UserName":"Day"
                    },
                    {
                        "OderNum": "8235",
                        "UserName":"Grey"
                    },
                    {
                        "OderNum": "7452",
                        "UserName":"Grey"
                    },
                    {
                        "OderNum": "6235",
                        "UserName":"Grey"
                    },
                    {
                        "OderNum": "5235",
                        "UserName":"Grey"
                    }
                ],
                Day:require('../../assets/List/Day.png'),
                DayShow:require('../../assets/List/DayShow.png'),
                Week:require('../../assets/List/Week.png'),
                WeekShow:require('../../assets/List/WeekShow.png'),
                Month:require('../../assets/List/Month.png'),
                MonthShow:require('../../assets/List/MonthShow.png')
            }
        },
        watcher:{
        },
        methods:{
          ClickTime:function (i) {
              this.type = i
              if(this.type === 1 ){
                  console.log("Day is show")
              }
              if(this.type === 2 ){
                  console.log("Week is show")
              }
              if(this.type === 3 ){
                  console.log("Month is show")
              }
          }
        },
    }
</script>

<style scoped>
.List{
    display: flex;
    flex-direction: column;
    background: #ffffff;
}
.ListTop{
    height: .9rem;
    display: flex;
    background: #FCA62F;
}
.ListName{
    font-size: .35rem;
    color: #ffff;
    flex-grow: 2;
    text-align: left;
    margin: 0.3rem;
}
.Tab{
    display: flex;
    justify-content: space-around;
    flex-grow: 1;
    align-items: flex-end;
}
.TabList{
    background: #FCA62F;
    font-size: .24rem;
    margin-bottom: .1rem;
}
.TabContainer{
 margin: 0 .1rem 0 .3rem;
}
.TabName {
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: .04rem solid #DD5519;
    color: #fff;
}
.mint-navbar .mint-tab-item {
    padding: .1rem 0;
    font-size: .15rem;
}
.mint-tab-item-label {
    color: inherit;
    font-size: .23rem;
    line-height: 1;
}
.banner{
    height: 2.6rem;
    width: 100%;
}
.Week{}
.WeekShow{}
.Week{}
.WeekShow{}
.Week{}
.WeekShow{}
.ListTopTitle{
    font-size: .24rem;
    display: flex;
    color: #DD5519;
    height: .7rem;
    justify-content: space-around;
    align-items: center;
    border-bottom: .02rem solid #B3B3B3;
}
.ListTopUser{
    font-size: .24rem;
    display: flex;
    color: #000000;
    height: .7rem;
    justify-content: space-around;
    align-items: center;
    border-bottom: .02rem solid #B3B3B3;
}
.ListItem{
    width: 1rem;
    text-align: center;
}
.ListTop3{
    color: #FCA62F;
}
.ListTop7{
    color:#404040 ;
}
.img{
    color: #B53026;
    width: 1rem;
    height: 100%;
    line-height: .5rem;
    background: url("../../assets/List/medal.png") center center no-repeat;
}
.ListTime{
    height: 1.35rem;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.DateBtn{
    width: 1.4rem;
    height: .5rem;
}
</style>