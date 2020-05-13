<template>
    <div class="shopHome">
        <ListHeader ref="ListHeader" :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="list-box">
                <h2>
                    <el-checkbox v-model="checked" @change="checkAll()">全选</el-checkbox>
                    <i class="el-icon-delete" @click="deleteFn()"></i>
                </h2>
                <ul>
                        <li  v-for="item  in productList">
                            <div class="check fl">
                                <el-checkbox :data-id="item.goodsid" v-model="checkIds[item.goodsid]" @change="countCheckTotal()"></el-checkbox>
                            </div>
                            <div class="img fl"  @click="goByPathTo('detail',{productID:item.productID ,goodsid:item.goodsid})">
                                <img :src="item.productPic" alt="">
                            </div>
                            <div class="msg" >
                                <h3  @click="goByPathTo('detail',{productID:item.productID})">{{item.productName}}</h3>
                                <i class="tag"  @click="goByPathTo('detail',{productID:item.productID})">{{item.standrdsName}}</i>
                                <div class="prices">
                                    <span class="jg">{{item.productPrice}}</span>
<!--                                    <el-input-number v-model="productNum[item.goodsid]" :min="1" :max="10" @change="countCheckTotal()" size="mini"></el-input-number>-->
                                    <van-stepper v-model="productNum[item.goodsid]" integer min="1" max="10" @change="countCheckTotal(item.goodsid)"/>
                                </div>
                            </div>
                        </li>
                </ul>
            </div>
            <div class="shopFoot">
                <div class="checkBox fl">
                    <el-checkbox v-model="checked" @change="checkAll()">全选</el-checkbox>
                </div>
                <div class="sum">
                    <label >合计：<span>{{total}}</span></label>
                    <button @click="buy" >去结算</button>
                </div>
            </div>
        </div>
        <Footer ref="Footer" ></Footer>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import Footer from '@/components/Footer.vue'
    import { Dialog } from 'vant'
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "shopHome",
        data(){
            this.loadData(0);
            return{
                title:'购物车',
                checked:false,
                productList:[],
                lastPage:-1,
                isbottom:-1,
                num:0,
                checkIds:{},
                productNum:{},
                total:0.00
            }
        },  methods:{
             goByPathTo(path,params){
                        if(params){
                            this.$router.push({name:path,query:params});
                        }else{
                            this.$router.push(path);
                        }
                },
            loadData(current){
                var page=this;
                var postData={
                  current: current,
                  pageSize: 2,
                }
                if(page.isbottom==1){
                    return;
                 };
                userRequest("/shopCar/getCarGoodsList",postData).then(function (response) {
                        for(var i in response){
                            page.productList.push(response[i])
                            page.productNum[response[i].goodsid]=response[i].saleNum;
                        }
                        page.lastPage=postData.current+1;
                        if(response.length==-1){
                            page.lastPage=-2;
                        }
                        page.isbottom=1;
                       
                 })
            },
           checkAll(){
                var page=this;
                if(!page.checked){
                    page.total=0.00;
                }
                for(var i in page.productList){
                    var op=page.productList[i];
                    page.checkIds[op.goodsid]=page.checked;
                }
                page. countCheckTotal();
            },
            countCheckTotal(goodsId){
                    var page=this;
                    var  sum=0;
                    for(var i in page.productList){
                        var op=page.productList[i];
                        if(page.checkIds[op.goodsid]==true){
                            var num=parseInt(page.productNum[op.goodsid]);
                            if (num=='NaN'){
                                num=1;
                            }
                            sum+=op.productPrice*num;
                        };
                    }
                    page.total=sum;

                    if(goodsId){
                        var num=page.productNum[goodsId];
                        var postData={
                            goodsid: goodsId,
                            num: num
                        }
                        userRequest("/shopCar/setCarGoods",postData).then(function (response) {

                        });
                    }


            },
            deleteFn(){
                  var page=this;
                 var  sum=0;
                 var deleteList=[]
                 for(var i in page.productList){
                     var op=page.productList[i];
                     if(page.checkIds[op.goodsid]==true){
                         deleteList.push(op.goodsid);
                     };
                 }
                 if(deleteList.length==0){
                    Dialog({ message: "请先选择商品" })
                    return;
                 }
                 var  num=0;
                 for(var  i in deleteList){
                    var deleteData={ goodsid:deleteList[i],
                                      noError:true,
                                      defaultFn:function(){
                                                num++ ;
                                                if(num==deleteList.length){
                                                     page.productList=[];
                                                    page.isbottom = -1
                                                     page.loadData(1);
                                                }
                                       }, num:-1,
                                     };
                     userRequest("/shopCar/delCarGoods",deleteData).then(function (response) {
                        num++;
                        console.log(num,deleteList.length);
                        if(num==deleteList.length){
                            page.productList=[];
                            page.isbottom = -1
                            page.loadData(1);
                            page. countCheckTotal();
                         }
                         page.$refs.ListHeader.getShoppingCarNum();
                         page.$refs.Footer.getShoppingCarNum();

                     });
                 }
            },
            buy(){
                 var goodsParams=[];
                 var page=this;
                  for(var i in page.productList){
                      var op=page.productList[i];
                       console.log(op);
                      if(page.checkIds[op.goodsid]==true){
                          var num=page.productNum[op.goodsid];
                          goodsParams.push({ goodsid: op.goodsid, num: num});
                      };
                  }
                  if(goodsParams.length==0){
                    Dialog({ message: "请先选择商品" });
                    return;
                  }
                var params={
                    productCarList:goodsParams
                }

                userRequest("/shopOrder/addTmpOrder",params).then(function (response) {
                    page.goByPathTo("confirmOrder",{orderNo:response.orderNo});

                 });

            },

             handleScroll() {
                 //变量scrollTop是滚动条滚动时，距离顶部的距离
                 var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                 //变量windowHeight是可视区的高度
                 var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                 //变量scrollHeight是滚动条的总高度
                 var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                 //滚动条到底部的条件
                 // if(scrollTop+windowHeight==scrollHeight) {
                     console.log(this.isbottom == 1, this.lastPage, this.lastPage != -1, this.pageNum, this.pageNum < this.lastPage)
                     if(this.lastPage-1){
                         return;
                     }
                     // if(this.isbottom==1&&this.lastPage!=-2 ){
                     //     this.isbottom = -1
                     //     this.pageNum++
                     //     this.loadData(this.pageNum);
                     // }else{
                     //     console.log("到底了")
                     // }
                 // }


            }

        }, mounted(){
               window.addEventListener('scroll', this.handleScroll)
        },destroyed(){
               window.removeEventListener('scroll', this.handleScroll)
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
                    &:after{
                        left: 7px;
                        top:4px;
                    }
                }
                ul{
                    li:last-child{
                        margin-bottom: 50px;
                    }
                    li{
                        padding: .2rem 0;
                        height: 1.92rem;
                        clear: both;
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
                                .van-stepper{
                                    float: right;
                                    width: 2.09rem;
                                }
                                .el-input-number--mini{
                                    float: right;
                                    /*width: 2.09rem;*/
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
                height: 1.05rem;
                line-height: 1.05rem;
                position: fixed;
                bottom:1.1rem;
                background-color: #fff;
                z-index: 1000;
                .checkBox{
                    width: 1.06rem;
                    .el-checkbox__inner{
                        width: .4rem;
                        height: .4rem;
                        border-radius: 50%;
                        &:after{
                            left: 7px;
                            top:4px;
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
                        height: 1.05rem;
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