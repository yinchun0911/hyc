<template>
    <div class="confirmOrder">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="location">
                <div class="map fl">
                    <i class="el-icon-map-location"></i>
                </div>
                <div class="msg">
                    <h3>Car Walker <span>15022021331</span></h3>
                    <p>重庆市渝北城XXXXXXXXX</p>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="orderMsg">
                <div class="warp-fl fl">
                    <div class="img">
                        <img src="../../assets/images/classIfication/list-11.png" alt="">
                    </div>
                </div>
                <div class="warp-fr">
                    <p>皇家粮仓香雪大米4kg礼盒装</p>
                    <div class="price">
                        <span>198.00</span>
                        <i>X 1</i>
                    </div>
                </div>
            </div>
            <div class="type">
                <p>配送方式<span>快递</span><i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="price-box">
                <ul>
                    <li>商品金额<span>198.00</span></li>
                    <li>运费（重量：0.00kg）<span>0.00</span></li>
                </ul>
            </div>
            <div class="message">
                <p>客户留言</p>
                <el-input type="textarea" :rows="2" placeholder="选填：请先和商家协商一致" v-model="textarea"></el-input>
            </div>
            <div class="orderFooter">
                <p>合计：<span>198.00</span><button>提 交</button></p>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "confirmOrder",
        data(){
            return{
                title:'确认订单',
                textarea:''
            }
        },
        components: {
            ListHeader
        },
    }
</script>

<style lang="less">
    .confirmOrder{
        height: 100%;
        background-color: #f0f3fa;
        .content{
            margin-top: .88rem;
            margin-bottom: .88rem;
            .location{
                position: relative;
                background-color: #fff;
                padding: .35rem .2rem;
                .map{
                    width: .53rem;
                    height: 100%;
                    i{
                        font-size: .4rem;
                        margin-top: .15rem;
                    }
                }
                .msg{
                    margin-left: .6rem;
                    position: relative;
                    h3{
                        font-size: .26rem;
                        color: #4c4c4c;
                        font-weight: normal;
                    }
                    p{
                        font-size: .24rem;
                        color: #b2b2b2;
                        padding-top: .05rem;
                    }
                    i{
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -10px;
                        font-size: 20px;
                    }
                }
                &:after{
                    content: '';
                    width: 100%;
                    height: .13rem;
                    position: absolute;
                    bottom:0;
                    left: 0;
                    background: url("../../assets/images/classIfication/border.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
            .orderMsg{
                padding: .35rem .2rem;
                background-color: #fff;
                margin-top: .2rem;
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
            .type{
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                padding: 0 .2rem;
                border-top: .02rem solid #f0f3fa;
                p{
                    font-size: .26rem;
                    color: #4c4c4c;
                    position: relative;
                    span{
                        float: right;
                        color: #b2b2b2;
                        padding-right: .4rem;
                    }
                    i{
                        font-size: 20px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -10px;
                        color: #000;
                    }
                }
            }
            .price-box{
                padding: 0 .2rem;
                background-color: #fff;
                margin: .2rem 0;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        font-size: .26rem;
                        color: #4c4c4c;
                        border-bottom: .02rem solid #f0f3fa;
                        span{
                            float: right;
                            color: #ff5644;
                            font-weight: bolder;
                            position: relative;
                            &:before {
                                content: '';
                                position: absolute;
                                left: -.2rem;
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
            }
            .message{
                background-color: #fff;
                padding: 0 .2rem;
                margin-bottom: 1rem;
                p{
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .26rem;
                    color: #4c4c4c;
                    border-bottom: .02rem solid #f0f3fa;
                }
                .el-input{
                    margin-top: .25rem;
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
                    font-size: .2rem;
                    color: #ff5644;
                    button{
                        float: right;
                        width: 1.92rem;
                        height: .6rem;
                        line-height: .6rem;
                        font-size: .26rem;
                        color: #fff;
                        text-align: center;
                        background-color: #83b7ff;
                        border-radius: 4rem;
                        border: 0;
                        margin-top: .1rem;
                    }
                }
            }
        }
    }
</style>