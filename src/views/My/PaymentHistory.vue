<template>
    <div class="paymentHistory">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="box">
                <h2>
                    <div class="inputWarp fl">
                        <span class="form-control"><i class="dataPicker" id="date-group1-1">本月</i><i class="el-icon-caret-bottom"></i></span>
                    </div>
                    <p>支出 <span>{{sum}}</span></p>
                </h2>
                <div class="listWarp"  v-for="item in paymentList">
                    <div class="listMsg" @click="goDetail(item.orderNo)">
                        <div class="list-fl fl">
                            <div class="img">
                                <img :src="item.productPic" alt="">
                            </div>
                        </div>
                        <div class="list-fr">
                            <h3>{{item.productName}}<span>X {{item.productCount}}</span></h3>
                            <p>共{{item.saleNum}}件商品<label>实付：</label><span>{{item.realAmount}}</span></p>
                            <div>订单时间：{{item.orderTime}}</div>
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
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "paymentHistory",
        data(){
            var date=new Date();
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var queryText=year+"-";
            if(month<10){
                queryText+="0";
            }
            queryText+=""+month;
            this.loadData(0,queryText)
            return{
                title:'支付记录',
                paymentList:[],
                sum:0,
                queryText:queryText,
                isbottom:-1,
                lastPage:-1,
                pageNum:0,
            }
        },
        methods:{
            loadData(page,queryText){
                var op=this;
                var postData={current:page,orderMonth :queryText,pageSize:20}
               userRequest("/appUser/queryUserPayList",postData).then(function (response) {
                      for(var i in response.list){
                        op.paymentList.push(response.list[i]);
                      }
                      op.pageNum=response.pageNum;
                      op.lastPage=response.lastPage;
                      op.queryText=postData.orderMonth
               });
                userRequest("/appUser/queryUserPayCount",postData).then(function (response) {
                    op.sum=response
                });

            },
            goDetail(orderNo){
                this.$router.push({name:'orderDetails',query:{orderNo:orderNo}});

            },
             handleScroll() {
                    console.log(this.isbottom==1,this.lastPage,this.lastPage!=-1,this.pageNum,this.pageNum<this.lastPage)
                    if(this.isbottom==1&&this.lastPage!=-1 && this.pageNum<this.lastPage){
                          this.isbottom = -1
                        this.pageNum++
                        this.loadData(this,this.queryText);
                    }else{
                        console.log("到底了")
                    }

            }
        },
        mounted() {
            var op=this;
            new Rolldate({
                el: '#date-group1-1',
                format: 'YYYY-MM',
                beginYear: 2000,
                endYear: 2100,
                 trigger:'tap',
                    init: function() {
                      console.log('插件开始触发');
                    },
                 confirm: function(date) {
                     op.paymentList=[];
                    op.loadData(0,date);
                   console.log('确定按钮触发'+date);
                 }
            });
            window.addEventListener('scroll', this.handleScroll)
        }, destroyed(){
              window.removeEventListener('scroll', this.handleScroll)
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
    }
</style>