<template>
    <div class="detail">
        <ListHeader :title="title" @shopClick="shopClick"></ListHeader>
        <div class="content">
            <div class="banner">
                <div class="swiper-container" id="gallery">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="../../assets/images/classIfication/box-01.png" alt=""></div>
                        <div class="swiper-slide"><img src="../../assets/images/classIfication/box-01.png" alt=""></div>
                        <div class="swiper-slide"><img src="../../assets/images/classIfication/box-01.png" alt=""></div>
                        <div class="swiper-slide"><img src="../../assets/images/classIfication/box-01.png" alt=""></div>
                        <div class="swiper-slide"><img src="../../assets/images/classIfication/box-01.png" alt=""></div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <!--        <div class="swiper-pagination"></div>-->
                </div>
            </div>
            <div class="hite">
                <p>皇家粮仓香雪大米4kg礼盒装</p>
                <div class="price">
                    <span>198.00</span>
                    <s>(228.00)</s>
                    <i>倾情推荐</i>
                    <b>已售6810件</b>
                </div>
                <p class="foot-word">S5782P31311</p>
                <p class="foot-word">满150店铺免邮（如有赠品，赠完为止）</p>
            </div>
            <div class="select-box">
                <ul>
                    <li>
                        <label>规格</label>
                        <span>皇家香雪大米4kg礼盒装</span>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                    <li>
                        <label>送至</label>
                        <span>添加收货地址</span>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                </ul>
            </div>
            <div class="warp">
                <h2>商品详情</h2>
                <div class="img-box">
                    <img src="../../assets/images/classIfication/box-02.png" alt="">
                    <img src="../../assets/images/classIfication/box-03.png" alt="">
                </div>
            </div>
            <div class="detail-foot">
                <div class="foot-fl fl">
                    <img src="../../assets/images/classIfication/icon-01.png" alt="">
                    <img src="../../assets/images/classIfication/icon-02.png" alt="">
                    <img src="../../assets/images/classIfication/icon-03.png" alt="">
                </div>
                <div class="foot-fr fr">
                    <span>加入推车</span>
                    <span @click="drawer = true">立即够买</span>
                </div>
            </div>
            <!--返回顶部-->
            <div class="backTop" v-if="btnFlag" @click="backTop">
                <i class="el-icon-arrow-up"></i>
            </div>
            <!--立即够买-->
            <div class="drawer-box">
                <el-drawer :visible.sync="drawer" direction="btt" :wrapperClosable="false">
                    <div class="drawer-warp">
                        <div class="warp-fl fl">
                            <div class="img">
                                <img src="../../assets/images/classIfication/list-11.png" alt="">
                            </div>
                        </div>
                        <div class="warp-fr">
                            <p>皇家粮仓香雪大米4kg礼盒装</p>
                            <div class="price">
                                <span>198.00</span>
                                <s>(228.00)</s>
                            </div>
                        </div>
                    </div>
                    <div class="specifications">
                        <p>规格</p>
                        <ul>
                            <li class="active">皇家香雪大米4kg礼盒装</li>
                            <li>皇家香雪大米8kg礼盒装</li>
                        </ul>
                    </div>
                    <div class="specifications">
                        <p>数量<el-input-number v-model="num" :min="1" :max="10" size="mini"></el-input-number></p>
                        <button>立即够买</button>
                    </div>
                </el-drawer>
            </div>

        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import Swiper from 'swiper';
    import 'swiper/css/swiper.min.css';
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "detail",
        data(){
            this.getProductInfo();
            return{
                title:'商品详情',
                btnFlag:false,
                drawer:false,
                num:0,
                product:{}
            }
        },
        methods: {
            getProductInfo(){
                 var productID = this.$route.params.productID+"";
                var postData={
                  "productID": productID,
                  "token": "string"
                };
                request("/shopProduct/queryProductInfo",postData).then(function (response) {
                       product=response
                 })
            },
            // 购物车按钮
            shopClick(val){
                console.log(val)
            },
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop () {
                const that = this
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5)
                    document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                    if (that.scrollTop === 0) {
                        clearInterval(timer)
                    }
                }, 16)
            },

            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop () {
                const that = this
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.scrollTop = scrollTop
                if (that.scrollTop > 60) {
                    that.btnFlag = true
                } else {
                    that.btnFlag = false
                }
            }
        },
        components: {
            ListHeader
        },
        destroyed () {
            window.removeEventListener('scroll', this.scrollToTop)
        },
        mounted() {
            window.addEventListener('scroll', this.scrollToTop)
            var gallerySwiper = new Swiper('#gallery', {
                spaceBetween: 10,
                effect : 'fade',
                paginationClickable: true,
                autoplay: {
                    delay: 2000,//2秒切换一次
                    disableOnInteraction: false,
                },
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true,
                },
            });
        },
    }
</script>

<style lang="less">
    .detail{
        .content{
            margin-top: .88rem;
            margin-bottom: 1.1rem;
            .banner{
                width: 100%;
                background-color: #fff;
                .swiper-slide{
                    display: block;
                    height: 3.98rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .item_1{
                    background: url('../../assets/images/classIfication/box-01.png') no-repeat center 0;
                    background-size: 100% 100%;
                }
                .item_2{
                    background: url('../../assets/images/classIfication/box-01.png') no-repeat center 0;
                    background-size: 100% 100%;
                }
            }
            .hite{
                padding: 0 .2rem;
                margin-top: .5rem;
                p{
                    font-size: .3rem;
                    color: #4c4c4c;
                }
                .price{
                    margin-top: .3rem;
                    margin-bottom: .2rem;
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
                    s{
                        padding-left: .1rem;
                        font-size: .18rem;
                        color: #b2b2b2;
                    }
                    i{
                        margin-left: .1rem;
                        font-size: .2rem;
                        color: #fff;
                        padding: .05rem .2rem;
                        border-radius: .3rem;
                        background-color: #ff5644;
                    }
                    b{
                        color: #b2b2b2;
                        font-size: .24rem;
                        font-weight: normal;
                        float: right;
                    }
                }
                .foot-word{
                    font-size: .2rem;
                    color: #b2b2b2;
                    margin-bottom: .2rem;
                }
            }
            .select-box{
                border-top: .2rem solid #f0f3fa;
                border-bottom: .2rem solid #f0f3fa;
                padding: 0 .2rem;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        &:first-child{
                            border-bottom: .02rem solid #f0f3fa;
                        }
                        label{
                            font-size: .26rem;
                            color: #b2b2b2;
                        }
                        span{
                            font-size: .26rem;
                            color: #4c4c4c;
                            padding-left: .25rem;
                        }
                        i{
                            float: right;
                            font-size: .3rem;
                            margin-top: .3rem;
                        }
                    }
                }
            }
            .warp{
                padding: 0 .2rem;
                h2{
                    height: .8rem;
                    line-height: .8rem;
                    border-bottom: .02rem solid #f0f3fa;
                    font-size: .3rem;
                    color: #4c4c4c;
                }
                .img-box{
                    font-size: 0;
                    display: inline-table;
                    text-align: center;
                    img{
                        margin-top: .35rem;
                        width: 100%;
                    }
                }

            }
            .backTop{
                width: .6rem;
                height: .6rem;
                line-height: .6rem;
                background-color: #dcdcdc;
                border-radius: 50%;
                text-align: center;
                position: fixed;
                right: .3rem;
                bottom:1rem;
                i{
                    color: #fff;
                    font-size: .3rem;
                }
            }
            .detail-foot{
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                border-top: .02rem solid #f0f3fa;
                position: fixed;
                bottom:0;
                z-index: 1000;
                .foot-fl{
                    width: 50%;
                    display: flex;
                    justify-content:space-around;
                    img{
                        width: .45rem;
                        height: .43rem;
                        margin-top: .2rem;
                    }
                }
                .foot-fr{
                    width: 50%;
                    span{
                        display: inline-block;
                        width: 1.8rem;
                        height: .6rem;
                        line-height: .6rem;
                        text-align: center;
                        font-size: .26rem;
                        color: #fff;
                        background-color: #83b7ff;
                        &:first-child{
                            background-color: #bed9ff;
                            border-top-left-radius: .5rem;
                            border-bottom-left-radius: .5rem;
                        }
                        &:last-child{
                            border-top-right-radius: .5rem;
                            border-bottom-right-radius: .5rem;
                        }
                    }
                }
            }
            .drawer-box{
                .el-drawer{
                    height: 6rem !important;
                    .el-drawer__header{
                        padding: .2rem .2rem 0;
                        margin-bottom: .2rem;
                    }
                    .drawer-warp{
                        padding: 0 .2rem;
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
                        .warp-fr{
                            margin-left: 2.4rem;
                            p{
                                color: #4c4c4c;
                                font-size: .3rem;
                            }
                            .price{
                                margin-top: .35rem;
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
                                s{
                                    padding-left: .1rem;
                                    font-size: .18rem;
                                    color: #b2b2b2;
                                }
                            }
                        }
                    }
                    .specifications{
                        margin-top: .45rem;
                        padding: 0 .2rem;
                        p{
                            font-size: .26rem;
                            color: #4c4c4c;
                            .el-input-number{
                                float: right;
                            }
                        }
                        ul{
                            margin: .2rem 0 .4rem 0;
                            display: flex;
                            li{
                                width: 3rem;
                                height: .6rem;
                                line-height: .6rem;
                                font-size: .22rem;
                                color: #b2b2b2;
                                text-align: center;
                                border: .02rem solid #b3b3b3;
                                border-radius: .3rem;
                                &+li{
                                    margin-left: .25rem;
                                }
                            }
                            .active{
                                background-color: #e9f2ff;
                                color: #83b7ff;
                                border-color: #83b7ff;
                            }
                        }
                        button{
                            margin-top: .4rem;
                            width: 100%;
                            height: .8rem;
                            line-height: .8rem;
                            font-size: .3rem;
                            color: #fff;
                            text-align: center;
                            border-radius: .4rem;
                            background-color: #83b7ff;
                            border: 0;
                        }
                    }
                }
            }
        }
    }
</style>