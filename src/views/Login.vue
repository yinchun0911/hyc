<template>
    <div class="login">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="top"></div>
        <div class="content">
            <div class="content-wrap">
                <form>
                    <ul>
                        <li class="pho"><input type="text" v-model="phone" placeholder="请输入手机号码" ></li>
                        <li class="psd"><input type="text" v-model="code" placeholder="请输入验证码"><button  type="button" @click="getCode()" class="code">{{text}}</button></li>
                        <div class="checkbox">
                            <el-checkbox v-model="checked"></el-checkbox><span @click="dialogVisible = true">阅读并同意<i>服务协议</i></span>
                        </div>
                    </ul>
                    <button type="button" @click="loginBtn()"  class="loginBtn">登 录</button>
                </form>
                <div class="bottom-btn">
                    <p>一键登录</p>
                    <div  @click="wechatLogin()" class="wechat-login">
                        <img src="../assets/images/wx.png" alt="">
                    </div>
                </div>
            </div>
            <!--服务协议-->
            <el-dialog class="agreement" :visible.sync="dialogVisible" top="0">
                <div class="box" v-html="protalInfo">

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
      import { Dialog } from 'vant'
    import cookie from "../js/cookie";
    export default {
        name: "login",
        data(){
            var title="登录"
            this.loadUserProtalInfo();
            return{
                title:title,
                text:"获取验证码",
                phone:"",
                checked:false,
                code:"",
                countDwon:60,
                hasSend:false,
                dialogVisible:false,
                agreementText:'',
            }
        },
        methods:{
            wechatLogin(){
                window.location.href="/hui/hui.html";
            },
            loadUserProtalInfo(){
                var page=this;
                userRequest("/appUserCommon/queryUserProtalInfo", {}).then(function (response) {
                    page.protalInfo=response.instructionsContent;
                });

            },
            getCode(){
                console.log(1111)
                var op=this;
                if(!op.checked){
                    Dialog({ message: '请先阅读并同意用户协议' })
                    return;
                }
                 var phone=op.phone;
                 if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(phone)){
                      Dialog({ message: '手机号不正确' })
                      return;
                }
                if(op)
                if(op.countDwon<60){
                    return;
                }
                op.text=op.countDwon+"s";
                op.countDown();


                request("/appUserLogin/getIdentifyingCode",{userPhone :phone}).then(function(response){
                       console.log(response)
                       op.hasSend=true;
                });

            },loginBtn(){
                var op=this;
                if(!op.hasSend){
                    Dialog({ message: '请先获取验证码' })
                    return;
                }
                 var postData={
                        smsCode:op.code ,
                        userPhone:op.phone
                 }

               request("/appUserLogin/loginVerify",postData).then(function(response){

                       cookie.setCookie("appUserId",response.id,365);
                       localStorage.setItem("userId", response.id);
                       localStorage.setItem("name", response.name);
                       localStorage.setItem("phone", response.phone);
                       localStorage.setItem("headPic", response.headPic);
                       localStorage.setItem("token", response.token);

                        op.$router.push({name:"Home",params:response});
                });
            },

            countDown(){
                var op=this;
                op.countDwon--;
                if(op.countDwon<0){
                    op.countDwon=60;
                       op.text="获取验证码";
                    return;
                }
                op.text=op.countDwon+"s";
                setTimeout(op.countDown,1000);
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .login{
        .top{
            width: 100%;
            height: 1.82rem;
            background-color: #83b7ff;
            margin-top: .88rem;
        }
        .content{
            .content-wrap{
                margin: -1.5rem .2rem 0 .2rem;
                background-color: #fff;
                border-radius: .15rem;
                padding: 0 .2rem .75rem .2rem;
                form{
                    ul{
                        padding: 1.2rem 0 .95rem .5rem;
                        li{
                            position: relative;
                            width: 100%;
                            height: .8rem;
                            line-height: .8rem;
                            input{
                                border: 0;
                                width: 3.8rem;
                                height: 100%;
                                padding-left: .65rem;
                                color: #4c4c4c;
                                font-size: .26rem;
                            }
                            .code{
                                width: 2.18rem;
                                height: .8rem;
                                line-height: .8rem;
                                color: #fff;
                                font-size: .3rem;
                                text-align: center;
                                background-color: #83b7ff;
                                border: 0;
                                border-radius: .4rem;
                            }
                        }
                        .pho{
                            &:before{
                                content: '';
                                width: .35rem;
                                height: .37rem;
                                background: url("../assets/images/user-icon.png") no-repeat;
                                background-size: 100% 100%;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                margin-top: -.18rem;
                            }
                        }
                        .psd{
                            &:before{
                                content: '';
                                width: .29rem;
                                height: .36rem;
                                background: url("../assets/images/user-psw.png") no-repeat;
                                background-size: 100% 100%;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                margin-top: -.18rem;
                            }
                        }
                    }
                    .checkbox{
                        margin-top: .4rem;
                        span{
                            padding-right: .3rem;
                            font-size: .26rem;
                            color: #808080;
                            i{
                                color: #83b7ff;
                                text-decoration:underline
                            }
                        }
                    }
                    .loginBtn{
                        width: 100%;
                        height: .8rem;
                        line-height: .8rem;
                        color: #fff;
                        font-size: .3rem;
                        text-align: center;
                        background-color: #83b7ff;
                        border: 0;
                        border-radius: .4rem;
                    }
                }
                .bottom-btn{
                    p{
                        width: 100%;
                        overflow: hidden;
                        text-align: center;
                        color: #b2b2b2;
                        font-size: .26rem;
                        margin-top: .8rem;
                        position: relative;
                        &:before{
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: .65rem;
                            width: 2rem;
                            height: .02rem;
                            background-color: #b3b3b3;

                        }
                        &:after{
                            content: '';
                            position: absolute;
                            top: 50%;
                            right: .65rem;
                            width: 2rem;
                            height: .02rem;
                            background-color: #b3b3b3;

                        }
                    }
                    .wechat-login{
                        margin-top: .75rem;
                        text-align: center;
                        img{
                            width: .92rem;
                            height: .75rem;
                        }
                    }
                }
            }
        }
        .agreement{
            .el-dialog{
                width: 100%;
                height: 100vh;
                overflow-x: hidden;
                overflow-y: auto;
                margin: 0;
            }
            .el-dialog__headerbtn{
                position: fixed;
                top:.05rem;
                right: .1rem;
                .el-dialog__close{
                    color: #000;
                    font-weight: bolder;
                }
            }
            .el-dialog__body {
                padding: 0 .3rem .2rem .3rem;
            }
        }
    }
</style>