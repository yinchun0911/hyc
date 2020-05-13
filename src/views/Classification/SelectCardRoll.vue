<template>
    <div class="selectCardRoll">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="time">
                请在
                <img :src="minute1" alt="">
                <img :src="minute2" alt="">
                <span>:</span>
                <img :src="second1" alt="">
                <img :src="second2" alt="">
                内完成支付
            </div>
            <div class="orderMsg">
                <ul>
                    <li><label>订单编号：</label>{{order.orderNo}}</li>
                    <li><label>下单时间：</label>{{order.orderTime}}</li>
                    <li><label>合计：</label><span>{{order.totleProduct}}</span>（含运费：<span>{{order.totleFreight}}</span>）</li>
                </ul>
                <div class="checkbox">
                    <el-checkbox v-model="checked"></el-checkbox><span @click="dialogVisible = true">阅读并同意<i>服务协议</i></span>
                </div>
            </div>
            <template v-for="item in cardList">

                <div class="cardRoll" :data-id="item.cardID" @click="changeSelect(item)">
                    <div class="list">
                        <img :class="selectCard==item.cardID?'imgActive':''" :src="item.cardPic" alt="">
                        <h2>{{item.cardName}}</h2>
                        <span>剩余点数：{{item.cardBalance}}点</span>
                        <p>{{item.cardNo}}</p>
                    </div>
                </div>
            </template>

            <div class="btns">
                <button @click="dialogTableVisible = true">+添加卡片</button>
                <button class="backBtn" @click="pay">立即支付<span>{{order.totleProduct}}</span></button>
            </div>
            <!--添加卡片-->
            <van-overlay :show="dialogTableVisible" @click="dialogTableVisible = false">
                <div class="wrapper" @click.stop>
                    <div class="box">
                        <ul>
                            <li><label>您的卡号：</label><span @click="scan()">{{cardNo!=""?cardNo:"点击扫码获得卡号"}}</span></li>
                            <li><label>激  活  码：</label><input type="text"  v-model="cardPWD"  placeholder="请输入激活码"></li>
                        </ul>
                        <div class="footBtn">
                            <button class="backBtn"  @click="saveCard()">确 定</button>
                            <button @click="dialogTableVisible = false">取 消</button>
                        </div>
                    </div>
                </div>
            </van-overlay>
            <!--服务协议-->
            <el-dialog class="agreement" :visible.sync="dialogVisible"  top="0">
                <div class="box" v-html="text">

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    import { Dialog } from 'vant'
    var moment = require('moment');
    import wx from "weixin-js-sdk";
    import Toast from "vant/lib/toast";
    export default {
        name: "selectCardRoll",
        data(){
            this.loadUserProtalInfo();
           var params=this.$route.params;
                            // orderNo: "XHT2020041900943257471"
                            //orderTime: "2020-04-19 12:24:04"
                            //totleProduct: 277
                            //totleFreight: 41.3
                            console.log(params);
            this.loadCardList(params.orderNo);
            this.loadOrderInfo(params.orderNo);
            var checked=false;
            if(localStorage.getItem("orderCheck")!=null){
                checked=true;
            }
            return{
                title:'选择卡卷',
                minute1:require('../../assets/images/time/0.png'),
                minute2:require('../../assets/images/time/0.png'),
                second1:require('../../assets/images/time/0.png'),
                second2:require('../../assets/images/time/0.png'),
                checked:checked,
                dialogVisible:false,
                dialogTableVisible:false,
                order:params,
                selectCard:-1,
                text:"",
                cardNo :"",
                cardPWD:"",
                cardList:[],
                time:1800,
                stopTimer:false
            }
        },
        methods:{
            //添零函数
             setNum(num){
                if(num<10){
                    num="0"+num;
                }
                return num;
             },
            changeSelect(item){
                if(this.selectCard!=item.cardID){this.selectCard=item.cardID} else {this.selectCard=-1}
            },

            scan(){
                var page=this;

                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        console.log(res)
                        var array=res.resultStr.split("=");
                        page.cardNo=array[array.length-1];
                    }
                });



            },
            saveCard(){
                var page=this;
                var cardNo=page.cardNo;
                var cardPWD=page.cardPWD;
                if(!(cardNo&&cardPWD)){
                    Dialog({ message: "请扫码获取卡号并输入密码" });
                    return;
                }
                userRequest("/appUser/saveUserCard",{cardNo,cardPWD}).then(function (response) {
                    Dialog({ message: "添加成功" });
                    page.cardList=[];
                    page.loadData(0)

                });
            },
            loadOrderInfo(orderNo){
                 var page=this;
                userRequest("/shopOrder/orderInfo",{orderNo:orderNo}).then(function (response) {
                    page.order=response;
                    var leftTime=0;
                    var day = moment(response.orderTime);
                    var date=new Date();
                   var  leftTime=date.getTime()-day.valueOf();
                   var leftTime=1800-leftTime/1000;

                    page.time=leftTime;
                    page.timmer();
                })
            },
             pay(){
                 var page=this;
                 if(!page.checked){
                     Dialog({ message: '请 阅读 并 同意 用户协议' })
                    return;
                 }
                var cardId=page.selectCard;
                 if (cardId==-1){
                     cardId=0;
                 }


                 var postData={
                    cardId:cardId,
                    orderNo:page.order.orderNo
                 }
                 localStorage.setItem("orderCheck",true);

                 userRequest("/wxPay/wechatPay",postData).then(function (data) {
                     // {
                     //     "code": "200",
                     //     "msg": "处理成功",
                     //     "data": {
                     //         "orderNo": "HYC2005132130292093",
                     //         "package": "prepay_id=wx132137534393792b1919d9dd1708980900",
                     //         "wxPayMoney": 239.0,
                     //         "nonceStr": "34673c6760d9475eb3218fbe474577b9",
                     //         "timeStamp": "1589377073",
                     //         "orderTime": "2020-05-13 21:37:53",
                     //         "paySign": "D0F63E52BA9024CE930922C6506339CC",
                     //         "payMethod": "微信支付",
                     //         "totleProduct": 239.0,
                     //         "appId": "wxdbae52aba6b4c938",
                     //         "cardPayMoney": 0,
                     //         "signType": "MD5"
                     // }
                     // }
                     if (data.wxPayMoney>0){
                         wx.ready(function(){
                             wx.chooseWXPay({
                                 appId:data.appId,
                                 timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                 nonceStr: data.nonceStr, // 支付签名随机串，不长于 32
                                 package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                 signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                 paySign: data.paySign, // 支付签名
                                 success: function (res) {
                                     Toast('支付成功');
                                     //跳转到支付成功页面有这个页面
                                     page.$router.push({name:"successPayment",params:response});


                                 },
                                 cancel: function (res) {//提示引用的是mint-UI里toast
                                     Toast('已取消支付');
                                 },
                                 fail: function (res) {
                                     Toast('支付失败，请重试');
                                 }
                             })
                         });
                     }else{
                         page.$router.push({name:"successPayment",params:data});
                     }

                  });

             },
             loadCardList(orderNo){
                  var page=this;
                    var postData={
                      current: 0,
                      pageSize: 20,
                      orderNo:orderNo
                    }
                    userRequest("/appUser/queryUserCardList",postData).then(function (response) {
                            for(var i in response){
                                page.cardList.push(response[i])
                            }
                            if(page.cardList.length==1){
                                page.selectCard=page.cardList[0].cardID
                            }
                     });

             },
            loadUserProtalInfo(){
                 var page=this;
                userRequest("/appUserCommon/queryUserProtalInfo", {}).then(function (response) {
                    page.text=response.instructionsContent;
                });

            },

             timmer(){
                 var time=this.time-1;
                 if(time<0){
                     Dialog({ message: '订单已超时' });
                     this.$router.push({name:"Home"});
                     return;
                 }
                 this.time=time;
                 var minute=parseInt(time/60);
                 var second=parseInt(time%60);
                 minute=this.setNum(minute);
                 second=this.setNum(second)
                 // 双位数变成单位数
                 var m1=minute%10;
                 var m2=parseInt(minute/10);
                 var s1=second%10;
                 var s2=parseInt(second/10);
                 this.minute1=require('../../assets/images/time/'+m2+'.png');
                 this.minute2=require('../../assets/images/time/'+m1+'.png');
                 this.second1=require('../../assets/images/time/'+s2+'.png');
                 this.second2=require('../../assets/images/time/'+s1+'.png');
                 var that = this;
                 setTimeout(function(){
                     if(!that.stopTimer){
                         that.timmer()
                     }
                 },1000);
             }
        },
        mounted() {


        },destroyed() {
            this.stopTimer=true;
        },
        components: {
            ListHeader
        },
    }
</script>

<style lang="less">
    .selectCardRoll{
        .content{
            margin-top: .88rem;
            margin-bottom: 1.1rem;
            .time{
                height: 1.7rem;
                line-height: 1.7rem;
                text-align: center;
                font-size: .3rem;
                color: #4c4c4c;
                img{
                    width: .3rem;
                    height: .48rem;
                    +img{
                        margin-left: .08rem;
                    }
                }
                span{
                    color: #ff5644;
                    font-size: .4rem;
                    font-weight: bolder;
                }
            }
            .orderMsg{
                background-color: #fff;
                padding: .2rem;
                ul{
                    li{
                        font-size: .26rem;
                        color: #4c4c4c;
                        line-height: .5rem;
                        span{
                            font-size: .3rem;
                            color: #ff5644;
                            position: relative;
                            padding-left: .25rem;
                            &:before{
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 50%;
                                margin-top: -.1rem;
                                width: .19rem;
                                height: .21rem;
                                background: url("../../assets/images/classIfication/money.png") no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
                .checkbox{
                    margin-top: .4rem;
                    span{
                        padding-left: .1rem;
                        font-size: .26rem;
                        color: #808080;
                        i{
                            color: #83b7ff;
                            text-decoration:underline
                        }
                    }
                }
            }
            .cardRoll{
                /*background: url("../../assets/images/classIfication/cardRoll-00.png") no-repeat;*/
                /*background-size: 100% 100%;*/
                margin: .35rem 0;
                .list{
                    position: relative;
                    img{
                        width: 7.26rem;
                        height: 2.15rem;
                        display: block;
                        margin: 0 auto .1rem auto;
                    }
                    h2{
                        width: 3.2rem;
                        font-size: .4rem;
                        color: #fff;
                        font-weight: normal;
                        position: absolute;
                        top: .55rem;
                        left: 2.1rem;
                        white-space:nowrap;
                        overflow:hidden;
                    }
                    span{
                        width: 3.2rem;
                        position: absolute;
                        bottom: .52rem;
                        left: 2rem;
                        font-size: .28rem;
                        color: #fff;
                        white-space:nowrap;
                        overflow:hidden;
                    }
                    p{
                        width: 1.4rem;
                        font-size: .26rem;
                        color: #fff;
                        position: absolute;
                        right: .28rem;
                        top: .5rem;
                        white-space:nowrap;
                        overflow:hidden;
                    }
                    .imgActive{
                        border:1px solid #f00;
                    }
                }
                 /*.blue{*/
                 /*       background: url("../../assets/images/classIfication/cardRoll-01.png") no-repeat !important;*/
                 /*       background-size: 100% 100%;*/
                 /*   }*/
                 /*   .red{*/
                 /*       background: url("../../assets/images/classIfication/cardRoll-02.png") no-repeat !important;*/
                 /*       background-size: 100% 100%;*/
                 /*   }*/
                 /*   .yellow{*/
                 /*       background: url("../../assets/images/classIfication/cardRoll-03.png") no-repeat !important;*/
                 /*       background-size: 100% 100%;*/
                 /*   }*/
                 /*   .green{*/
                 /*       background: url("../../assets/images/classIfication/cardRoll-04.png") no-repeat !important;*/
                 /*       background-size: 100% 100%;*/
                 /*   }*/

                /*div{*/

                /*    position: relative;*/
                /*    margin: 0 auto;*/
                /*    width: 7.26rem;*/
                /*    height: 2.15rem;*/
                /*    background-size: 100% 100%;*/
                /*    span{*/
                /*        position: absolute;*/
                /*        bottom: .52rem;*/
                /*        left: 2rem;*/
                /*        font-size: .28rem;*/
                /*        color: #fff;*/
                /*    }*/
                /*    p{*/
                /*        font-size: .26rem;*/
                /*        color: #fff;*/
                /*        position: absolute;*/
                /*        right: .28rem;*/
                /*        top: .5rem;*/
                /*    }*/
                /*}*/
            }
            .btns{
                padding: 0 .2rem;
                button{
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    color: #83b7ff;
                    margin-bottom: .45rem;
                    border-color: #83b7ff;
                    border-radius: .4rem;
                }
                .backBtn{
                    background-color: #83b7ff;
                    color: #fff;
                    span{
                        position: relative;
                        padding-left: .3rem;
                        &:before{
                            content: '';
                            position: absolute;
                            left: .1rem;
                            top: 50%;
                            margin-top: -.1rem;
                            width: .19rem;
                            height: .21rem;
                            background: url("../../assets/images/classIfication/money-01.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }
        .van-overlay{
            .wrapper{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .box{
                    background-color: #fff;
                    width: 6rem;
                    height: 5rem;
                    overflow: hidden;
                    padding: .2rem .5rem;
                    border-radius: .2rem;
                    ul{
                        li{
                            height: .8rem;
                            line-height: .8rem;
                            border-bottom: .02rem solid #e6e6e6;
                            font-size: .3rem;
                            color: #4c4c4c;
                            label{
                                width: 1.75rem;
                                display: inline-block;
                            }
                            &:first-child{
                                margin-bottom: .3rem;
                            }
                            input{
                                width: 3.2rem;
                                border: 0;
                                margin-bottom: .08rem;
                                height: 100%;
                            }
                        }
                    }
                    .footBtn{
                        button{
                            width: 100%;
                            height: .8rem;
                            line-height: .8rem;
                            text-align: center;
                            font-size: .3rem;
                            color: #83b7ff;
                            margin-top: .3rem;
                            border-color: #83b7ff;
                            border-radius: .4rem;
                        }
                        .backBtn{
                            background-color: #83b7ff;
                            color: #fff;
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
    .van-dialog{z-index: 9999 !important;}
</style>