<template>
    <div class="paymentHistory">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="box">
                <h2>
                    <div class="inputWarp fl">
                        <span class="form-control"><i class="dataPicker" id="date-group1-1">本月</i><i class="el-icon-caret-bottom"></i></span>
                    </div>
                    <p>支出 <span>396.00</span></p>
                </h2>
                <div class="listWarp">
                    <div class="listMsg">
                        <div class="list-fl fl">
                            <div class="img">
                                <img src="../../assets/images/classIfication/list-11.png" alt="">
                            </div>
                        </div>
                        <div class="list-fr">
                            <h3>皇家香雪大米4kg礼盒装<span>X 1</span></h3>
                            <p>共1件商品</p>
                            <div>订单时间：2020-03-26  12:00:00</div>
                        </div>
                    </div>
                </div>
                <div class="listWarp">
                    <div class="listMsg">
                        <div class="list-fl fl">
                            <div class="img">
                                <img src="../../assets/images/classIfication/list-11.png" alt="">
                            </div>
                        </div>
                        <div class="list-fr">
                            <h3>皇家香雪大米4kg礼盒装<span>X 1</span></h3>
                            <p>共1件商品</p>
                            <div>订单时间：2020-03-26  12:00:00</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box">
                <h2>
                    <div class="inputWarp fl">
                        <span class="form-control"><i class="dataPicker" id="date-group1-2"></i><i class="el-icon-caret-bottom"></i></span>
                    </div>
                    <p>支出 <span>396.00</span></p>
                </h2>
                <div class="listWarp">
                    <div class="listMsg">
                        <div class="list-fl fl">
                            <div class="img">
                                <img src="../../assets/images/classIfication/list-10.png" alt="">
                            </div>
                        </div>
                        <div class="list-fr">
                            <h3>欧利莱特级初榨橄榄油750ml<span>X 1</span></h3>
                            <p>共1件商品</p>
                            <div>订单时间：2020-03-26  12:00:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import Rolldate from '@/assets/libs/jdate.min.js'
    export default {
        name: "paymentHistory",
        data(){
            return{
                title:'支付记录'
            }
        },
        mounted() {
            new Rolldate({
                el: '#date-group1-1',
                format: 'YYYY-MM',
                beginYear: 2000,
                endYear: 2100
            })
            new Rolldate({
                el: '#date-group1-2',
                format: 'YYYY-MM',
                beginYear: 2000,
                endYear: 2100,
                value: '2020-2'
            })
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .paymentHistory{
        .content{
            margin-top: .88rem;
            padding: 0 .2rem;
            overflow: hidden;
            .box{
                h2{
                    margin-top: .35rem;
                    margin-bottom: .15rem;
                    height: .6rem;
                    .inputWarp{
                        min-width: 1.2rem;
                        height: .6rem;
                        line-height: .6rem;
                        background-color: #fff;
                        padding: 0 .2rem;
                        position: relative;
                        .form-control{
                            width: 100%;
                            height: .6rem;
                            line-height: .6rem;
                            color: #4c4c4c;
                            font-size: .26rem;
                            padding-right: .35rem;
                            .dataPicker{
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                            }
                            .el-icon-caret-bottom{
                                font-size: .2rem;
                                position: absolute;
                                right: .2rem;
                                top:50%;
                                margin-top: -.1rem;
                            }
                        }
                    }
                    p{
                        float: right;
                        line-height: .6rem;
                        font-size: .26rem;
                        color: #4c4c4c;
                        span{
                            font-size: .3rem;
                            color: #ff5644;
                            position: relative;
                            padding-left: .2rem;
                            font-weight: bolder;
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
                .listWarp{
                    background-color: #fff;
                    padding: .3rem;
                    border-radius: .2rem;
                    width: 100%;
                    overflow: hidden;
                    .listMsg{
                        padding-top: .1rem;
                        .list-fl{
                            width: 2.08rem;
                            height: 1.53rem;
                            font-size:0;
                            display:table;
                            .img{
                                display:table-cell;
                                text-align: center;
                                vertical-align:middle;
                                width: 100%;
                                height: 1.53rem;
                                border: .02rem solid #e6e6e6;
                                img{
                                    max-width: 2.08rem;
                                    max-height: 1.53rem;
                                }
                            }
                        }
                        .list-fr{
                            margin-left: 2.34rem;
                            h3{
                                font-size: .24rem;
                                color: #4c4c4c;
                                span{
                                    float: right;
                                }
                            }
                            p{
                                margin-top: .45rem;
                                font-size: .22rem;
                                color: #b2b2b2;
                            }
                            div{
                                font-size: .22rem;
                                color: #b2b2b2;
                                padding-top: .1rem;
                            }
                        }
                    }
                }
            }

        }
    }
</style>