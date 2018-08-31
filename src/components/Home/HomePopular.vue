<template>
    <div class="HomePopular">
        <div class="PopularContainer" v-for="(popular,popularindex) in HomePopular">
            <div class="PopularName" >
                <!--:style="{backgroundImage:'url(' + (PopularSrc+popular.name+'.png') + ')'}-->
                <img :src="imgUrl(popular.id+'.png')" class="PopularImg">
            </div>
            <div class="PopularSons" >
                <div class="PopularSon"v-for="(popularson,sonindex) in popular.sons">
                    <div class="SonName" @click="GoToOrderList(popularindex,sonindex)">{{popularson.name}}</div>
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
    margin:.3rem 0 0.3rem 0rem;
}
.PopularName{
    width: 30%;
    text-align: center;
    font-size: .8rem;
    line-height: 1.8rem;
}
.PopularImg{
     width: 2.15rem;
    height: 100%;
}
.PopularSons{
    width: 65%;
    height: 100%;
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