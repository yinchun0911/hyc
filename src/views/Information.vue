<template>
    <div class="information">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="list">
                <h3><img src="../assets/images/information-03.png" alt="">最新消息</h3>
                <ul>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-02.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>系统客服<span>20分钟前</span></h4>
                            <p>你的好友给您一个赞</p>
                        </div>
                    </li>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-05.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>系统通知<span>星期一</span></h4>
                            <p>又有新版本更新咯！！</p>
                        </div>
                    </li>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-01.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>店铺头条<span>6月3日</span></h4>
                            <p>满100送200，超值划算</p>
                        </div>
                    </li>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-01.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>木木<span>5月31日</span></h4>
                            <p>你最近怎么了</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list">
                <h3><img src="../assets/images/information-04.png" alt="">两周前消息</h3>
                <ul>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-02.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>系统客服<span>20分钟前</span></h4>
                            <p>你的好友给您一个赞</p>
                        </div>
                    </li>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-05.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>系统通知<span>星期一</span></h4>
                            <p>又有新版本更新咯！！</p>
                        </div>
                    </li>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-01.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>店铺头条<span>6月3日</span></h4>
                            <p>满100送200，超值划算</p>
                        </div>
                    </li>
                    <li>
                        <div class="badge fl">
                            <img src="../assets/images/information-01.png" alt="">
                            <i class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>木木<span>5月31日</span></h4>
                            <p>你最近怎么了</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    var num = 5;
    export default {
        name: "information",

        data(){
            return{
                title:'消息'+'('+num+')',
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .information{
        .content{
            margin-top: 1.02rem;
            .list{
                margin-bottom: .25rem;
                h3{
                    padding: 0 .2rem;
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .3rem;
                    color: #333;
                    img{
                        width: .39rem;
                        height: .4rem;
                        margin-right: .15rem;
                    }
                }
                ul{
                    margin-top: .15rem;
                    background-color: #fff;
                    overflow: hidden;
                    li{
                        height: 1.42rem;
                        border-bottom: .02rem solid #ddd;
                        padding: .32rem .2rem;
                        .badge{
                            width: 1.25rem;
                            height: 100%;
                            text-align: center;
                            position: relative;
                            img{
                                display: inline-block;
                                width: .8rem;
                                height: .8rem;
                                border-radius: 50%;
                            }
                            i.dot{
                                display: inline-block;
                                width: .2rem;
                                height: .2rem;
                                background-color: #ff0d0d;
                                border-radius: 50%;
                                position: absolute;
                                right: .2rem;
                                top: .05rem;
                            }
                        }
                        .msg{
                            margin-left: 1.25rem;
                            h4{
                                font-size: .28rem;
                                color: #333;
                                font-weight: normal;
                                span{
                                    float: right;
                                    font-size: .24rem;
                                    color: #999;
                                }
                            }
                            p{
                                font-size: .24rem;
                                color: #999;
                                padding-top: .1rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>