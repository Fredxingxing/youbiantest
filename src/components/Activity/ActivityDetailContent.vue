<template>
    <div class="DetailContainer">
        <div v-html="ActivityDetail.content" class="DetailContent"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "ActivityDetailContent",
        watch:{
            ActivityDetail:function (val) {
            }
        },
        computed:{
            ...mapState({
                ActivityDetail:'ActivityDetail'
            })
        },
    }
</script>

<style>
    .DetailContainer{
        width: 90%;
        margin: 5%;
        color: #000000;
    }
    .DetailContainer img{
        width:100% !important;
        display:block;
    }

</style>