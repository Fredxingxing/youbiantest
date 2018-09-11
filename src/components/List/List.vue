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
                <div v-if="PublishList!=undefined" class="ProtraitBox">
                    <div class="ProtraitContainer">
                <img class="Protrait2" v-if="PublishList[1] !=undefined && Listselected==1 && PublishList[1].get_user.img!=''" :src="PublishList[1].get_user.img">
                    <img class="Protrait2" v-else src="../../assets/img/default.jpg">
                <img class="Protrait1" v-if="PublishList[0] !=undefined && Listselected==1 && PublishList[0].get_user.img!=''" :src="PublishList[0].get_user.img">
                    <img class="Protrait1" v-else src="../../assets/img/default.jpg">
                <img class="Protrait3" v-if="PublishList[2] !=undefined && Listselected==1 && PublishList[2].get_user.img!=''" :src="PublishList[2].get_user.img">
                    <img class="Protrait3" v-else src="../../assets/img/default.jpg">
                    </div>
                    <div class="ProtraitUser">
                        <div class="normalWidth" v-if="PublishList[1] !=undefined && Listselected==1">{{PublishList[1].get_user.name}}</div>
                        <div class="normalWidth" v-else>虚位以待</div>
                        <div class="firstWidth" v-if="PublishList[0] !=undefined && Listselected==1">
                            <div>{{PublishList[0].get_user.name}}</div>
                            <div>发布数：{{PublishList[0].sum}}</div>
                        </div>
                        <div class="firstWidth" v-else>虚位以待</div>
                        <div class="normalWidth" v-if="PublishList[2] !=undefined && Listselected==1">{{PublishList[2].get_user.name}}</div>
                        <div class="normalWidth" v-else>虚位以待</div>
                    </div>
                </div>
                <div class="ListTime">
                    <div class="DateBox">
                       <img class="DateBtn" @click="ClickTime(1)" :src="Listtype===1 ? DayShow : Day">
                    </div>
                    <div  class="DateBox">
                       <img class="DateBtn" @click="ClickTime(2)" :src="Listtype===2 ? WeekShow : Week">
                    </div>
                    <div  class="DateBox">
                       <img class="DateBtn" @click="ClickTime(3)" :src="Listtype===3 ? MonthShow : Month">
                    </div>
                </div>
                <div class="ListTop10">
                    <div class="ListTopTitle">
                        <div class="ListItem">排名</div>
                        <div class="ListItem">发布订单</div>
                        <div class="ListItem">用户名称</div>
                    </div>
                    <div class="ListTopUser" v-show="!BlankList" v-for="(users,index) in PublishList">
                        <div class="ListItem" v-bind:class=" index < 3 ? 'ListTop3 img':'ListTop7'">
                            {{index+1}}
                        </div>
                        <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{users.sum}}</div>
                        <div class="ListItem" v-bind:class="index < 3  ? 'ListTop3':'ListTop7'">{{users.get_user.name}}</div>

                    </div>
                    <!--../../assets/img/default.jpg-->
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
                <img class="banner" src="../../assets/List/banner.png">
                <div v-if="TakenList!=undefined" class="ProtraitBox">
                    <div class="ProtraitContainer">
                 <img class="Protrait2" v-if="TakenList[1] !=undefined && Listselected==2 && TakenList[1].get_user.img!=''" :src="TakenList[1].get_user.img">
                    <img class="Protrait2" v-else src="../../assets/img/default.jpg">
                 <img class="Protrait1" v-if="TakenList[0] !=undefined && Listselected==2 && TakenList[0].get_user.img!=''" :src="TakenList[0].get_user.img">
                    <img class="Protrait1" v-else src="../../assets/img/default.jpg">
                 <img class="Protrait3" v-if="TakenList[2] !=undefined && Listselected==2 && TakenList[2].get_user.img!=''" :src="TakenList[2].get_user.img">
                    <img class="Protrait3" v-else src="../../assets/img/default.jpg">
                    </div>
                    <div class="ProtraitUser">
                        <div class="normalWidth" v-if="TakenList[1] !=undefined && Listselected==2">{{TakenList[1].get_user.name}}</div>
                        <div class="normalWidth" v-else>虚位以待</div>
                        <div class="firstWidth" v-if="TakenList[0] !=undefined && Listselected==2">
                            <div>{{TakenList[0].get_user.name}}</div>
                            <div>发布数：{{TakenList[0].sum}}</div>
                        </div>
                        <div class="firstWidth" v-else>虚位以待</div>
                        <div class="normalWidth" v-if="TakenList[2] !=undefined && Listselected==2">{{TakenList[2].get_user.name}}</div>
                        <div class="normalWidth" v-else>虚位以待</div>
                    </div>
                </div>
                <div class="ListTime">
                    <div class="DateBox">
                        <img class="DateBtn" @click="ClickTime(1)" :src="Listtype===1 ? DayShow : Day">
                    </div>
                    <div  class="DateBox">
                        <img class="DateBtn" @click="ClickTime(2)" :src="Listtype===2 ? WeekShow : Week">
                    </div>
                    <div  class="DateBox">
                        <img class="DateBtn" @click="ClickTime(3)" :src="Listtype===3 ? MonthShow : Month">
                    </div>
                </div>
                <div class="ListTop10">
                    <div class="ListTopTitle">
                        <div class="ListItem">排名</div>
                        <div class="ListItem">接单订单</div>
                        <div class="ListItem">用户名称</div>
                    </div>
                    <div class="ListTopUser" v-if="BlankList==false" v-for="(users,index) in TakenList">
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
                BlankList:false,
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
                console.log(val)
                if (val==undefined){
                    this.BlankList = true
                }
                else{
                    this.BlankList = false
                }
                //user_id
            },
            TakenList:function (val) {
                console.log(val)
                this.BlankList = false
                if (val==undefined){
                    console.log(1111)
                    this.BlankList = true
                }
            },
            Listselected:function (val) {
                console.log(val)
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
.ProtraitBox{
    position: absolute;
    top: 0;
    width: 60%;
    height: 2.6rem;
    margin: 0 20%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
}
.ProtraitContainer{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    height: 1.898rem;
    align-items: flex-end;
}
.Protrait2{
    width: .91rem;
    /*position: absolute;*/
    z-index: 999;
    /*left: 1.9rem;*/
    /*top: .97rem;*/
    border-radius: .455rem;
    height: .91rem;
    margin-top: 0.23rem;
    margin-left: 0.05rem;
}
.Protrait1{
    width: 1.18rem;
    /*position: absolute;*/
    z-index: 999;
    /*left: 3.2rem;*/
    /*top: .67rem;*/
    border-radius: .59rem;
    height: 1.18rem;
    margin-bottom: 0.03rem;
    margin-left: 0.05rem;
}
.Protrait3{
    width: .91rem;
    /*position: absolute;*/
    z-index: 999;
    /*left: 4.74rem;*/
    /*top: .91rem;*/
    border-radius: .455rem;
    height: .91rem;
    margin-bottom: 0.08rem;
    margin-left: 0.03rem;
}
.ProtraitUser{
    height:.702rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 0.2rem;
    color: #fff;
    text-align: center;
}
.normalWidth{
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.firstWidth{
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
.DateBox{
    flex: 1;
    justify-content: center;
    display: flex;
}
.DateBtn{
    width: 1.4rem;
    height: .5rem;
}
</style>