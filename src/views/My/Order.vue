<template>
    <div class="order">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <ul class="nav">
                <li v-for="(item,index) in navList" :class="current==index?'active':''"  @click="liclick(index)">
                    <span>{{item.value}}</span>
                </li>
            </ul>

            <template v-for="order in orderList">
                <div class="listWarp">
                                <h2>
                                    <span>订单号：{{order.orderNo}}</span>
                                    <div v-if="order.leftTime!=0" :data-leftTime="order.leftTime" class="time" >
                                        请在
                                        <img :src="order.left.m2" alt="">
                                        <img :src="order.left.m1" alt="">
                                        <span>:</span>
                                        <img :src="order.left.s2" alt="">
                                        <img :src="order.left.s1" alt="">
                                        内完成支付
                                    </div>
                                    <span class="status">{{order.orderStarusMsg}}</span>
                                </h2>
                                <div class="listMsg">
                                    <div class="list-fl fl">
                                        <div class="img">
                                            <img :src="order.productPic" alt="">
                                        </div>
                                    </div>
                                    <div class="list-fr">
                                        <h3>{{order.productName}}<span>X {{order.saleNum}}</span></h3>
                                        <p>共<i>{{order.productCount}}</i>件商品<label>实付：</label><span>{{order.realAmount}}</span></p>
                                        <div>订单时间：{{order.orderTime}}</div>
                                    </div>
                                </div>
                            </div>
            </template>


        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
     import { request, userRequest} from '@/js/request.js'
      var moment = require('moment');

    export default {
        name: "order",
        data(){
            var current = this.$route.params.status
            if(!current){
                current=0;
            }
            this.loadData(0,current);
            return{
                title:'我的订单',
                current:current,
                timeShow:false,
                navList:[
                    {value:'全部'},
                    {value:'待支付'},
                    {value:'待发货'},
                    {value:'待收货'},
                    {value:'已完成'},
                ],
                orderList:[],
                minute1:require('../../assets/images/time/mini-0.png'),
                minute2:require('../../assets/images/time/mini-0.png'),
                second1:require('../../assets/images/time/mini-0.png'),
                second2:require('../../assets/images/time/mini-0.png'),
            }
        },
        methods:{
            loadData(page,current){
                var op =this;
                var postData={
                  current: page,
                  orderType: current,
                  pageSize: 10,
                }
                userRequest("/shopOrder/orderList",postData).then(function (response) {
                        for(var i in response.list){
                            var leftTime=0;
                            var day = moment(response.list[i].orderTime);
                            var date=new Date();
                            leftTime=date.getTime()-day.valueOf();
                            var left=op.getTime(leftTime);
                            response.list[i].left=left;
                            response.list[i].leftTime=leftTime;
                            op.orderList.push(response.list[i])
                        }
                 })

            },
            liclick(index){
                this.current = index
                this.orderList=[];
                this.loadData(0,this.current);

            },
            //添零函数
            setNum(num){
                if(num<10){
                    num="0"+num;
                }
                return num;
            },
            getTime(leftTime){
                var op=this;
                var countTime=leftTime+0;
                var time=1800-parseInt(countTime/1000);//30分钟换算成1800秒

               if(time<0){
                      return {
                                       m2:op.minute1,m1:op.minute1,s2:op.minute1,s1:op.minute1
                               }
                }

                var minute=parseInt(time/60);
                var second=parseInt(time%60);
                // 双位数变成单位数
                var m1=minute%10;
                var m2=parseInt(minute/10)%10;
                var s1=second%10;
                var s2=parseInt(second/10)%10;
                var pm1,pm2,ps1,ps2;
                try{
                    pm1=require('../../assets/images/time/mini-'+m1+'.png');
                    pm2=require('../../assets/images/time/mini-'+m2+'.png');
                    ps1=require('../../assets/images/time/mini-'+s1+'.png');
                    ps2=require('../../assets/images/time/mini-'+s2+'.png');
                   return {
                                       m2:pm2,
                                       m1:pm1,
                                       s2:ps2,
                                       s1:ps1
                           }
                }catch(e){
                    console.log(e);
                }

                return {
                    m2:pm2,m1:pm1,s2:ps2,s1,ps1
                }

            },
            timeOut(){
                var op=this;
                var date=new Date();
                for(var i in op.orderList){
                       var order =op.orderList[i];
                       order.leftTime=order.leftTime+1000;
                       var left=op.getTime(order.leftTime);
                       order.left=left;
                }

                setTimeout(function(){
                    op.timeOut()
                 },1000);
            }
        },
        mounted() {
           this.timeOut()

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