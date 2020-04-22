<template>
    <div class="accountSet">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="top">
                <label>头像设置</label>
                <div class="user_pic">
                    <el-upload  :action="host+'/file/uploadBaseData'"
                            class="head_img"
                            :show-file-list="false"
                                :http-request="uploadProcess"
                            :before-upload="beforeAvatarUpload">
                        <img :src="headPic" class="avatar">
                        <i class="el-icon-arrow-right"></i>
                    </el-upload>
                </div>
            </div>
            <div class="user-form">
                <ul>
                    <li><label>昵称设置</label><input type="text" v-model="name" placeholder="请输入您的昵称"></li>
                    <li><label>手机号码</label><input type="text" v-model="phone" placeholder="请输入您的手机号码"></li>
                    <li><label>出生日期</label><input type="text" v-model="birthday" placeholder="请输入您的出生年月日"></li>
                    <li>
                        <label class="w2">性    别</label>
                        <div class="radio-box">
                            <el-radio v-model="sex" label="1">男</el-radio>
                            <el-radio v-model="sex" label="2">女</el-radio>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btns">
                <button type="button" @click="save()">保 存</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { upload, userRequest ,getRemotHost} from '@/js/request.js'
    import Vue from 'vue'
    export default {
        name: "accountSet",
        data(){
            this.loadInfo()
            return{
                title:'账户设置',
                userInfo: {
                    avatar: require('../../assets/images/my/user-pic.png')
                },
                headPic:"",
                phone:"",
                name:"",
                birthday:"",
                sex:"",
                radio:'1',
                host:getRemotHost()
            }
        },
        methods:{
            loadInfo(){
                var page=this;
                 userRequest("/appUser/queryUserInfo",{}).then(function (response) {
                       page.name =response.name;
                       page.phone =response.phone;
                       if(!response.headPic){
                        page.headPic=require("../../assets/images/my/user-pic.png");
                       }else{
                        page.headPic=response.headPic;
                       }
                      page.birthday= response.birthDay!=null?response.birthDay:""
                      page.sex=response.sex+""
                 });
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                this.headPic = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            uploadProcess(param){
                var page=this;

                var formData=new FormData();
                formData.append('multipartFile', param.file);
                formData.append('type', "USERLOCATION");
                jQuery.ajax({url:Vue.prototype.APIHOST+'/file/upload', contentType:"multipart/form-data", contentType: false,processData: false,type:"post",data:formData,success:function(res){
                      page.headPic=res.msg;
                }});
            },

            save(){

                var op=this;
                var postData={   nickName: op.name,
                                 userAvatar:  op.headPic,
                                 userBrithDay: op.birthday,
                                 userPhone: op.phone,
                                 userSex: op.radio}

                userRequest("/appUser/saveUserSet",postData).then(function(resp){
                        sessionStorage.setItem("phone",postData.userPhone);
                        sessionStorage.setItem("headPic",postData.userAvatar);
                        sessionStorage.setItem("name",postData.nickName);
                        sessionStorage.setItem("birthday",postData.userBrithDay);
                        sessionStorage.setItem("sex",postData.userSex);
                        op.$router.push({name:"my"});

                });
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .accountSet{
        .content{
            margin-top: 1.02rem;
            .top{
                width: 100%;
                height: 1.6rem;
                line-height: 1.6rem;
                background-color: #fff;
                padding: 0 .2rem;
                label{
                    font-size: .26rem;
                    color: #4c4c4c;
                }
                .user_pic{
                    width: 1.88rem;
                    height: 1.6rem;
                    float: right;
                    .head_img{
                        width: 100%;
                        height: 100%;
                        .el-upload{
                            width: 100%;
                            height: 100%;
                            img{
                                width: 1.1rem;
                                height: 1.1rem;
                            }
                            .el-icon-arrow-right{
                                font-size: 20px;
                                padding-left: .2rem;
                            }
                        }
                    }
                }
            }
            .user-form{
                background-color: #fff;
                overflow: hidden;
                padding: 0 .2rem;
                margin-top: .2rem;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        border-bottom: .02rem solid #f0f3fa;
                        font-size: .26rem;
                        label{
                            width: 1.37rem;
                            display: inline-block;
                            color: #4c4c4c;
                        }
                        .w2{
                            letter-spacing: .2rem;
                        }
                        .radio-box{
                            width:5.7rem;
                            height: .8rem;
                            display: inline-block;
                        }
                        input[type=text]{
                            width:5.7rem;
                            height: .8rem;
                            line-height: .8rem;
                            border: 0;
                        }
                    }
                }
            }
            .btns{
                padding: 0 .2rem;
                margin-top: .6rem;
                button{
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    background-color: #83b7ff;
                    color: #fff;
                    margin-bottom: .45rem;
                    border-color: #83b7ff;
                    border-radius: .4rem;
                }
            }
        }

    }
</style>