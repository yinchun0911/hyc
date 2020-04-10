<template>
    <div class="shopHome">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="list-box">
                <h2>
                    <el-checkbox v-model="checked">445566</el-checkbox>
                    <i class="el-icon-delete"></i>
                </h2>
                <ul>
                    <li>
                        <div class="check fl">
                            <el-checkbox v-model="checked"></el-checkbox>
                        </div>
                        <div class="img fl">
                            <img src="../../assets/images/shopList.png" alt="">
                        </div>
                        <div class="msg">
                            <h3>【优洛苹果】绿色食品认证GMP认证，洛川苹果可以带皮吃12枚75#</h3>
                            <i class="tag">12枚75#</i>
                            <div class="prices">
                                <span class="jg">60.00</span>
                                <el-input-number v-model="num" :min="1" :max="10" size="mini"></el-input-number>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="shopFoot">
                <div class="checkBox fl">
                    <el-checkbox v-model="checked">全选</el-checkbox>
                </div>
                <div class="sum">
                    <label for="">合计：<span>60.00</span></label>
                    <button>去结算（1）</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import Footer from '@/components/Footer.vue'
    export default {
        name: "shopHome",
        data(){
            return{
                title:'购物车',
                checked:false,
                num:0
            }
        },
        components: {
            ListHeader,
            Footer
        },
    }
</script>

<style lang="less">
    .shopHome{
        .content{
            margin-top: .88rem;
            margin-bottom: 1.1rem;
            .list-box{
                margin-top: 1rem;
                padding: 0 .2rem;
                overflow: hidden;
                background-color: #fff;
                h2{
                    height: .8rem;
                    line-height: .8rem;
                    border-bottom: .02rem solid #f0f3fa;
                }
                i.el-icon-delete{
                    float: right;
                    font-size: .35rem;
                    line-height: .8rem;
                }
                .el-checkbox__inner{
                    width: .4rem;
                    height: .4rem;
                    border-radius: 50%;
                }
                ul{
                    li{
                        padding: .2rem 0;
                        height: 1.92rem;
                        .check{
                            width: .6rem;
                            line-height: 1.92rem;
                        }
                        .img{
                            width: 1.84rem;
                            img{
                                max-width: 1.84rem;
                                max-height: 1.43rem;
                            }
                        }
                        .msg{
                            margin-left: 2.8rem;
                            h3{
                                font-size: .24rem;
                                font-weight: normal;
                            }
                            i.tag{
                                display: inline-block;
                                margin-top: .1rem;
                                color: #83b7ff;
                                font-size: .22rem;
                                border: .02rem solid #83b7ff;
                                padding: .02rem .1rem;
                                border-radius: .2rem;
                            }
                            .prices{
                                margin-top: .1rem;
                                span.jg{
                                    font-size: .3rem;
                                    color: #ff5644;
                                    position: relative;
                                    font-weight: bolder;
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
                                .el-input-number--mini{
                                    float: right;
                                    width: 2.09rem;
                                    .el-input-number__decrease, .el-input-number__increase{top: 2px}
                                }
                            }
                        }
                    }
                }
            }
            .shopFoot{
                padding-left: .2rem;
                width: 100%;
                height: .7rem;
                line-height: .7rem;
                position: fixed;
                bottom:1.15rem;
                background-color: #fff;
                .checkBox{
                    width: 1.06rem;
                    .el-checkbox__inner{
                        width: .4rem;
                        height: .4rem;
                        border-radius: 50%;
                        &:after{
                            left: 7px;
                            top:3px;
                        }
                    }
                }
                .sum{
                    margin-left: 1.26rem;
                    text-align: right;
                    label{
                        font-size: .3rem;
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
                    button{
                        width: 2rem;
                        height: .7rem;
                        text-align: center;
                        background-color: #83b7ff;
                        color: #fff;
                        font-size: .3rem;
                        border: 0;
                        margin-left: .4rem;
                    }
                }
            }
        }
    }
</style>