<template>
    <div class="ticket">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <template v-for="item in cardList">
                <div class="cardRoll">
                    <div class="list">
                        <img :src="item.cardPic" alt="">
                        <h2>{{item.cardName}}</h2>
                        <span>剩余点数：{{item.cardBalance}}点</span>
                        <p>{{item.cardNo}}</p>
                    </div>
                </div>
            </template>
            <div class="saveBtn">
                <button class="save" @click="dialogTableVisible = true">绑定实体点券</button>
            </div>
            <!--添加卡片-->
            <el-dialog title="" :visible.sync="dialogTableVisible" top="40vh" :close-on-click-modal="false">
                <ul>
                    <li><label>您的卡号：</label><span @click="scan()">{{cardNo!=""?cardNo:"点击扫码获得卡号"}}</span></li>
                    <li><label>激 活 码：</label><input type="text" v-model="cardPWD" placeholder="请输入激活码"></li>
                </ul>
                <div class="footBtn">
                    <button class="backBtn" @click="saveCard()">确 定</button>
                    <button @click="dialogTableVisible = false">取 消</button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk'
    import ListHeader from '@/components/ListHeader.vue'
    import {getrequest, userRequest} from '@/js/request.js'
    import {Dialog} from 'vant'
    import Toast from "vant/lib/toast";

    export default {
        name: "ticket",
        data() {
            this.loadData(0);


            return {
                title: '我的点券',
                cardList: [],
                dialogTableVisible: false,
                cardNo: "",
                cardPWD: "",
                wechatInit: false
            }
        },
        methods: {
            loadData(current) {
                var page = this;
                var postData = {
                    current: current,
                    pageSize: 30,
                }
                userRequest("/appUser/queryUserCardList", postData).then(function (response) {
                    for (var i in response) {
                        page.cardList.push(response[i])
                    }
                })
            },

            scan() {
                var page = this;

                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        console.log(res)
                        var array = res.resultStr.split("=");
                        page.cardNo = array[array.length - 1];
                    }
                });


            },
            saveCard() {
                var page = this;
                var cardNo = page.cardNo;
                var cardPWD = page.cardPWD;
                if (!(cardNo && cardPWD)) {
                    Toast("请扫码获取卡号并输入密码");
                    return;
                }
                userRequest("/appUser/saveUserCard", {cardNo, cardPWD}).then(function (response) {
                    Toast("添加成功");
                    page.cardList = [];
                    page.loadData(0)

                });
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .ticket {
        .content {
            margin-top: 1.2rem;

            .cardRoll {
                width: 100%;

                .list {
                    position: relative;
                    margin: 0 auto .1rem auto;
                    width: 7.26rem;
                    height: 2.15rem;

                    img {
                        width: 7.26rem;
                        height: 2.15rem;
                        display: block;
                    }

                    h2 {
                        width: 3.2rem;
                        font-size: .4rem;
                        color: #fff;
                        font-weight: normal;
                        position: absolute;
                        top: .55rem;
                        left: 2.1rem;
                        white-space: nowrap;
                        overflow: hidden;
                    }

                    span {
                        width: 3.2rem;
                        position: absolute;
                        bottom: .52rem;
                        left: 2rem;
                        font-size: .28rem;
                        color: #fff;
                        white-space: nowrap;
                        overflow: hidden;
                    }

                    p {
                        width: 1.4rem;
                        font-size: .26rem;
                        color: #fff;
                        position: absolute;
                        right: .2rem;
                        top: .5rem;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }

                /*background: url("../../assets/images/classIfication/cardRoll-00.png") no-repeat;*/
                /*background-size: 100% 100%;*/
                /*div{*/
                /*    position: relative;*/
                /*    margin: 0 auto;*/
                /*    width: 7.26rem;*/
                /*    height: 2.15rem;*/

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

            .blue {
                background: url("../../assets/images/classIfication/cardRoll-01.png") no-repeat !important;
                background-size: 100% 100%;
            }

            .red {
                background: url("../../assets/images/classIfication/cardRoll-02.png") no-repeat !important;
                background-size: 100% 100%;
            }

            .yellow {
                background: url("../../assets/images/classIfication/cardRoll-03.png") no-repeat !important;
                background-size: 100% 100%;
            }

            .green {
                background: url("../../assets/images/classIfication/cardRoll-04.png") no-repeat !important;
                background-size: 100% 100%;
            }

            .saveBtn {
                padding: 0 .9rem;
                margin-top: .7rem;

                button.save {
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    color: #fff;
                    font-size: .3rem;
                    border-radius: .4rem;
                    background-color: #83b7ff;
                    border: 0;
                }
            }

            .el-dialog {
                width: 6rem;
                border-radius: .2rem;

                .el-dialog__body {
                    padding: .2rem .5rem;

                    ul {
                        li {
                            height: .8rem;
                            line-height: .8rem;
                            border-bottom: .02rem solid #e6e6e6;
                            font-size: .3rem;
                            color: #4c4c4c;

                            label {
                                width: 1.75rem;
                                display: inline-block;
                            }

                            &:first-child {
                                margin-bottom: .3rem;
                            }

                            input {
                                border: 0;
                                margin-bottom: .08rem;
                                width: 3rem;
                                height: 100%;
                                display: inline-block;
                                background-color: transparent;
                            }
                        }
                    }

                    .footBtn {
                        button {
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

                        .backBtn {
                            background-color: #83b7ff;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>