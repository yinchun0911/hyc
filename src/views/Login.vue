<template>
    <div class="login">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="top"></div>
        <div class="content">
            <div class="content-wrap">
                <form>
                    <ul>
                        <li><input type="text" v-model="phone" placeholder="请输入手机号码" ></li>
                        <li><input type="text" v-model="code" placeholder="请输入验证码"><button  type="button" @click="getCode()" class="code">{{text}}</button></li>
                    </ul>
                    <button type="button" @click="loginBtn()"  class="loginBtn">登 录</button>
                </form>
                <div class="bottom-btn">
                    <p>一键登录</p>
                    <div class="wechat-login">
                        <img src="../assets/images/wx.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
      import { Dialog } from 'vant'
    export default {
        name: "login",
        data(){
            var title="登录"
            return{
                title:title,
                text:"获取验证码",
                phone:"",
                code:"",
                countDwon:60,
                hasSend:false
            }
        },
        methods:{
            getCode(){
                console.log(1111)
                var op=this;
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

                        sessionStorage.setItem("userId", response.id);
                        sessionStorage.setItem("name", response.name);
                        sessionStorage.setItem("phone", response.phone);
                        sessionStorage.setItem("headPic", response.headPic);
                        sessionStorage.setItem("token", response.token);

                        op.$router.push({name:"home",params:params});
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
                margin: 0 .2rem;
                background-color: #fff;
                border-radius: .15rem;
                padding: 0 .2rem .75rem .2rem;
                margin-top: -1.5rem;
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
                                height: 100%;
                                padding-left: .65rem;
                                color: #4c4c4c;
                                font-size: .26rem;
                            }
                            &:first-child{
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
                            &:last-child{
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
    }
</style>