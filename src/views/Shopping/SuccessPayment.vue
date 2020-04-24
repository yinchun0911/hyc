<template>
    <div class="successPayment">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="content">
                <div class="top">
                    <div class="word">
                        <h2>支付成功!</h2>
                        <p>感谢你的支持</p>
                    </div>
                </div>
                <div class="orderMsg">
                    <div class="price">
                        <span>{{order.totleProduct}}</span>
                    </div>
                    <ul>
                        <li><label>订单编号：</label><span>{{order.orderNo}}</span></li>
                        <li><label>下单时间：</label><span>{{order.orderTime}}</span></li>
                        <li><label>支付方式：</label><span>{{order.payMethod}}</span></li>
                    </ul>
                </div>
                <div class="btns" @click="goDetail(order.orderNo)">
                    <button >订单详情</button>
                    <button class="backBtn">返  回</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "successPayment",
        data(){
           var params=this.$route.params;
            return{
                title:'支付成功',
                order:params
            }
        },  methods:{
            goDetail(orderNo){
              var op=this;
              console.log(op.order.orderNo)
              op.$router.push({name:'orderDetails',query:{orderNo:orderNo}});
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .successPayment{
        .content{
            margin-top: .88rem;
            .top{
                width: 100%;
                height: 3rem;
                background-color: #83b7ff;
                position: relative;
                .word{
                    position: absolute;
                    left: 4rem;
                    top:23%;
                    h2{
                        font-size: .4rem;
                        color: #fff;
                    }
                    p{
                        font-size: .26rem;
                        color: #c8d8fe;
                        padding-top: .1rem;
                    }
                }
                &:before{
                    content: '';
                    width: 1.55rem;
                    height: 1.16rem;
                    background: url("../../assets/images/succse.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 2.15rem;
                    top: 20%;
                }
            }
            .orderMsg{
                margin: -.7rem auto 0 auto;
                width: 7.14rem;
                height: 5.58rem;
                background: url("../../assets/images/bg-01.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                z-index: 5;
                .price{
                    text-align: center;
                    line-height: 1.65rem;
                    span{
                        font-size: .36rem;
                        color: #ff5644;
                        position: relative;
                        padding-left: .25rem;
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
                ul{
                    li{
                        font-size: .26rem;
                        margin-top: .5rem;
                        padding-left: .85rem;
                        label{
                            color: #7d7d7d;
                        }
                        span{
                            color: #3f3f3f;
                        }
                    }
                }
            }
            .btns{
                padding: 0 .2rem;
                margin-top: 1.25rem;
                button{
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    background-color: #83b7ff;
                    color: #fff;
                    border-color: #83b7ff;
                    border-radius: .4rem;
                    margin-bottom: .45rem;
                }
                .backBtn{
                    background-color: #fff;
                    color: #b2b2b2;
                    border-color: #d7d9dd;
                }
            }

        }
    }
</style>