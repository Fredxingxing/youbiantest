<template>
    <div class="ActivityDetail">
        <mt-header title="" class="DetailTop">
            <div  slot="left" tag="span">
                <div class="TopBar"  v-on:click="Back()">
                    <i class="iconfont icon-Left Back TopSize" ></i>
                    <div class="TopSize" >&nbsp活动详情</div>
                </div>
            </div>
            <!--<mt-button icon="more" slot="right" @click="more"></mt-button>-->
        </mt-header>
        <div class="DetailTitle">{{ActivityDetail.title_one}}</div>
        <ActivityDetailContent/>
        <div @click="ToTop" class="BackToTop">
            <i class="iconfont icon-back_to_top"></i>
            <span style="font-size: .1rem;">顶部</span>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ActivityDetailContent from './ActivityDetailContent'
    export default {
        name: "ActivityDetail",
        data(){
            return{

            }
        },
        mounted(){
            console.log(this.$route)
            console.log(this.$store)
            this.$store.dispatch('getActivityDetail',this.$route.query.id)
        },
        watch:{
            ActivityDetail:function (val) {
            }
        },
        computed:{
            ...mapState({
                ActivityDetail:'ActivityDetail'
            })
        },
        components:{
            ActivityDetailContent
        },
        methods:{
            Back:function () {
                console.log("返回")
                this.$router.go(-1)
            },
            ToTop:function () {
              //  document.body.scrollTop = 0
              //  document.documentElement.scrollTop = 0
              var time = setInterval(function () {
                    console.log("定时循环回到顶部")
                    //桌面端浏览器不能使用document.body.scrollTop获取浏览器窗体的滚动高度
                    //移动端不能使用document.documentElement.scrollTop获取浏览器窗体的滚动高度
                    //但都支持window.pageYOffset（ie9以上才支持）
                    var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
                    console.log(top)
                    var speed = top / 4;
                    console.log(speed)
                    if (document.body.scrollTop!=0) {
                        console.log("it's over")
                        document.body.scrollTop -= speed;
                    }else {
                        console.log(11111)
                        document.documentElement.scrollTop -= speed;
                    }
                    if (top == 0) {
                        clearInterval(time);
                    }
                }, 30);
            }
        }
    }
</script>

<style scoped>

.ActivityDetail{
   display: flex;
   flex-direction:column;
   background: #ffff;
}
.DetailTop{
    width: 100%;
    height: .8rem;
    display: flex;
    background: #FCA62F;
}
.DetailTitle{
    font-size: .42rem;
    color: #000000;
    width: 100%;
    text-align: center;
    margin-top: 0.2rem;
}
.DetailPic{
    width: 100%;
    height: 4rem;
    margin:.1rem 0rem .2rem 0rem
}
.DetailContainer{
        width: 90%;

 }
.DetailContent img{
    width: 100%;
}
.BackToTop{
    width: .5rem;
    /*height: .5rem;*/
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    text-align: center;
    position: fixed;
    right: 0.2rem;
    bottom: 0.5rem;
    color: black;
    transition: color 2s;
}
.BackToTop:hover{
    width: .5rem;
    /*height: .5rem;*/
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    text-align: center;
    position: fixed;
    right: 0.2rem;
    bottom: 0.5rem;
    color: #dd5519;
}
    .TopBar{
        height: .8rem;
        display: flex;
        background: #FCA62F;
    }
    .TopSize{
        font-size: 0.32rem;
        color: #ffff;
        line-height: 0.8rem;
    }
</style>
