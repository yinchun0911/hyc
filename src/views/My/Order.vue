<template>
    <div class="order">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <ul class="nav">
                <li v-for="(item,index) in navList" :class="current==index?'active':''"  @click="liclick(index)">
                    <span>{{item.value}}</span>
                </li>
            </ul>
            <div style="width: 100%; height: .88rem"></div>
            <template v-for="order in orderList">
                <div class="listWarp">
                                <h2  @click="goDetail(order)">
                                    <span class="orderCode">订单号：{{order.orderNo}}</span>
                                    <div v-if="order.leftTime!=0 && order.orderStatus==1" :data-leftTime="order.leftTime" class="time" >
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
                                    <div class="list-fl fl"  @click="goDetail(order)">
                                        <div class="img">
                                            <img :src="order.productPic" alt="">
                                        </div>
                                    </div>
                                    <div class="list-fr"  @click="goDetail(order)">
                                        <h3>{{order.productName}}<span>X {{order.saleNum}}</span></h3>
                                        <p>共<i>{{order.productCount}}</i>件商品<label>实付：</label><span>{{order.realAmount}}</span></p>
                                        <div>订单时间：{{order.orderTime}}</div>
                                    </div>
                                    <div class="btnBox" v-if="order.orderStatus ==2 "  @click="causeShow=true;actionType='cancel';opOrder=order">
                                        <button>取消订单</button>
                                    </div>
                                    <div class="btnBox" v-if="order.orderStatus ==4"  @click="causeShow=true;actionType='refund';opOrder=order">
                                        <button>申请退货</button>
                                    </div>
                                    <div class="btnBox" v-if="order.orderStatus == 3"  @click="orderConfirm(order.orderNo)">
                                        <button>确认收货</button>
                                    </div>

                                </div>
                            </div>
            </template>

        </div>
        <van-overlay :show="causeShow">
            <div class="causeWrapper" @click.stop>
                <div class="box">
                    <h4>{{actionType=='cancel'?'取消原因':'退货原因'}}</h4>
                    <textarea class="causeTxt" v-model="refundRemark" placeholder="请输入"></textarea>
                    <div class="btnbox">
                        <button  @click="refund">确  定</button>
                        <button class="backBtn" @click="causeShow = false">取  消</button>
                    </div>
                </div>

            </div>
        </van-overlay>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
     import { request, userRequest} from '@/js/request.js'
     import { Dialog } from 'vant'
      var moment = require('moment');
      for(var num=0;num<10;num++){
        require('../../assets/images/time/mini-'+num+'.png')
      }
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
                causeShow:false,
                navList:[
                    {value:'全部'},
                    {value:'待支付'},
                    {value:'待发货'},
                    {value:'待收货'},
                    {value:'已完成'},
                ],
                opOrder:{},
                minute1:require('../../assets/images/time/mini-0.png'),
                orderList:[],
                isbottom:-1,
                lastPage:-1,
                refundRemark:"",
                actionType:"",
                pageNum:0,
                stopTimer:false
            }
        },
        methods:{
            refund(){
                var op =this;
                var order=op.opOrder;
                var postData={
                    orderNo: order.orderNo,
                    refundRemark:op.refundRemark
                }
                var str=op.actionType=='cancel'?'取消原因':'退货原因';
                if(op.refundRemark.length<3){
                    Dialog({ message: '请留下您的'+str })
                    return;
                }
                var url="";
                if(op.actionType=="cancel"){
                    url="/shopOrder/orderCancel"
                }else{
                    url="/shopOrder/orderRefund"
                }
                userRequest(url,postData).then(function (response) {
                    Dialog({ message: '操作成功' });
                    op.orderList=[];
                    op.loadData(0,op.current);
                    op.causeShow=false;
                })
            },
            orderConfirm(orderNo){
                var op =this;
                Dialog.confirm({
                    title: '提示',
                    message: '请收到货物后再点击确认收货，避免财物损失',
                }) .then(() => {
                        userRequest("/shopOrder/orderConfirm", {orderNo}).then(function (response) {
                            Dialog({ message: '操作成功' });
                            op.orderList=[];
                            op.loadData(0,op.current);
                            op.causeShow=false;
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });


            },
            loadData(page,current){
                var op =this;
                var postData={
                  current: page,
                  orderType: current,
                  pageSize: 20,
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
                        op.isbottom = 1;
                        op.pageNum=response.pageNum;
                       op.lastPage=response.lastPage;
                       op.queryText=postData.orderMonth
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
                      return {    m2:op.minute1,m1:op.minute1,s2:op.minute1,s1:op.minute1   }
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
                   return {  m2:pm2,  m1:pm1,  s2:ps2,   s1:ps1  }
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
                    if(!op.stopTimer){
                        op.timeOut()
                    }
                 },1000);
            },
            goDetail(order){
                if(order.orderStatus==1){
                  this.$router.push({name:"selectCardRoll",params:order})
                }else{
                  this.goByPathTo('orderDetails',{orderNo:order.orderNo});
                }
            },
             goByPathTo(path,params){
                    if(params){
                        this.$router.push({name:path,query:params});
                    }else{
                        this.$router.push(path);
                    }
            }
            ,
             handleScroll() {
                 var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                 //变量windowHeight是可视区的高度
                 var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                 //变量scrollHeight是滚动条的总高度
                 var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                 //滚动条到底部的条件
                 console.log(scrollTop,windowHeight,scrollHeight)
                 if(scrollTop+windowHeight==scrollHeight) {
                     console.log(this.isbottom == 1, this.lastPage, this.lastPage != -1, this.pageNum, this.pageNum < this.lastPage)
                     if (this.isbottom == 1 && this.lastPage != -1 && this.pageNum < this.lastPage) {
                         this.isbottom = -1
                         this.pageNum++
                         this.loadData(this.pageNum, this.current);
                     } else {
                         console.log("到底了")
                     }
                 }
            }
        },
        mounted() {
           this.timeOut();
           window.addEventListener('scroll', this.handleScroll)
         }, destroyed(){
            this.stopTimer=true;
                        window.removeEventListener('scroll', this.handleScroll)
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
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                background-color: #fff;
                position: fixed;
                top:.88rem;
                z-index: 1000;
                li {
                    width: 20%;
                    text-align: center;
                    float: left;
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
                    padding: .2rem 0;
                    overflow: hidden;
                    font-weight: normal;
                    border-bottom: .02rem solid #f0f3fa;
                    span.orderCode{
                        font-size: .22rem;
                        color: #4c4c4c;
                        float: left;
                        width: 3.2rem;
                        word-wrap: break-word;word-break: break-all;overflow: hidden;
                    }
                    .time{
                        float: left;
                        font-size:.18rem;
                        -webkit-transform:scale(0.8);
                        color: #4c4c4c;
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
                            margin-top: .35rem;
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
                    .btnBox{
                        margin-top: .1rem;
                        button{
                            background-color: #83b7ff;
                            border: 0;
                            padding: .05rem .15rem;
                            color: #fff;
                            font-size: .22rem;
                            border-radius: .2rem;
                            float: right;
                        }
                    }
                }
            }
        }
        .van-overlay{
            .causeWrapper{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                .box{
                    background-color: #fff;
                    width: 6rem;
                    height: 5rem;
                    overflow: hidden;
                    padding: .2rem .5rem;
                    border-radius: .2rem;
                    h4{
                        font-weight: normal;
                        font-size: .26rem;
                        color: #4c4c4c;
                        margin-bottom: .1rem;
                    }
                    textarea.causeTxt{
                        width: 100%;
                        height: 2rem;
                        font-size: .24rem;
                        color: #4c4c4c;
                        text-indent: .2rem;
                    }
                    .btnbox{
                        padding: 0 .2rem;
                        margin-top: 0.25rem;
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
                            margin-bottom: .25rem;
                        }
                        .backBtn{
                            background-color: #fff;
                            color: #b2b2b2;
                            border-color: #d7d9dd;
                        }
                    }
                }

            }
        }
    }
</style>