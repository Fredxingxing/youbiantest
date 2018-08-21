<template>
    <div class="HomeTabDetail">
        <topBar/>
        <div class="blank" style="height: .1rem;background: #EFF3F5"></div>
        <div class="Menu">
            <div class="MenuTab">
             <div  v-for="(MenuTab,index) in HomeCategory" :class="index === $store.state.HomeTabSelected ? 'activeTab' : 'Tab'"
                 v-on:click="tab(index)" >{{MenuTab.Name}}</div>
            </div>
            <div class="MenuDetail">
                <div class="DetailSwiper swiper-container">
                    <HomeSwiper/>
                </div>
                <div class="DetailContainer">
                    <div class="DetailClass" v-for="(menudetail,titleindex) in HomeDetail">
                        <div class="DetailTitle BtnTitle ">{{menudetail.name}}</div>
                        <div class="DetailContentContainer">
                            <div class="DetailContent" v-for="(content,contentindex) in menudetail.sons">
                                <div class="Btn" v-on:click="GoToOrder(contentindex)">{{content.name}}</div>
                          </div>
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
            }
        },
        watch:{
            HomeCategory:function (val) {
                //do method again
            },
            HomeDetail:function (val) {

            }
        },
        created:function(){
            this.$store.dispatch('getHomeCategory')
            this.$store.commit('setTopBarShow',false)
        },
        computed:{
            ...mapState({
                HomeCategory:'HomeCategory',
                HomeDetail:'HomeDetail'
            })
        },
        // mounted: function () {
        //     this.$nextTick(function () {
        //         this.$axios.get('/index/index')
        //             .then(function (response) {
        //               console.log(response.data.data)
        //             })
        //             .catch(function (error) {
        //                 console.log(error)
        //             });
        //     })
        // },
        methods:{
            tab(index){
                this.$store.commit('HomeTabSelected',index);
            },
            GoToOrder(index){
                console.log(index)
                this.$router.push('./OrderList')
            },
        },
    }
</script>

<style scoped>
.HomeTabDetail{
    width: 7.5rem;
    height: 100%;
}
.Menu{
    display: flex;
    flex-direction: row;
    background: #ffffff;
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
.DetailContainer{
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
    background: #F6F5F0;
    font-size: .28rem;
    font-weight: bold;
    border-radius: 0.15rem;
    margin: 0.15rem 0 0.15rem 0;
}
.Btn{
    height: .5rem;
    line-height: .5rem;
    font-size: .20rem;
    color: #595959;
    background: #F6F5F0;
    border-radius: 0.15rem;
    margin: .2rem 0.1rem 0.2rem 0.2rem;
}
</style>