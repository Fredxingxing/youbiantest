<template>
    <div class="HomePopular">
        <div class="PopularContainer" v-for="(popular,popularindex) in HomePopular">
            <div class="PopularName">{{popular.name}}</div>
            <div class="PopularSons" >
                <div class="PopularSon"v-for="(popularson,sonindex) in popular.sons">
                    <div class="SonName" @click="GoToOrderList(sonindex)">{{popularson.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "home-popular",
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
            GoToOrderList:function (sonindex) {

            }
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
    margin: .3rem .15rem;
}
.PopularName{
    width: 30%;
    text-align: center;
    font-size: .8rem;
    line-height: 1.8rem;
}
.PopularSons{
    width: 70%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-right: 0.3rem;
    margin-left: 0.1rem;
 }
.PopularSon{
    width: 33.3%;
    text-align: center;
    display: flex;
}
.SonName{
    margin-right: 0.1rem;
    border: 0.01rem solid  #D5D5D5;
    margin-top: .1rem;
    height: .5rem;
    width: 1.6rem;
    line-height: .5rem;
  }
</style>