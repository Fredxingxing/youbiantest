<template>
    <div class="other">
        <div class='header'>
            <div style="margin-left: 2%;">
            <i class='iconfont icon-Left font-16' @click='back'></i> {{title}}
            </div>
            <div class='srh' v-if="hasSrh">
                <!--<i class='iconfont icon-search'></i>-->
                <!--<input type="text" placeholder="输入订单号" @keyup.enter="search" v-model="OrderInput">-->
                <mt-search  class="Searchcontainer" v-model="OrderInput" >
                    <mt-cell v-for="(item,index) in SearchResult" :title="item.order_no" :value="item.get_order.price+'积分'"
                             v-on:click.native="search(index)">
                    </mt-cell>
                </mt-search>
            </div>
        </div>
        <router-view>

        </router-view>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                OrderInput:'',
                focus:false,
                CommentUrl:['order/be_received','order/received'], //0 被接受 1 已接收
                SearchResult:[],
            }
        },
        computed:{
            title:function(){
                return this.$store.state.userTitle
            },
            hasSrh(){
                return this.$store.state.hasSrh
            }
        },
        watch:{
            focus:function (val) {
                console.log(val)
            },
            OrderInput:function (val) {
                var path= this.$route.path.replace("/other/",'');
                var type
                if(path=='bjsd'){
                      type = 0
                }else if(path=='wjsd'){
                      type = 1
                }
                var _this = this
                this.$axios.post(this.CommentUrl[type],{
                        order_no:val,
                    },
                    {
                        headers:{
                            'token':window.sessionStorage.getItem('token')
                        }})
                    .then(function (response) {
                        console.log(response.data.data)
                        _this.SearchResult = response.data.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        methods:{
            back:function(){
                var path = this.$route.path.replace("/other/", '');
                if(path=='PhoneChange'||path=='IdChange'||path=='ChangeUserInfo'){
                           this.$router.go(-1)
                }
                else
                {
                    this.$router.push('/user');
                }
            },
            search(index){
                this.$router.push({path:'/OrderDetail',query:{OrderId:this.SearchResult[index].goods_id}})
            }
        },
        created(){
            var token = window.sessionStorage.getItem('token');
            var orderId = this.$route.query.OrderId
            if(!orderId) {
                if (!token) {
                    this.$router.push('/other/login')
                }
            }
        },
    }
</script>
<style lang="less" scoped>
.other{
    .header{
        height: .8rem;
        background-color: #FCA62F;
        line-height: .8rem;
        font-size:.32rem;
        color:#fff;
        padding-right: 0.1rem;
        display: flex;
        .srh{
            color:#727272;
            /*margin-top:.16rem;*/
            /*margin-right:.2rem;*/
            /*padding:0 .1rem;*/
            /*line-height: .5rem;*/
            /*height: 0.5rem;*/
            width:65%;
            margin-left: 10%;
            /*float: right;*/
            /*border-radius:.06rem;*/
            /*background-color: #fff;*/
            /*overflow: hidden;*/
            /*display: flex;*/
            /*justify-content: space-between;*/
            input{
                border:0;
                background-color: #fff;
            }
        }
    }
}
</style>
