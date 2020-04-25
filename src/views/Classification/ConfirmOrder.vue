<template>
    <div class="confirmOrder">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="location">
                <div class="map fl">
                    <i class="el-icon-map-location"></i>
                </div>
                <div class="msg">
                    <h3>{{address.linkMan}} <span>{{address.linkPhone}}</span></h3>
                    <p @click="goEdit()">{{address.address}}</p>
                    <i @click="showAddress=true" class="el-icon-arrow-right"></i>
                </div>
            </div>
            <template v-for=" product in tempOrder.producList">

                <div class="orderMsg">
                    <div class="warp-fl fl">
                        <div class="img">
                            <img :src="product.productPic" alt="">
                        </div>
                    </div>
                    <div class="warp-fr">
                        <p>{{product.productName}}</p>
                        <div class="price">
                            <span>{{product.productPrice}}</span>
                            <i>X {{product.saleNum}}</i>
                        </div>
                    </div>
                </div>
            </template>
            <div class="type">
                <p>配送方式<span @click="showSheet = true">{{selectPostName}}</span><i class="el-icon-arrow-right" ></i></p>
            </div>
            <div class="price-box">
                <ul>
                    <li>商品金额<span>{{tempOrder.totleProduct}}</span></li>
                    <li>运费（重量：{{tempOrder.totleWeght}} kg）<span>{{tempOrder.totleFreight}}</span></li>
                </ul>
            </div>
            <div class="message">
                <p>客户留言</p>
                <el-input type="textarea" :rows="2" placeholder="选填：请先和商家协商一致" v-model="textarea"></el-input>
            </div>
            <div class="orderFooter">
                <p>合计：<span>{{tempOrder.totleMoney}}</span><button @click="subOrder">提 交</button></p>
            </div>
            <!--选择规格-->
            <van-action-sheet v-model="showSheet" :actions="actions" @select="onSelect" />
            <van-action-sheet v-model="showAddress" :actions="addressSelect" @select="onAddressSelect" />
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    import { Dialog } from 'vant'
    export default {
        name: "confirmOrder",
        data(){
            //购物车已创建好订单
            var formCar=this.$route.params.formCar;
            var tempOrder={};
            if(formCar){
                  tempOrder=this.$route.params.order;
            }else{
                //非购物车需要创建临时订单
                this.createTempOrder();
            }
            this.loadAddress();
            return{
                title:'确认订单',
                textarea:'',
                tempOrder:tempOrder,
                address:{linkMan:"",linkPhone:"",address:"您未填写地址，请先完善地址信息"},
                showSheet:false,
                showAddress:false,
                actions: [
                    { name: '快递',id:1 },
                    { name: '自提',id:2 }
                ],
                addressSelect:[{name:"添加新地址",id:-1}],
                selectPost:1,
                selectPostName:"自提",
                addressList:{}
            }
        },methods: {
            // 选择规格
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                this.showSheet = false;
                this.selectPost=item.id;
                this.selectPostName=item.name;

            },onAddressSelect(item){
                var page =this;
                console.log(item)
                page.address=page.addressList[item.id];
            },
            loadAddress(){
                var page=this;
               userRequest("/userAddress/queryUserAddressList",{current: 0, pageSize: 0}).then(function (response) {
                                if(response.length>0){
                                    page.address=response[0];

                                    for (var i in response){
                                        var str=response[i].linkMan+"   "+response[i].address;
                                        page.addressSelect.push({name:str,id:response[i].id})
                                        page.addressList[response[i].id]=response[i];
                                    }

                                }

                                console.log(response)
                })

            },
            goEdit(){
                var page=this;
                 console.log(page.address.address);
                if("您未填写地址，请先完善地址信息"===page.address.address){
                     page.$router.push({name:"setAddress"});
                }
            },
            createTempOrder(){
                 var page=this;
                 var productID =page.$route.query.productID+"";
                 var goodsid=page.$route.query.goodsid;
                 var num=page.$route.query.num;
                var  goodsparm=[{ goodsid: goodsid, num: num,token: "string"}];
                var params={
                    productCarList:goodsparm
                }

                userRequest("/shopOrder/addTmpOrder",params).then(function (response) {
                    page.tempOrder=response;
                    console.log(response)
                 })
            },
            subOrder(){
                var page=this;
                if(page.address==null){
                    Dialog({ message: "清先选择收货地址" });
                    return;
                  }
                  if("您未填写地址，请先完善地址信息"===page.address.address){
                    Dialog({ message: "请先设置收货地址" });
                    return;
                  }
                var postData={
                  addressId: page.address.id,
                  orderNo:page.tempOrder.orderNo,
                  postType:page.selectPost,
                  remark: page.textarea
                };
                userRequest("/shopOrder/addOrder",postData).then(function (response) {
                     page.$router.push({name:"selectCardRoll",params:response});
                 })

            }


        },
        components: {
            ListHeader
        },
    }
</script>

<style lang="less">
    .confirmOrder{
        height: 100%;
        background-color: #f0f3fa;
        .content{
            margin-top: .88rem;
            margin-bottom: .88rem;
            .location{
                position: relative;
                background-color: #fff;
                padding: .35rem .2rem;
                .map{
                    width: .53rem;
                    height: 100%;
                    i{
                        font-size: .4rem;
                        margin-top: .15rem;
                    }
                }
                .msg{
                    margin-left: .6rem;
                    position: relative;
                    h3{
                        font-size: .26rem;
                        color: #4c4c4c;
                        font-weight: normal;
                    }
                    p{
                        font-size: .24rem;
                        color: #b2b2b2;
                        padding-top: .05rem;
                    }
                    i{
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -10px;
                        font-size: 20px;
                    }
                }
                &:after{
                    content: '';
                    width: 100%;
                    height: .13rem;
                    position: absolute;
                    bottom:0;
                    left: 0;
                    background: url("../../assets/images/classIfication/border.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
            .orderMsg{
                padding: .35rem .2rem;
                background-color: #fff;
                margin-top: .2rem;
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
                .warp-fr {
                    margin-left: 2.4rem;
                    p {
                        color: #4c4c4c;
                        font-size: .3rem;
                    }
                    .price {
                        margin-top: .35rem;
                        span {
                            font-size: .3rem;
                            color: #ff5644;
                            position: relative;
                            padding-left: .2rem;
                            font-weight: bolder;
                            &:before {
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
                        i{
                            float: right;
                            font-size: .24rem;
                            color: #4c4c4c;
                        }
                    }
                }
            }
            .type{
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                padding: 0 .2rem;
                border-top: .02rem solid #f0f3fa;
                p{
                    font-size: .26rem;
                    color: #4c4c4c;
                    position: relative;
                    span{
                        float: right;
                        color: #b2b2b2;
                        padding-right: .4rem;
                    }
                    i{
                        font-size: 20px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -10px;
                        color: #000;
                    }
                }
            }
            .price-box{
                padding: 0 .2rem;
                background-color: #fff;
                margin: .2rem 0;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        font-size: .26rem;
                        color: #4c4c4c;
                        border-bottom: .02rem solid #f0f3fa;
                        span{
                            float: right;
                            color: #ff5644;
                            font-weight: bolder;
                            position: relative;
                            &:before {
                                content: '';
                                position: absolute;
                                left: -.2rem;
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
            }
            .message{
                background-color: #fff;
                padding: 0 .2rem .2rem .2rem;
                margin-bottom: 1rem;
                p{
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .26rem;
                    color: #4c4c4c;
                    border-bottom: .02rem solid #f0f3fa;
                }
                .el-input{
                    margin-top: .25rem;
                }
            }
            .orderFooter{
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                position: fixed;
                bottom:0;
                padding: 0 .2rem;
                span{
                    position: relative;
                    padding-left: .2rem;
                    &:before {
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
                p{
                    font-size: .28rem;
                    font-weight: bolder;
                    color: #ff5644;
                    button{
                        float: right;
                        width: 1.92rem;
                        height: .6rem;
                        line-height: .6rem;
                        font-size: .26rem;
                        color: #fff;
                        text-align: center;
                        background-color: #83b7ff;
                        border-radius: 4rem;
                        border: 0;
                        margin-top: .1rem;
                    }
                }
            }
        }
    }
</style>