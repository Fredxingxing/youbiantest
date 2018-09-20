<template>
    <div class="HomeTabDetail">
        <topBar/>
        <div class="blank" style="height: .1rem;background: #EFF3F5"></div>
        <div class="Menu">
            <div class="MenuTab">
             <div  v-for="(MenuTab,index) in HomeCategory" :class="index+1 == TabId ? 'activeTab' : 'Tab'"
                 v-on:click="tab(index)" >{{MenuTab.Name}}</div>
            </div>
            <div class="MenuDetail">
                <div v-show="this.$store.state.HomeTabSwiperShow" class="DetailSwiper swiper-container">
                    <HomeSwiper/>
                </div>
                <div class="TabDetailContainer">
                    <div class="DetailClass" v-for="(menudetail,titleindex) in HomeDetail">
                        <div class="DetailTitle BtnTitle ">
                            <!--<div style="width: 0.06rem;margin-top: 0.2rem;height: 0.2rem;background: rgb(221, 85, 25);margin-right: 0.2rem;"></div>-->
                            <div>{{menudetail.name}}</div>
                        </div>
                        <div class="DetailContentContainer">
                            <router-link :to="{path:'/OrderList',query:{level_one:TabId,level_two:menudetail.id,level_three:content.id}}"
                                         tag="span"    class="DetailContent" v-for="(content,contentindex) in menudetail.sons">
                                <div class="Btn" v-on:click="GoToOrder(titleindex,contentindex)">{{content.name|Name}}</div>
                          </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <bottomBar/>
    </div>
</template>

<script>
    import topBar from '../topBar'
    import HomeSwiper from './HomeSwiper'
    import bottomBar from '../bottomBar'
    import { mapState } from 'vuex'
    export default {
        name: "HomeTabDetail",
        components:{
            topBar,
            bottomBar,
            HomeSwiper
        } ,
        data(){
            return{
                Tabindex:0,
                TabId:0,
            }
        },
        filters:{
            Name:function (val) {
                return val.substring(0,6)
            }
        },
        watch:{
            HomeCategory:function (val) {
                //do method again
            },
            HomeDetail:function (val) {
                for(var a in val){
                val[a].sons = val[a].sons.slice(0,15)
                }
                return val
            }
        },
        created:function () {
            this.TabId = this.$route.query.id
        },
        mounted(){
            console.log(this.$route)
            this.$store.dispatch('getHomeCategory',this.$route.query.id)
            this.$store.commit('setTopBarShow',false)
        },
        computed:{
            ...mapState({
                HomeCategory:'HomeCategory',
                HomeDetail:'HomeDetail'
            })
        },
        methods:{
            tab(index){
                this.TabId = index +  1
                this.$store.commit('HomeTabSelected',index);
                this.$router.push({
                    query:{
                        id:this.TabId
                    }
                })
            },
            GoToOrder(titleindex,contentindex){
            },
        },
    }
</script>

<style scoped>
.HomeTabDetail{
    width: 100%;
    height: 100%;
}
.Menu{
    display: flex;
    flex-direction: row;
    background: #ffffff;
    padding-bottom: 1.5rem;
}
.MenuTab{
    display: flex;
    flex-direction: column;
    width: 20%;
    /*height: 100%;*/
    background: #F6F5F0;
    text-align: center;
 }
.activeTab{
    color: #DD5519;
    font-size: .3rem;
    height: 1rem;
    background: #ffff;
    line-height: 1rem;
}
.Tab{
    color: #595959;
    font-size: .3rem;
    height: 1rem;
    /*background: #F6F5F0;*/
    line-height: 1rem;
 }
.MenuDetail{
    margin: 0 0.13rem 0 .13rem;
    width: 80%;
}
.swiper-container{
    width: 100%;
    height: 3.00rem;
    font-size: .50rem;
}
.TabDetailContainer{
     display: flex;
     flex-direction: column;
     margin:.1rem 0 .1rem 0;
}
.DetailContentContainer{
    display: flex;
    flex-wrap: wrap;
}
.DetailContent{
     width: 33.33%;
}
.DetailClass{
    border-bottom: 0.01rem solid #DBDFE1;
    text-align: center;
}
.BtnTitle{
    width: 33.333%;
    line-height: 0.6rem;
    height: .6rem;
    color: #737373;
    font-size: .28rem;
    font-weight: bold;
    border-radius: 0.15rem;
    margin: 0.15rem 0 0.15rem 0;
    /*display: flex;*/
    background: #F6F5F0;
}
.Btn{
    height: .6rem;
    line-height: .6rem;
    font-size: .25rem;
    color: #595959;
    background: #F6F5F0;
    border-radius: 0.15rem;
    margin: .2rem 0.1rem 0.2rem 0.2rem;
}
.Btn:hover{
        background: #DD5519;
        color: #ffff;
}
</style>