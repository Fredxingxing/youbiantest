<template>
    <div class="main">
        <div class="user">
            <img v-if="OrderObject.User.img !=undefined" :src="OrderObject.User.img " class="txbox">
            <i  v-else  class="iconfont icon-icon_user" style="margin-left: 0.4rem;font-size: 0.45rem;"></i>
            {{OrderObject.User.name}}
        </div>
        <textarea class="content" v-model='content' placeholder="请输入您想评价的内容">
        </textarea>
        <div class="limit">
            还可以输入<span class='color-FCA62F'>{{num}}</span>字
        </div>
        <button class='btn' @click='comment'>提交</button>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                content:'',
                num:200,
                OrderObject:{},
                CommentUrl:['order/be_comment','order/comment'] //0 被接受 1 已接收
            }
        },
        methods:{
            comment(){
                var _this = this
                this.$axios.post(_this.CommentUrl[_this.OrderObject.Type],{
                    be_evaluated:this.OrderObject.User.id,
                    order_no:this.OrderObject.OrderId,
                    content_receive:this.content,
                },
                {
                    headers:{
                        'token':window.sessionStorage.getItem('token')
                    }})
                    .then(function (response) {
                        console.log(response.data)
                        Toast({
                            message: response.data.message,
                            position: 'bottom',
                            duration: 4000
                        });
                        setTimeout( function () {
                            if(response.data.code == 200) {
                                _this.$router.go(-1)
                            }
                        },1000)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        watch:{
            content:function(){
                var length = this.content.length;
                this.num = 200 - length;
                if(this.num < 0){
                    this.content = this.content.substring(0,200)
                }
            }
        },
        mounted(){
            this.$store.dispatch('getUserTitle','发表评价')
            this.$store.dispatch('getHasSrh',false)
            this.OrderObject = this.$route.query
            console.log(this.OrderObject)
        }
    }
</script>
<style lang="less" scoped>
.main{
    .user{
        height: 0.8rem;
        line-height: .8rem;
        background-color: #fff;
        border-bottom:.02rem solid #eaeaea;
        .txbox{
            margin-left:.4rem;
            display: inline-block;
            vertical-align: middle;
            width: 0.5rem;
            height: 0.5rem;
            border-radius:50%;
            background-color: #eaeaea;
        }
    }
    .content{
        width: 100%;
        height: 2.4rem;
        border:0;
        outline: none;
        padding:.2rem;
        box-sizing: border-box;
    }
    .limit{
        background-color: #fff;
        margin-top:-.2rem;
        height: 0.6rem;
        line-height: .6rem;
        font-size:.2rem;
        text-align: right;
    }
    .btn{
        display: block;
        margin:auto;
        margin-top:3rem;
        width: 6rem;
        height: 0.7rem;
        background-color: #DD5519;
        color:#fff;
        border-radius:.1rem;
        border:0;
        font-size:.32rem;
    }
}
</style>

