<template>
    <div class="my">
        <div class="top"></div>
        <div class="content">
            <div class="user-msg">
                <div class="user-fl fl">
                    <img src="../../assets/images/my/user-pic.png" alt="">
                </div>
                <div class="user-fr">
                    <h3>Car Walker</h3>
                    <p>15022021331</p>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="myOrder">
                <h2>我的订单<span>查看全部订单</span><i class="el-icon-arrow-right"></i></h2>
                <ul class="orderNav">
                    <li>
                        <img src="../../assets/images/my/icon-01.png" alt="">
                        <p>待支付</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-02.png" alt="">
                        <p>待发货</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-03.png" alt="">
                        <p>待收货</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-04.png" alt="">
                        <p>已完成</p>
                    </li>
                </ul>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <img src="../../assets/images/my/icon-05.png" alt="">
                        <p>我的点券</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-06.png" alt="">
                        <p>在线客服</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-07.png" alt="">
                        <p>支付记录</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-08.png" alt="">
                        <p>我的收藏</p>
                    </li>
                    <li>
                        <img src="../../assets/images/my/icon-09.png" alt="">
                        <p>基本设置</p>
                    </li>
                    <li>
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
    export default {
        name: "my",
        data(){
            return{

            }
        },
        methods:{
            
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
                margin-top: .25rem;
                padding-bottom: .15rem;
                border-radius: .15rem;
                li{
                    width: 25%;
                    text-align: center;
                    img{
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
                        margin-top: .6rem;
                        padding-bottom: .3rem;
                        border-left: .02rem solid #f0f3fa;
                        border-bottom: .02rem solid #f0f3fa;
                        img{
                            width: .5rem;
                            height: .51rem;
                        }
                        p{
                            padding-top: .3rem;
                        }
                    }
                }
            }
        }
    }
</style>