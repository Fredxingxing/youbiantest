<template>
    <div id="ActivityNavbar"  class="ActivityNavbar">
    <mt-navbar v-model="selected" class="ActProgress nav">
        <mt-tab-item id="1">进行中</mt-tab-item>
        <mt-tab-item id="2">长期活动</mt-tab-item>
        <mt-tab-item id="3">已结束</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
            <div class="ActivityCard">
                 <div class="Card">
                  <div class="CardDetail">
                      <div class="CardTitle">活动名称</div>
                      <div class="CardContent">跟团游</div>
                      <div class="CardContent">最高立减800</div>
                  </div>
                     <div class="CheckDetail" >
                         <router-link to="/Activity/Detail" tag="span" style="display: flex">
                             <mt-button type="default" @click="CheckDetail">查看详情</mt-button>
                         </router-link>
                   </div>
                 </div>
                <div class="Card">
                    <div class="CardDetail">
                        <div class="CardTitle">活动名称</div>
                        <div class="CardContent">跟团游</div>
                        <div class="CardContent">最高立减800</div>
                    </div>
                    <div class="CheckDetail" >
                        <router-link to="/Activity/Detail" tag="span" style="display: flex">
                            <mt-button type="default" @click="CheckDetail">查看详情</mt-button>
                        </router-link>
                    </div>
                </div>
                <div class="Card">
                    <div class="CardDetail">
                        <div class="CardTitle">活动名称</div>
                        <div class="CardContent">跟团游</div>
                        <div class="CardContent">最高立减800</div>
                    </div>
                    <div class="CheckDetail" >
                        <router-link to="/Activity/Detail" tag="span" style="display: flex">
                        <mt-button type="default" @click="CheckDetail">查看详情</mt-button>
                        </router-link>
                    </div>
                </div>
                <div class="Card">
                    <div class="CardDetail">
                        <div class="CardTitle">活动名称</div>
                        <div class="CardContent">跟团游</div>
                        <div class="CardContent">最高立减800</div>
                    </div>
                    <div class="CheckDetail" >
                        <router-link to="/Activity/Detail" tag="span" style="display: flex">
                            <mt-button type="default" @click="CheckDetail">查看详情</mt-button>
                        </router-link>
                    </div>
                </div>                 <div class="Card">
                <div class="CardDetail">
                    <div class="CardTitle">活动名称</div>
                    <div class="CardContent">跟团游</div>
                    <div class="CardContent">最高立减800</div>
                </div>
                <div class="CheckDetail" >
                    <router-link to="/Activity/Detail" tag="span" style="display: flex">
                        <mt-button type="default" @click="CheckDetail">查看详情</mt-button>
                    </router-link>
                </div>
            </div>


            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
            <div class="ActivityCard">
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
            <div class="ActivityCard">
                <div>7</div>
                <div>8</div>
                <div>9</div>
            </div>
        </mt-tab-container-item>
    </mt-tab-container>
    </div>
</template>

<script>
    export default {
        name: "ActivityNavbar",
        data(){
            return{
                selected : '1'
            }
        },
        mounted() {
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
    margin-left: .25rem;
    margin-right: .5rem;
    background: #ffffff;
}
.ActProgress{
    font-size: 0.3rem;
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
</style>