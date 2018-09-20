<template>
    <div class="HomePopular">
        <div class="PopularContainer" v-for="(popular,popularindex) in HomePopular">
            <div class="PopularName" >
                <router-link :to="{path:'/HomeTabDetail',query:{id:popular.id}}" tag="img" :src="imgUrl(popular.id+'.png')" class="PopularImg">
                </router-link>
            </div>
            <div class="PopularSons" >
                <div class="PopularSon"v-for="(popularson,sonindex) in popular.sons">
                    <div class="SonName" @click="GoToOrderList(popularindex,sonindex)" v-if="popularson.name">{{popularson.name|Name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    var images = require.context('../../assets/HomePopular/',false,/\.png$/)
    export default {
        name: "home-popular",
        data(){
          return{
              // PopularSrc:'../../assets/HomePopular/'
          }
        },
        filters:{
            Name:function (val) {
                return val.substring(0,6)
            }
        },
        watch:{
            HomePopular:function (val) {
            },
        },
        computed:{
            ...mapState({
                HomePopular:'HomePopular',
            })
        },
        mounted(){
        },
        methods:{
            GoToOrderList:function (dadindex,sonindex) {
                console.log(this.$store.state.HomePopular[dadindex].sons[sonindex].id)
                this.$router.push({path:'/OrderList',
                    query:{level_three:this.$store.state.HomePopular[dadindex].sons[sonindex].id}})
            },
            imgUrl:function (path) {
                return images('./'+path)
            },
        }
    }
</script>

<style scoped>
.HomePopular{
    background: #ffff;
    width: 100%;
    height: 100%;
}
.PopularContainer{
    width: 100%;
    height: 2rem;
    display: flex;
    padding-top: 0.3rem;
    margin:0 0 0.3rem 0;
}
.PopularName{
    width: 30%;
    text-align: center;
    font-size: .8rem;
    line-height: 1.8rem;
}
.PopularImg{
     width: 2.15rem;
    height:2rem;
}
.PopularSons{
    width: 68%;
    height: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-content: baseline;
    margin-left: 0.1rem;
 }
.PopularSon{
    width: 33.3%;
    text-align: center;
    display: flex;
    margin-top:0.22rem;
}
.SonName{
    margin-right: 0.1rem;
    border: 0.01rem solid  #D5D5D5;
    height: .5rem;
    /*margin-top: .1rem;*/
    width: 1.6rem;
    line-height: .5rem;
    font-size: 0.24rem;
  }
.SonName:hover{
    margin-right: 0.1rem;
    border: 0.01rem solid  #D5D5D5;
    height: .5rem;
    /*margin-top: .1rem;*/
    width: 1.6rem;
    line-height: .5rem;
    background: #DD5519;
    color: #fff;
    font-size: 0.24rem;
}

.PopularSon:nth-child(1){
    margin-top:0;
}
.PopularSon:nth-child(2){
    margin-top:0;
}
.PopularSon:nth-child(3){
    margin-top:0;
}
</style>