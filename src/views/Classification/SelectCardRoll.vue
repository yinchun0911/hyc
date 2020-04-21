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
                        <div class='cardRoll' :data-id="item.cardID" @click="selectCard=item.cardID" >
                            <div :class="[item.cardName=='红色观影券'?'red':'',
                                                                                   item.cardName=='蓝色观影券'?'blue':'',
                                                                                   item.cardName=='橙色蛋糕券'?'yellow':'',
                                                                                   item.cardName=='绿色洗衣券'?'green':'']">
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
            <el-dialog title="" :visible.sync="dialogTableVisible" top="40vh" :close-on-click-modal="false">
                <ul>
                    <li><label>您的卡号：</label><span>点击扫码获得卡号</span></li>
                    <li><label>激  活  码：</label><input type="text" placeholder="请输入激活码"></li>
                </ul>
                <div class="footBtn">
                    <button class="backBtn">确 定</button>
                    <button @click="dialogTableVisible = false">取 消</button>
                </div>
            </el-dialog>
            <!--服务协议-->
            <el-dialog class="agreement" :visible.sync="dialogVisible">
                <div class="box">
                    服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议服务协议
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    import { Dialog } from 'vant'
    export default {
        name: "selectCardRoll",
        data(){

           var params=this.$route.params;
                            // orderNo: "XHT2020041900943257471"
                            //orderTime: "2020-04-19 12:24:04"
                            //totleProduct: 277
                            //totleFreight: 41.3
                            console.log(params);
            this.loadCardList(params.orderNo);
            return{
                title:'选择卡卷',
                minute1:require('../../assets/images/time/0.png'),
                minute2:require('../../assets/images/time/0.png'),
                second1:require('../../assets/images/time/0.png'),
                second2:require('../../assets/images/time/0.png'),
                checked:false,
                dialogVisible:false,
                dialogTableVisible:false,
                order:params,
                selectCard:-1,
                cardList:[]
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
             pay(){
                 var page=this;
                 if(!page.checked){
                     Dialog({ message: '请 阅读 并 同意 用户协议' })
                    return;
                 }

                 if(page.selectCard==-1){
                     Dialog({ message: '选择卡券支付' })
                     return;
                 }
                 var postData={
                    cardId:page.selectCard,
                    orderNo:page.order.orderNo
                 }
                  userRequest("/shopOrder/orderPay",postData).then(function (response) {
                      page.$router.push({name:"successPayment",params:response});
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
             getTime(){
                 var time=1800;//30分钟换算成1800秒
                 var that = this
                 setInterval(function(){
                     time=time-1;
                     var minute=parseInt(time/60);
                     var second=parseInt(time%60);
                     minute=that.setNum(minute);
                     second=that.setNum(second)
                     // 双位数变成单位数
                     var m1=minute%10;
                     var m2=parseInt(minute/10);
                     var s1=second%10;
                     var s2=parseInt(second/10);
                     that.minute1=require('../../assets/images/time/'+m2+'.png');
                     that.minute2=require('../../assets/images/time/'+m1+'.png');
                     that.second1=require('../../assets/images/time/'+s2+'.png');
                     that.second2=require('../../assets/images/time/'+s1+'.png');
                 },1000);

             }
        },
        mounted() {
           this.getTime()
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
                padding: .35rem 0;
                 .blue{
                        background: url("../../assets/images/classIfication/cardRoll-01.png") no-repeat;
                        background-size: 100% 100%;
                    }
                    .red{
                        background: url("../../assets/images/classIfication/cardRoll-02.png") no-repeat ;
                        background-size: 100% 100%;
                    }
                    .yellow{
                        background: url("../../assets/images/classIfication/cardRoll-03.png") no-repeat;
                        background-size: 100% 100%;
                    }
                    .green{
                        background: url("../../assets/images/classIfication/cardRoll-04.png") no-repeat;
                        background-size: 100% 100%;
                    }

                div{

                    position: relative;
                    margin: 0 auto;
                    width: 7.26rem;
                    height: 2.15rem;
                    background-size: 100% 100%;
                    span{
                        position: absolute;
                        bottom: .52rem;
                        left: 2rem;
                        font-size: .28rem;
                        color: #fff;
                    }
                    p{
                        font-size: .26rem;
                        color: #fff;
                        position: absolute;
                        right: .28rem;
                        top: .5rem;
                    }
                }
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
        .el-dialog{
            width: 6rem;
            border-radius: .2rem;
            .el-dialog__body{
                padding: .2rem .5rem;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        border-bottom: .02rem solid #e6e6e6;
                        font-size: .3rem;
                        color: #4c4c4c;
                        &:first-child{
                            margin-bottom: .3rem;
                        }
                        input{
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
        .agreement{
            .el-dialog{
                height: 75vh;
                overflow-x: hidden;
                overflow-y: auto;
            }
            .el-dialog__headerbtn{
                position: fixed;
                top:15vh;
                right: .8rem;
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