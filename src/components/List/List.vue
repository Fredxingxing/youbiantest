<template>
    <div class="List">
        <div class="ListTop">
            <div class="ListName">榜单</div>
            <div class="Tab">
                <mt-navbar class="TabList" v-model="Listselected">
                    <div class="TabContainer ">
                      <mt-tab-item id="1" class="TabName mint-tab-item-label">发布榜单</mt-tab-item>
                     </div>
                    <div class="TabContainer ">
                      <mt-tab-item id="2" class="TabName mint-tab-item-label">接单榜单</mt-tab-item>
                     </div>
                </mt-navbar>
            </div>
        </div>
        <mt-tab-container v-model="Listselected">
            <mt-tab-container-item id="1">
                <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
                <img class="banner" src="../../assets/List/banner.png">
                <div class="ListTime">
                    <img class="DateBtn" @click="ClickTime(1)" :src="Listtype===1 ? DayShow : Day">
                    <img class="DateBtn" @click="ClickTime(2)" :src="Listtype===2 ? WeekShow : Week">
                    <img class="DateBtn" @click="ClickTime(3)" :src="Listtype===3 ? MonthShow : Month">
                </div>
                <div class="ListTop10">
                    <div class="ListTopTitle">
                        <div class="ListItem">排名</div>
                        <div class="ListItem">发布订单</div>
                        <div class="ListItem">用户名称</div>
                    </div>
                    <div class="ListTopUser" v-for="(users,index) in PublishList">
                        <div class="ListItem" v-bind:class=" index < 3 ? 'ListTop3 img':'ListTop7'">
                            {{index+1}}
                            <!--<img v-if = "index < 3 && index > -1"  src="../../assets/medal.png">-->
                        </div>
                        <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{users.sum}}</div>
                        <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{users.get_user.name}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
                <img class="banner" src="../../assets/List/banner.png">
                <div class="ListTime">
                    <img class="DateBtn" @click="ClickTime(1)" :src="Listtype===1 ? DayShow : Day">
                    <img class="DateBtn" @click="ClickTime(2)" :src="Listtype===2 ? WeekShow : Week">
                    <img class="DateBtn" @click="ClickTime(3)" :src="Listtype===3 ? MonthShow : Month">
                </div>
                <div class="ListTop10">
                    <div class="ListTopTitle">
                        <div class="ListItem">排名</div>
                        <div class="ListItem">接单订单</div>
                        <div class="ListItem">用户名称</div>
                    </div>
                    <div class="ListTopUser" v-for="(users,index) in TakenList">
                        <div class="ListItem" v-bind:class=" index < 3 ? 'ListTop3 img':'ListTop7'">
                            {{index+1}}
                            <!--<img v-if = "index < 3 && index > -1"  src="../../assets/medal.png">-->
                        </div>
                        <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{users.sum}}</div>
                        <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{users.get_user.name}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div style="height: 1.05rem;background: #ffffff"></div>
        <bottom-bar/>
    </div>

</template>

<script>
    import bottomBar from '../bottomBar'
    import { mapState } from 'vuex'
    export default {
        name: "List",
        components:{
            bottomBar
        },
        data(){
            return{
                Listselected:'1',
                Listtype:3,
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
        watch:{
            PublishList:function (val) {
                //user_id
            },
            TakenList:function (val) {
            },
            Listselected:function (val) {
                if(val==1){
                    this.$store.dispatch('getPublishList',this.Listtype)
                }
                if(val==2){
                    this.$store.dispatch('getTakenList',this.Listtype)
                }
            }
        },
        computed:{
            ...mapState({
                PublishList:'PublishList',
                TakenList:'TakenList'
            })
        },
        mounted(){
            if(this. Listselected === '1'){ //发布
                this.$store.dispatch('getPublishList',this.Listtype)
            }
            if(this. Listselected === '2'){ //接单
                this.$store.dispatch('getTakenList',this.Listtype)
            }
        },
        methods:{
          ClickTime:function (i) {
              if(this. Listselected === '1'){//发布
                  this.Listtype = i
                  if(this.Listtype === 1 ){
                      this.$store.dispatch('getPublishList',this.Listtype)
                  }
                  if(this.Listtype === 2 ){
                      this.$store.dispatch('getPublishList',this.Listtype)
                  }
                  if(this.Listtype === 3 ){
                      this.$store.dispatch('getPublishList',this.Listtype)
                  }
          }
              if(this. Listselected=== '2'){//接单
                  this.Listtype = i
                  if(this.Listtype === 1 ){
                      this.$store.dispatch('getTakenList',this.Listtype)
                  }
                  if(this.Listtype === 2 ){
                      this.$store.dispatch('getTakenList',this.Listtype)
                  }
                  if(this.Listtype === 3 ){
                      this.$store.dispatch('getTakenList',this.Listtype)
                  }
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
    width: 100%;
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