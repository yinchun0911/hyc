<template>
    <div class="order">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <ul class="nav">
                <li v-for="(item,index) in navList" :class="current==index?'active':''"  @click="liclick(index)">
                    <span>{{item.value}}</span>
                </li>
            </ul>
            <div class="listWarp">
                <h2>
                    <span>订单号：2003261055591580</span>
                    <div class="time">
                        请在
                        <img :src="minute1" alt="">
                        <img :src="minute2" alt="">
                        <span>:</span>
                        <img :src="second1" alt="">
                        <img :src="second2" alt="">
                        内完成支付
                    </div>
                    <span class="status">待支付</span>
                </h2>
                <div class="listMsg">
                    <div class="list-fl fl">
                        <div class="img">
                            <img src="../../assets/images/classIfication/list-11.png" alt="">
                        </div>
                    </div>
                    <div class="list-fr">
                        <h3>皇家香雪大米4kg礼盒装<span>X 1</span></h3>
                        <p>共<i>1</i>件商品<label>实付：</label><span>0.00</span></p>
                        <div>订单时间：2020-03-26  12:00:00</div>
                    </div>
                </div>
            </div>
            <div class="listWarp">
                <h2>
                    <span>订单号：2003261055591580</span>
                    <div class="time" v-if="timeShow">
                        请在
                        <img :src="minute1" alt="">
                        <img :src="minute2" alt="">
                        <span>:</span>
                        <img :src="second1" alt="">
                        <img :src="second2" alt="">
                        内完成支付
                    </div>
                    <span class="status succse">已支付</span>
                </h2>
                <div class="listMsg">
                    <div class="list-fl fl">
                        <div class="img">
                            <img src="../../assets/images/classIfication/list-11.png" alt="">
                        </div>
                    </div>
                    <div class="list-fr">
                        <h3>皇家香雪大米4kg礼盒装<span>X 1</span></h3>
                        <p>共<i>1</i>件商品<label>实付：</label><span>0.00</span></p>
                        <div>订单时间：2020-03-26  12:00:00</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "order",
        data(){
            return{
                title:'我的订单',
                current:0,
                timeShow:false,
                navList:[
                    {value:'全部'},
                    {value:'待支付'},
                    {value:'待发货'},
                    {value:'待收货'},
                    {value:'已完成'},
                ],
                minute1:require('../../assets/images/time/mini-0.png'),
                minute2:require('../../assets/images/time/mini-0.png'),
                second1:require('../../assets/images/time/mini-0.png'),
                second2:require('../../assets/images/time/mini-0.png'),
            }
        },
        methods:{
            liclick(index){
                this.current = index
            },
            //添零函数
            setNum(num){
                if(num<10){
                    num="0"+num;
                }
                return num;
            },
            getTime(){
                var time=1800;//30分钟换算成1800秒
                var that = this
                setInterval(function(){
                    time=time-1;
                    var minute=parseInt(time/60);
                    var second=parseInt(time%60);
                    minute=that.setNum(minute);
                    second=that.setNum(second)
                    // 双位数变成单位数
                    var m1=minute%10;
                    var m2=parseInt(minute/10);
                    var s1=second%10;
                    var s2=parseInt(second/10);
                    that.minute1=require('../../assets/images/time/mini-'+m2+'.png');
                    that.minute2=require('../../assets/images/time/mini-'+m1+'.png');
                    that.second1=require('../../assets/images/time/mini-'+s2+'.png');
                    that.second2=require('../../assets/images/time/mini-'+s1+'.png');
                },1000);

            }
        },
        mounted() {
            this.getTime()

        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .order{
        .content {
            background-color: #f0f3fa;
            margin-top: .88rem;
            ul.nav {
                padding: 0 .2rem;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                display: flex;
                justify-content: space-between;

                li {
                    width: 20%;
                    text-align: center;

                    span {
                        font-size: .26rem;
                        color: #b2b2b2;
                    }
                }

                .active {
                    span {
                        background-color: #83b7ff;
                        color: #fff;
                        padding: .02rem .25rem;
                        border-radius: .2rem;
                    }
                }
            }
            .listWarp{
                background-color: #fff;
                padding: 0 .2rem .2rem;
                border-radius: .2rem;
                margin: .2rem .2rem 0 .2rem;
                overflow: hidden;
                h2{
                    height: .8rem;
                    line-height: .8rem;
                    font-weight: normal;
                    border-bottom: .02rem solid #f0f3fa;
                    span{
                        font-size: .22rem;
                        color: #4c4c4c;
                    }
                    .time{
                        font-size:.18rem;
                        -webkit-transform:scale(0.8);
                        color: #4c4c4c;
                        display: inline-block;
                        img{
                            width: .15rem;
                            height: .24rem;
                            +img{
                                margin-left: .08rem;
                            }
                        }
                        span{
                            color: #ff5644;
                            font-size: .2rem;
                            font-weight: bolder;
                            padding: 0 .02rem;
                        }
                    }
                    .status{
                        font-size: .26rem;
                        color: #ff5644;
                        float: right;
                    }
                    .succse{
                        color: #4c4c4c;
                    }
                }
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
                            color: #4c4c4c;
                            i{
                                color: #ff5644;
                            }
                            label{
                                padding-left: .2rem;
                            }
                            span{
                                font-size: .22rem;
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
</style>