<template>
    <div class="HomeTabDetail">
        <topBar/>
        <div class="blank" style="height: .1rem;background: #EFF3F5"></div>
        <div class="Menu">
            <div class="MenuTab">
             <div  v-for="(MenuTab,index) in MenuTabs" :class="index === TabNum ? 'activeTab' : 'Tab'"
                 v-on:click="tab(index)" >{{MenuTab}}</div>
            </div>
            <div class="MenuDetail">
                <div class="DetailSwiper swiper-container">
                    <HomeSwiper/>
                </div>
                <div class="DetailContainer">
                    <div class="DetailClass" v-for="(menudetail,titleindex) in MenuDetail">
                        <div class="DetailTitle BtnTitle ">{{menudetail.title}}</div>
                        <div class="DetailContentContainer">
                            <div class="DetailContent" v-for="(content,contentindex) in menudetail.Content">
                                <div class="Btn">{{content}}</div>
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
    export default {
        name: "HomeTabDetail",
        components:{
            topBar,
            bottomBar,
            HomeSwiper
        } ,
        data(){
            return{
                MenuTabs: ["同城便","社交","情感","生活","娱乐","职业","文化","特色"],
                TabNum: 1,
                MenuDetail: [
                    {"title": "二级分类",
                    "Content":["三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类",]},
                    {"title": "二级分类",
                        "Content":["三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类",]},
                    {"title": "二级分类",
                        "Content":["三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类",]},
                    {"title": "二级分类",
                        "Content":["三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类",]},
                    {"title": "二级分类",
                        "Content":["三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类","三级分类",]},
                ]
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.$axios.get('/index/index')
                    .then(function (response) {
                      console.log(response.data.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            })
        },
        methods:{
            tab(index){
                this.TabNum = index;
                console.log(this.TabNum)
            }
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
}
.MenuTab{
    display: flex;
    flex-direction: column;
    width: 20%;
    /*height: 100%;*/
    background: #F6F5F0;
 }
.activeTab{
    color: #DD5519;
    font-size: .23rem;
    height: .8rem;
    background: #ffff;
    line-height: .7rem;
}
.Tab{
    color: #595959;
    font-size: .23rem;
    height: .8rem;
    /*background: #F6F5F0;*/
    line-height: .7rem;
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
    justify-content: space-around;
    flex-wrap: wrap;
}
.DetailContent{
     width: 33.33%;
}
.DetailClass{
    border-bottom: 0.01rem solid #DBDFE1;
    height: 2.4rem;
}
.BtnTitle{
    width: 1.2rem;
    height: .35rem;
    color: #737373;
    background: #F6F5F0;
    font-size: .24rem;
    font-weight: bold;
    border-radius: 0.15rem;
    margin:0.15rem 0 0.15rem 0;
}
.Btn{
    width: 1.2rem;
    height: .35rem;
    font-size: .20rem;
    color: #8D8D8B;
    background: #F6F5F0;
    border-radius: 0.15rem;
    margin: .1rem 0.1rem 0.1rem 0.2rem;
}
</style>