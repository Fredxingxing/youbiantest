<template>
    <div class="swiper-container">
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide v-for="(banners,index) in HomeBanner" @="GoToActivity(index)">
                <img class="swiper-container swiper-pagination-bullet-active" :src=banners.img>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { mapState} from 'vuex'
    let vm = null;
    export default {
        name: "HomeSwiper",
        data(){
          return{
              swiperOption: {
                  // some swiper options/callbacks
                  // 所有的参数同 swiper 官方 api 参数
                  // ...
                   pagination: {
                       el: '.swiper-pagination',
                       //  clickable:true,
                   },
                  on: {
                      click: function () {
                           const realIndex = this.realIndex;
                            vm.GoToActivity(realIndex);
                       }
                     },
                //  observeParents:true,
              //    observer:true,
                  //  centeredSlides:true,
                  autoplay:{
                      delay:3500,
                      disableOnInteraction:false
                  },
                  speed:600,
                //   loop:true,
                   slidesPerView:1,
                   spaceBetween:30,
              }
          }
        },
        components:{
            swiper,
            swiperSlide
        },
        watch:{
            HomeBanner:function (val) {
            }
        },
        computed:{
            ...mapState({
                HomeBanner:'HomeBanner',
            }),
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created:function(){
             vm = this   //swiper的坑 本组件的this指向的是swiper
             vm.$store.dispatch('getHomeBanner')
        },
        mounted() {
            console.log('this is current swiper instance object', this.swiper)
        },
        methods:{
            callback:function () {
             console.log("this is swiper callback")
            },
            GoToActivity:function (index) {
                var id = vm.$store.state.HomeBanner[index].id
                //:to="{path:'/Activity/Detail',query:{id:Activity.id}}"
                vm.$router.push({path:'/Activity/Detail',query:{id:id}})
            }
        }
    }
</script>

<style scoped>
.swiper-container{
    width: 100%;
    height: 100%;
    font-size: .50rem;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    background: #FCA62F;
}
</style>