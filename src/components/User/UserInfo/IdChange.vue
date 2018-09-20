<template>
    <div class="PhoneChangeContainer">
        <div class="IDface">
            <file-upload class="AddPic"
                         post-action="http://www.youbian.link/api/v2/release/img"
                         v-model="Idface"
                         extensions="jpg,jpeg,png,webp"
                         accept="image/png,image/jpeg,image/jpg,image/webp"
                         @input-filter = "Addfont"
                         name="img"
                         ref="upload1">
                <li style="width: 25%;" v-for="(face, index) in Idface" :key="face.id">
                    <img v-if="face.thumb" :src="face.thumb" class="protraitImage" />
                </li>
                <img  class="IDimg" src="../../../assets/face.png">
            </file-upload>
        </div>
        <div class="IDback">
            <file-upload class="AddPic"
                         post-action="http://www.youbian.link/api/v2/release/imgs"
                         v-model="Idback"
                         extensions="jpg,jpeg,png,webp"
                         accept="image/png,image/jpeg,image/webp"
                         @input-filter = "Addback"
                         name="imgs"
                         ref="upload2">
                <li style="width: 25%;" v-for="(back, index) in Idback" :key="back.id">
                    <img v-if="back.thumb" :src="back.thumb" class="protraitImage" />
                </li>
                <img class="IDimg" src="../../../assets/back.png">
            </file-upload>
        </div>
        <div class="changebox">
            <div>真实姓名：</div>
            <input style="height: .4rem;" placeholder="请输入真实姓名" v-model="Name">
        </div>
        <div  class="changebox">
            <!--style="width:1.6rem;text-align: right;"-->
            <div>身份证号：</div>
            <input style="height: .4rem;" placeholder="请输入身份证号码" v-model="Idnum">
        </div>
        <div class="ChangeInfo" @click='CommitInfo()'>
            提交信息
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "IdChange",
        data(){
            return{
                Idnum:'',
                Name:'',
                disabled:false,
                showdefualtpic:true,
                Idface:[],
                Idback:[],
            }
        },
        watch:{
            Idface:function (val) {
            },
            Idback:function (val) {
            }
        },
        methods:{
            Addfont:function (newFile,oldFile) {
                console.log(newFile)
                console.log(oldFile)
                console.log("refssdasd")
                console.log(this.$refs.upload1)
         //       this.$refs.upload1.active = false
                if (newFile && !oldFile) {
                    // add
                    console.log('add', newFile)
                    // // 创建 `blob` 字段 用于缩略图预览
                    newFile.blob = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                    // Thumbnails
                    // 缩略图
                    newFile.thumb = ''
                    if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                        newFile.thumb = newFile.blob
                    }
                 // this.showdefualtpic = false
                }
                if (newFile && oldFile) {
                    // update
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }
                //自动上传
                 if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                   if (!this.$refs.upload1.active) {
                        this.$refs.upload1.active = true
                    }
                }
            },
            Addback:function (newFile,oldFile) {
                this.$refs.upload2.active = false
                if (newFile && !oldFile) {
                    // add
                    console.log('add', newFile)
                    // // 创建 `blob` 字段 用于缩略图预览
                    newFile.blob = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                    // Thumbnails
                    // 缩略图
                    newFile.thumb = ''
                    if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                        newFile.thumb = newFile.blob
                    }
                    // this.showdefualtpic = false
                }
                if (newFile && oldFile) {
                    // update
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }
                //自动上传
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                    if (!this.$refs.upload2.active) {
                        this.$refs.upload2.active = true
                    }
                }
            },
            CommitInfo:function(){
                console.log(this.Idface[0])
                console.log(this.Idback[0])
                this.$axios.post('/user/id_edit',{
                    id_front:this.Idface[0].response.data,
                    id_back:this.Idback[0].response.data,
                    rel_name:this.Name,
                    id_card:this.Idnum,
                },{
                    headers:{
                        'token':window.sessionStorage.getItem('token')
                    }})
                    .then(function (res) {
                        console.log(res)
                        Toast({
                            message: res.data.message,
                            position: 'middle',
                            duration: 4000
                        });
                    })

            },
        },
    }
</script>

<style scoped>
    .PhoneChangeContainer{
        background: #fff;
        display: flex;
        flex-direction: column;
        height: 94vh;
    }
    .ChangeInfo{
        text-align: center;
        line-height: .7rem;
        display: block;
        margin:auto;
        margin-top:1.5rem;
        width: 6rem;
        height: 0.7rem;
        background-color: #DD5519;
        color:#fff;
        border-radius:.1rem;
        border:0;
        font-size:.32rem;
    }
    .changebox{
        height: 5%;
        display: flex;
        justify-content: center;
        align-items: baseline;
        padding-top: 5%;
        font-size: .32rem;
    }
    .repwd{
        font-size: .24rem;
        color: #727272;
        float: right;
        background-color: #fff;
        border: 0;
        outline: none;
        position: absolute;
        left: 67%;
        margin-top: .08rem;
    }
    .protraitImage{
        position: absolute;
        width: 60%;
        left: 2rem;
        top: 25%;
        height: 70%;
        background: #ffff;
    }
    .IDface{

    }
    .IDback{

    }
    .IDimg{
        width: 60%;
        margin-left: 20%;
        margin-top: 5%;
    }
</style>