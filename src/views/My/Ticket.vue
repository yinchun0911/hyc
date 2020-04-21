<template>
    <div class="ticket">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <template v-for="item in cardList">
                        <div :class="['cardRoll',item.cardName=='红色观影券'?'red':'',
                                                  item.cardName=='蓝色观影券'?'blue':'',
                                                  item.cardName=='橙色蛋糕券'?'yellow':'',
                                                  item.cardName=='绿色洗衣券'?'green':'']">
                            <div>
                                <span>剩余点数：{{item.cardBalance}}点</span>
                                <p>{{item.cardNo}}</p>
                            </div>
                        </div>
            </template>

            <button class="save" @click="dialogTableVisible = true">绑定实体点券</button>
            <!--添加卡片-->
            <el-dialog title="" :visible.sync="dialogTableVisible" top="40vh" :close-on-click-modal="false">
                <ul>
                    <li><label>您的卡号：</label><span @click="scan()">{{cardNo!=""?cardNo:"点击扫码获得卡号"}}</span></li>
                    <li><label>激  活  码：</label><input type="text" :model="cardPWD" placeholder="请输入激活码"></li>
                </ul>
                <div class="footBtn">
                    <button class="backBtn">确 定</button>
                    <button @click="dialogTableVisible = false">取 消</button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk'
    import ListHeader from '@/components/ListHeader.vue'
     import { getrequest, userRequest} from '@/js/request.js'
    import { Dialog } from 'vant'
    export default {
        name: "ticket",
        data(){
            this.loadData(0)
            return{
                title:'我的点券',
                cardList:[],
                dialogTableVisible:false,

                cardNo :"",
                cardPWD:"",
                wechatInit:false
            }
        },
         methods:{
            loadData(current){
                var page=this;
                var postData={
                  current: current,
                  pageSize: 30,
                }
                userRequest("/appUser/queryUserCardList",postData).then(function (response) {
                        for(var i in response){
                            page.cardList.push(response[i])
                        }
                 })
            },
            scan(){
                var page=this;
                if(!page.wechatInit){
                    var href=window.location.href;
                    getrequest("/wechat/getCode", {url:href}).then(function (res) {
                        getrequest(res,{}).then(function(data){
                            var  jsondata=JSON.parse(res);
                            wx.config({
                                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                debug: false,
                                // 必填，公众号的唯一标识
                                appId: jsondata.model.appId,
                                // 必填，生成签名的时间戳
                                timestamp: "" + jsondata.model.timestamp,
                                // 必填，生成签名的随机串
                                nonceStr: jsondata.model.nonceStr,
                                // 必填，签名
                                signature: jsondata.model.signature,
                                // 必填，需要使用的JS接口列表，所有JS接口列表
                                jsApiList: ['checkJsApi', 'scanQRCode']
                            });


                            wx.error(function (res) {
                                alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                            });
                            wx.ready(function () {
                                wx.checkJsApi({
                                    jsApiList: ['scanQRCode'],
                                    success: function (res) {
                                        page.wechatInit=true;
                                    }
                                });

                            });
                        });
                    });

                }else{
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                page.cardNo=res.resultStr
                            }
                        });

                    }

            },
            saveCard(){
                var page=this;
                var cardNo=page.cardNo;
                var cardPWD=page.cardPWD;
                 userRequest("/appUser/saveUserCard",{cardNo,cardPWD}).then(function (response) {
                        Dialog({ message: "添加成功" });
                        page.cardList=[];
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
    .ticket{
        .content{
            margin-top: 1.2rem;
            .cardRoll{
                div{
                    position: relative;
                    margin: 0 auto;
                    width: 7.26rem;
                    height: 2.15rem;
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
            .blue{
                background: url("../../assets/images/classIfication/cardRoll-01.png") no-repeat;
                background-size: 100% 100%;
            }
            .red{
                background: url("../../assets/images/classIfication/cardRoll-02.png") no-repeat;
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
            button.save{
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                color: #fff;
                font-size: .3rem;
                border-radius: .4rem;
                background-color: #83b7ff;
                border: 0;
                margin-top: .7rem;
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
        }

    }

</style>