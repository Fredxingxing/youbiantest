<template>
    <div id="ActivityNavbar"  class="ActivityNavbar">
    <mt-navbar v-model="$store.state.ActivityType" class="ActProgress nav">
        <mt-tab-item id="1">进行中</mt-tab-item>
        <mt-tab-item id="2">长期活动</mt-tab-item>
        <mt-tab-item id="3">已结束</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="$store.state.ActivityType">
        <mt-tab-container-item id="1">
            <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
            <div class="ActivityCard">
                 <div class="Card" v-for="(Activity,index) in ActivityList" >
                  <div class="CardDetail" :style="{'background-image':'url('+Activity.img+')'}">
                      <div v-if="Activity.is_img === 0">
                      <div class="CardTitle">{{Activity.title_one}}</div>
                      <div class="CardContent">{{Activity.title_two}}</div>
                      <div class="CardContent">{{Activity.title_three}}</div>
                      </div>
                  </div>
                     <div class="CheckDetail" >
                         <router-link :to="{path:'/Activity/Detail',query:{id:Activity.id}}" tag="span" class="DetailBtn">
                             <mt-button type="default" @click="CheckDetail" style="width: 100%;height: 70%;">查看详情</mt-button>
                         </router-link>
                   </div>
                 </div>

            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
            <div class="ActivityCard">
                <div class="Card" v-for="(Activity,index) in ActivityList" >
                    <div class="CardDetail" :style="{'background-image':'url('+Activity.img+')'}">
                        <div v-if="Activity.is_img === 0">
                            <div class="CardTitle">{{Activity.title_one}}</div>
                            <div class="CardContent">{{Activity.title_two}}</div>
                            <div class="CardContent">{{Activity.title_three}}</div>
                        </div>
                    </div>
                    <div class="CheckDetail" >
                        <router-link :to="{path:'/Activity/Detail',query:{id:Activity.id}}" tag="div" class="DetailBtn">
                            <mt-button type="default" @click="CheckDetail" style="width: 100%;height: 70%;">查看详情</mt-button>
                        </router-link>
                    </div>
                </div>

            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
            <div class="ActivityCard">
                <div class="Card" v-for="(Activity,index) in ActivityList" >
                    <div class="CardDetail" :style="{'background-image':'url('+Activity.img+')'}">
                        <div v-if="Activity.is_img === 0">
                            <div class="CardTitle">{{Activity.title_one}}</div>
                            <div class="CardContent">{{Activity.title_two}}</div>
                            <div class="CardContent">{{Activity.title_three}}</div>
                        </div>
                    </div>
                    <div class="CheckDetail" >
                        <router-link :to="{path:'/Activity/Detail',query:{id:Activity.id}}" tag="span" class="DetailBtn">
                            <mt-button type="default" @click="CheckDetail" style="width: 100%;height: 70%;">查看详情</mt-button>
                        </router-link>
                    </div>
                </div>

            </div>
        </mt-tab-container-item>
    </mt-tab-container>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "ActivityNavbar",
        data(){
            return{
            }
        },
        mounted() {
               this.$store.dispatch('getActivityList',this.$store.state.ActivityType)
        },
        watch:{
            ActivityList:function (val) {
            },
            ActivityType:function (val) {
                this.$store.dispatch('getActivityList',val)
                this.$store.commit('setActivityType',val)
            }
        },
        computed:{
            ...mapState({
                ActivityList:'ActivityList',
                ActivityType:'ActivityType'
            })
        },
        methods:{
            CheckDetail:function () {
                console.log("CheckDetail")
            }
        }
    }

</script>

<style scoped>
.ActivityNavbar{
    margin-left: .15rem;
    margin-right: .15rem;
    background: #ffffff;
}
.ActProgress{
    font-size: 0.3rem;
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: space-around;
    border-bottom: 0.04rem solid #C8C8C8;
}
.Card{
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    height: 3.7rem;
    display: flex;
    flex-direction: column;
 }
.CardDetail{
    height: 2.9rem;
    border-radius: .3rem;
    background: #FAB88E;
    display: flex;
    flex-direction: column;
    color: #fff;
    text-align: left;
    background-repeat: no-repeat;
    background-size: cover;
}
.CardTitle{
    font-size: .56rem;
    margin: .3rem 0rem .3rem .8rem;
   text-shadow: 0px 9px 4px #A56E55;
}
.CardContent{
    font-size: .3rem;
    margin: .1rem 0rem 0rem .8rem;
}
.CheckDetail{
    height: .7rem;
    display: flex;
    justify-content: flex-end;
    margin-top: .1rem;
    margin-right: .3rem;
}
.DetailBtn{
    display: flex;
    width: 26%;
    align-items: center;
}
</style>