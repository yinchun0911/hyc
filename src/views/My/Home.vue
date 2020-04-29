<template>
    <div class="my">
        <div class="top"></div>
        <div class="content">
            <div class="user-msg" @click="goTo('accountSet')">
                <div class="user-fl fl">
                    <img :src="headPic" alt="">
                </div>
                <div class="user-fr">
                    <h3>{{name}}</h3>
                    <p>{{phone}}</p>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="myOrder">
                <h2>我的订单 <span @click="goTo('order',{status:0})">查看全部订单</span><i @click="goTo('order',{status:0})" class="el-icon-arrow-right"></i> </h2>
                <ul class="orderNav">
                    <li @click="goTo('order',{status:1})">
                        <el-badge :value="waitPay" :max="99" class="item" :hidden="waitPay==0">
                            <img src="../../assets/images/my/icon-01.png" alt="">
                        </el-badge>
                        <p>待支付</p>
                    </li>

                    <li  @click="goTo('order',{status:2})">
                        <el-badge :value="waitSend" :max="99" class="item" :hidden="waitSend==0">
                            <img src="../../assets/images/my/icon-02.png" alt="">
                        </el-badge>
                        <p>待发货</p>
                    </li>
                    <li  @click="goTo('order',{status:3})">
                        <el-badge :value="waitGet" :max="99" class="item" :hidden="waitGet==0">
                            <img src="../../assets/images/my/icon-03.png" alt="">
                        </el-badge>
                        <p>待收货</p>
                    </li>
                    <li  @click="goTo('order',{status:4})">
                           <img src="../../assets/images/my/icon-04.png" alt="">
                           <p>已完成</p>
                    </li>
                </ul>
            </div>
            <div class="nav">
                <ul>
                    <li class="borderRight borderBot" @click="goTo('Ticket')">
                        <img src="../../assets/images/my/icon-05.png" alt="">
                        <p>我的点券</p>
                    </li>
                    <li class="borderRight borderBot">
                        <img src="../../assets/images/my/icon-06.png" alt="">
                        <p>在线客服</p>
                    </li>
                    <li class="borderBot" @click="goTo('paymentHistory')">
                        <img src="../../assets/images/my/icon-07.png" alt="">
                        <p>支付记录</p>
                    </li>
                    <li class="borderRight" @click="goTo('collection')">
                        <img src="../../assets/images/my/icon-08.png" alt="">
                        <p>我的收藏</p>
                    </li>
                    <li class="borderRight" @click="goTo('setup')">
                        <img src="../../assets/images/my/icon-09.png" alt="">
                        <p>基本设置</p>
                    </li>
                    <li @click="goTo('problem')">
                        <img src="../../assets/images/my/icon-10.png" alt="">
                        <p>常见问题</p>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from '@/components/Footer.vue'
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "my",
        data(){
            var name=  sessionStorage.getItem("name");
            var phone=sessionStorage.getItem("phone");
            var headPic=sessionStorage.getItem("headPic");
            this.loadInfo();
            this.loadOrderCount();
            return{
                name:name,phone:phone,headPic:headPic,
                waitPay:0,waitSend:0,waitGet:0
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
                 });
            },
            loadOrderCount(){
                var page=this;
                userRequest("/shopOrder/getOrderTypeCount",{}).then(function (response) {
                   console.log(response)
                    page. waitPay=response. waitPay
                    page.waitSend=response. waitSend
                    page.waitGet=response. waitGet
                });
            },
            goTo(path,params){
                if(params){
                    this.$router.push({name:path,params:params});
                }else{
                    this.$router.push(path);
                }
            }
        },
        components: {
            Footer,
        },
    }
</script>

<style lang="less">
    .my{
        .top{
            height: 3rem;
            background-color: #83b7ff;
        }
        .content{
            margin-top: -1.2rem;
            padding: 0 .2rem;
            margin-bottom: 1.1rem;
            .user-msg{
                background-color: #fff;
                overflow: hidden;
                padding: .2rem .28rem;
                position: relative;
                .user-fl{
                    width: 1.5rem;
                    height: 1.5rem;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .user-fr{
                    margin-left: 1.74rem;
                    h3{
                        font-size: .3rem;
                        color: #4c4c4c;
                        font-weight: normal;
                        margin-top: .4rem;
                    }
                    p{
                        color: #b2b2b2;
                        font-size: .24rem;
                        margin-top: .15rem;
                    }
                    i{
                        font-size: 20px;
                        position: absolute;
                        right: .2rem;
                        top: 50%;
                        margin-top: -.1rem;
                    }
                }
            }
            .myOrder{
                background-color: #fff;
                overflow: hidden;
                margin: .2rem 0;
                border-radius: .15rem;
                h2{
                    border-bottom: .02rem solid #f0f3fa;
                    height: .8rem;
                    line-height: .8rem;
                    padding: 0 .3rem;
                    font-size: .26rem;
                    color: #4c4c4c;
                    font-weight: normal;
                    position: relative;
                    span{
                        float: right;
                        padding-right: .5rem;
                    }
                    i{
                        font-size: 20px;
                        position: absolute;
                        right: .3rem;
                        top:50%;
                        margin-top: -.2rem;
                    }
                }
            }
            .orderNav{
                background-color: #fff;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                padding-bottom: .15rem;
                border-radius: .15rem;
                li{
                    width: 25%;
                    text-align: center;
                    .el-badge__content{
                        font-size: .16rem;
                        border: 0;
                        top:.2rem;
                    }
                    img{
                        margin-top: .25rem;
                        width: .5rem;
                        height: .44rem;
                    }
                    p{
                        padding-top: .3rem;
                        font-size: .22rem;
                        color: #4c4c4c;
                    }
                }
            }
            .nav{
                background-color: #fff;
                overflow: hidden;
                border-radius: .15rem;
                ul{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap:wrap;
                    li{
                        width: 33.3%;
                        text-align: center;
                        padding-top: .6rem;
                        padding-bottom: .3rem;
                        img{
                            width: .5rem;
                            height: .51rem;
                        }
                        p{
                            padding-top: .3rem;
                            font-size: .26rem;
                            color: #4c4c4c;
                        }
                    }
                    .borderRight{
                        border-right: .02rem solid #f0f3fa;
                    }
                    .borderBot{
                        border-bottom: .02rem solid #f0f3fa;
                    }
                }
            }
        }
    }
</style>