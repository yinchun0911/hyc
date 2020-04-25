<template>
    <div class="orderDetails">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">

        <template v-for="product in orderDetail.producList">
            <div class="orderMsg">
                <div class="warp-fl fl">
                    <div class="img">
                        <img :src="product.productPic" alt="">
                    </div>
                </div>
                <div class="warp-fr">
                    <p>{{product.productName}}</p>
                    <div class="price">
                        <span>{{product.productPrice}}</span>
                        <i>X {{product.saleNum}}</i>
                    </div>
                </div>
            </div>
        </template>
            <div class="orderStatus">
                <h3 class="title">订单状态：<span>{{orderDetail.orderStarusMsg  }}</span></h3>
                <van-steps direction="vertical" :active="orderDetail.orderLogInfoList.length" active-color="#38f">
                    <van-step v-for="log  in orderDetail.orderLogInfoList">
                        <h3>{{log.operRemark}}</h3>
                        <p>{{log.operTime}}</p>
                    </van-step>
                </van-steps>
            </div>
            <div class="orderBox">
                <ul>
                    <li>订单单号：<span>{{orderDetail.orderNo}}</span></li>
                    <li>下单时间：<span>{{orderDetail.orderTime}}</span></li>
                    <li>支付方式：<span>{{orderDetail.payMethod}}</span></li>
                    <li>配送方式：<span>{{orderDetail.postMethod}}</span></li>
                </ul>
            </div>
            <div class="userMsg">
                <h4>{{orderDetail.address.linkMan}} <span>{{orderDetail.address.linkPhone}}</span></h4>
                <p>{{ orderDetail.address.fullAddress}}</p>
            </div>
            <div class="orderFooter">
                <p>合计：<span>{{orderDetail.totleProduct}}</span></p>
                <p>运费：<span>{{orderDetail.totleFreight}}</span></p>
            </div>
        </div>

    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
      import { request, userRequest} from '@/js/request.js'
    export default {
        name: "orderDetails",
        data(){
            var orderNo =this.$route.query.orderNo+"";
            this.loadData(orderNo);
            return{
                title:'订单详情',
                orderDetail:{}
            }
        },
        methods:{
            loadData(orderNo){
                var page=this;
                userRequest("/shopOrder/orderInfo",{orderNo:orderNo}).then(function (response) {
                    page.orderDetail=response;
               })
            }
        },
        mounted() {

        },
        components: {
            ListHeader
        },
    }
</script>

<style lang="less">
    .orderDetails{
        height: 100%;
        background-color: #f0f3fa;
        .content{
            margin-top: 1.08rem;
            margin-bottom: .88rem;
            .orderMsg{
                padding: .35rem .2rem;
                background-color: #fff;
                .warp-fl{
                    width: 2.4rem;
                    height: 1.32rem;
                    font-size:0;
                    display:table;
                    .img{
                        display:table-cell;
                        text-align: center;
                        vertical-align:middle;
                        width: 100%;
                        height:1.32rem;
                        img{
                            max-width: 2.15rem;
                            max-height: 1.32rem;
                        }
                    }
                }
                .warp-fr {
                    margin-left: 2.4rem;
                    p {
                        color: #4c4c4c;
                        font-size: .3rem;
                    }
                    .price {
                        margin-top: .35rem;
                        span {
                            font-size: .3rem;
                            color: #ff5644;
                            position: relative;
                            padding-left: .2rem;
                            font-weight: bolder;
                            &:before {
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
                        i{
                            float: right;
                            font-size: .24rem;
                            color: #4c4c4c;
                        }
                    }
                }
            }
            .orderStatus{
                background-color: #fff;
                overflow: hidden;
                padding-top: .2rem;
                margin-top: .2rem;
                h3.title{
                    font-size: .26rem;
                    color: #4c4c4c;
                    font-weight: normal;
                    padding-left: .2rem;
                    margin-bottom: .2rem;
                    span{
                        color: #b2b2b2;
                    }
                }
                .van-hairline{
                    font-size: .26rem;
                    h3{
                        font-weight: normal;
                        color: #b2b2b2;
                    }
                    p{
                        padding-top: .1rem;
                        color: #b2b2b2;
                    }
                }
                .van-step--finish .van-step__circle, .van-step--finish .van-step__line{
                    background-color: rgb(51, 136, 255);
                }
            }
            .orderBox{
                background-color: #fff;
                overflow: hidden;
                margin-top: .2rem;
                padding: 0 .2rem;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        font-size: .26rem;
                        color: #4c4c4c;
                        border-bottom: .02rem solid #f0f3fa;
                        span{
                            color: #b2b2b2;
                        }
                    }
                }
            }
            .userMsg{
                background-color: #fff;
                overflow: hidden;
                margin-top: .2rem;
                padding: .2rem;
                h4{
                    font-weight: normal;
                    font-size: .26rem;
                    color: #4c4c4c;
                    span{
                        color: #b2b2b2;
                        padding-left: .15rem;
                    }
                }
                p{
                    font-size: .26rem;
                    color: #b2b2b2;
                    margin-top: .2rem;
                }
            }
            .orderFooter{
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                position: fixed;
                bottom:0;
                padding: 0 .2rem;
                span{
                    position: relative;
                    padding-left: .2rem;
                    font-size: .28rem;
                    font-weight: bolder;
                    &:before {
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
                p{
                    width: 50%;
                    font-size: .2rem;
                    color: #ff5644;
                    float: left;
                    &:last-child{
                        text-align: right;
                        color: #4c4c4c;
                    }
                }
            }
        }
    }
</style>