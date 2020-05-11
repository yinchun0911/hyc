<template>
    <div class="detail">
        <ListHeader :title="title"  ref="ListHeader" @shopClick="goshopClick" :badgeNum="shoppingNum" ></ListHeader>
        <div class="content">
            <div class="banner">
<!--                <div class="swiper-container" id="gallery">-->
<!--                    <div class="swiper-wrapper">-->

<!--                       <template v-for="(item,index) in product.imageList" >-->
<!--                        <div v-if="item.picType==1" class="swiper-slide"><img :src="item.picUrl" alt=""></div>-->
<!--                       </template>-->
<!--                    </div>-->
<!--                    &lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
<!--                    &lt;!&ndash;        <div class="swiper-pagination"></div>&ndash;&gt;-->
<!--                </div>-->
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <template v-for="(item,index) in product.imageList" >
                        <van-swipe-item v-if="item.picType==1">
                            <img :src="item.picUrl" alt="">
                        </van-swipe-item>
                    </template>
                </van-swipe>
            </div>
            <div class="hite">
                <p>{{product.productName}}</p>
                <div class="price">
                    <span>{{product.productPrice}}</span>
                    <s v-if="product.productOldPrice!=null">{{product.productOldPrice}}</s>
                    <i v-if="product.isPush == 1">倾情推荐</i>
                    <b>已售{{product.saleNum}}件</b>
                </div>
                <p class="foot-word">{{product.sku}}</p>
                <p class="foot-word">{{product.postInfo}}</p>
            </div>
            <div class="select-box">
                <ul>
                    <li @click="drawer = true;buyFlag=false">
                        <label>规格</label>
                        <span>{{product.standrdsName}}</span>
                        <i class="el-icon-arrow-right" ></i>
                    </li>
                    <li>
                        <label>送至</label>
                        <span>{{showAdds}}</span>
                        <i class="el-icon-arrow-right" @click="showPopup"></i>
                    </li>
                </ul>
            </div>
            <div class="warp">
                <h2>商品详情</h2>
                <div class="img-box">
                  <template v-for="(item,index) in product.imageList" >
                            <div v-if="item.picType==0" class="swiper-slide"><img :src="item.picUrl" alt=""></div>
                   </template>

                </div>
            </div>
            <div class="detail-foot">
                <div class="foot-fl fl">
                    <img @click="goTo('/')" src="../../assets/images/classIfication/icon-01.png" alt="">
                    <img @click="goTo('https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b9781210bc62a449fbf49e9e561dae071fec465f96ceec32f18ee4d32f50b6c35e530e11cb6888ddc6000f87fad1f1b847f')" src="../../assets/images/classIfication/icon-02.png" alt="">
                    <template v-if="!imgShow">
                        <img @click="isActive" src="../../assets/images/classIfication/icon-03.png" alt="">
                    </template>
                    <template v-if="imgShow">
                        <img @click="isActive" src="../../assets/images/classIfication/icon-03-active.png" alt="">
                    </template>
                </div>
                <div class="foot-fr fr">
                    <span @click="shopClick">加入购物车</span>
                    <span @click="drawer = true; buyFlag=true">立即购买</span>
                </div>
            </div>
            <!--返回顶部-->
            <div class="backTop" v-if="btnFlag" @click="backTop">
                <i class="el-icon-arrow-up"></i>
            </div>
            <!--立即够买-->
            <div class="drawer-box" >
<!--                <el-drawer :visible.sync="drawer" direction="btt" :wrapperClosable="false">-->
<!--                    <div class="drawer-warp">-->
<!--                        <div class="warp-fl fl">-->
<!--                            <div class="img">-->
<!--                                 <img  :src="product.headImg" alt="">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="warp-fr">-->
<!--                            <p>{{product.productName}}</p>-->
<!--                            <div class="price">-->
<!--                             <span>{{product.productPrice}}</span>-->
<!--                              <s v-if="product.productOldPrice!=null">{{product.productOldPrice}}</s>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="specifications">-->
<!--                        <p>规格</p>-->
<!--                        <ul :class="!buyFlag?'show':''">-->
<!--                            <template v-for="item in standrds">-->
<!--                                <li @click="clickType" :data-id="item.id" :class="['bottom-btn',{'active':product.goodsid==item.id}]">{{item.standrdsName}}</li>-->
<!--                            </template>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                    <div class="specifications" v-if="buyFlag">-->
<!--                        <p>数量<van-stepper v-model="num" integer min="1" max="10"/></p>-->
<!--                        <button class="buyBtn" @click="buy">立即够买</button>-->
<!--                    </div>-->
<!--                </el-drawer>-->
                <van-action-sheet v-model="drawer" :close-on-click-overlay="false" :round="false">
                    <div class="sheetContent">
                        <i class="el-icon-close" @click="drawer = false"></i>
                        <div class="drawer-warp">
                            <div class="warp-fl fl">
                                <div class="img">
                                    <img  :src="product.headImg" alt="">
                                </div>
                            </div>
                            <div class="warp-fr">
                                <p>{{product.productName}}</p>
                                <div class="price">
                                    <span>{{product.productPrice}}</span>
                                    <s v-if="product.productOldPrice!=null">{{product.productOldPrice}}</s>
                                </div>
                            </div>
                        </div>
                        <div class="specifications">
                            <p>规格</p>
                            <ul :class="!buyFlag?'show':''">
                                <template v-for="item in standrds">
                                    <li @click="clickType" :data-id="item.id" :class="['bottom-btn',{'active':product.goodsid==item.id}]">{{item.standrdsName}}</li>
                                </template>
                            </ul>
                        </div>
                        <div class="specifications" v-if="buyFlag">
                            <p>数量<van-stepper v-model="num" integer min="1" max="10"/></p>
                        </div>
                        <div style="height: 1.8rem;width:100%;"></div>
                        <button v-if="buyFlag" class="buyBtn" @click="buy">立即购买</button>
                    </div>
                </van-action-sheet>
            </div>
            <!--选择规格-->
            <van-action-sheet v-model="showSheet" :actions="actions" @select="onSelect" description="请选择规格"/>
            <!-- 选择地址-->
            <van-popup
                    v-model="show"
                    position="bottom"
                    :style="{ height: '50%' ,padding:'16px'}"
            >
                <van-area
                        :area-list="areaList"
                        :columns-placeholder="['请选择', '请选择', '请选择']"
                        value="110000"
                        title="选择地址"
                        @change="changeAddr"
                        @cancel="cancelChoose"
                        @confirm="chooseThis"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import addressData from '@/js/address.js'
    import Swiper from 'swiper';
    import 'swiper/css/swiper.min.css';
    import { request, userRequest} from '@/js/request.js'
    import {Dialog} from "vant";
    export default {
        name: "detail",
        data(){
            this.getProductInfo();
            this.getShoppingCarNum();
            this.loadAddress();
            return{
                title:'商品详情',
                btnFlag:false,
                drawer:false,
                imgShow:false,
                num:0,
                shoppingNum:0,
                product:{},
                products:[],
                standrds:[],
                show:false,
                showAdds:'添加收货地址',
                areaList: addressData, //可选地址数据列表
                resAddr:'',
                showSheet:false,
                buyFlag:false,
                actions: [
                ],

            }
        },
        methods: {
            //控制popup组件的弹出和隐藏
            showPopup () {
                this.show = true
            },
            changeAddr (picker) {
                //value=0改变省，1改变市，2改变区
                let val = picker.getValues()
                this.resAddr = val
            },
            cancelChoose(){
                this.show = false
            },
            //选好地址后点击确定
            chooseThis () {
                this.show = false
                //选中地址成功后回显
                this.showAdds = this.resAddr[0].name + '-' + this.resAddr[1].name + '-' + this.resAddr[2].name
                console.log(this.resAddr, '即将传给后端的省市区信息')
            },
            // 选择规格
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起

                this.product=this.products[item.id]
            },
            loadAddress(){
                var page=this;
                userRequest("/userAddress/queryUserAddressList",{current: 0, pageSize: 0}).then(function (response) {
                    if(response.length>0){
                        page.showAdds=response[0].fullAddress.replace(response[0].address,"");
                    }
                })

            },
            // 点击收藏
            isActive(){
                this.imgShow = !this.imgShow
                var page=this;
                if(this.imgShow){
                     //收藏
                     userRequest("/shopProduct/addProductCollectInfo",{goodsid:page.product.goodsid}).then(function(response){
                         Dialog({ message: '操作成功' })
                    });
                }else{
                    //取消收藏
                      userRequest("/shopProduct/delProductCollectInfo",{goodsid:page.product.goodsid}).then(function(response){
                          Dialog({ message: '操作成功' })
                    });
                }

            }, goByPathTo(path,params){
                if(params){
                    this.$router.push({name:path,query:params});
                }else{
                    this.$router.push(path);
                }
            },
            getProductInfo(){
                var page=this;
                var productID =page.$route.query.productID+"";
                var goodsid=page.$route.query.goodsid
                console.log(goodsid,productID)
                var postData={
                  "productID": productID,
                  "token": "string"
                };
                request("/shopProduct/queryProductInfo",postData).then(function (response) {
                        if(goodsid==null){
                                page.product=response[0];
                        }
                       for(var i in response){
                            var id=response[i].goodsid;
                            var standrdsName=response[i].standrdsName;
                            page.actions.push({id:id,name:standrdsName});
                            page.standrds.push({id:id,standrdsName:standrdsName});
                            page.products[id]=response[i];
                            if(goodsid!=null&&goodsid==id){
                                page.product=response[i];
                            }
                            for (var m in response[i].imageList){
                                var img=response[i].imageList[m];
                                if(img.picType==1){
                                    if(!response[i].headImg){
                                        response[i].headImg=img.picUrl;
                                    }
                                }
                            }

                       }
                       page.queryCollect();
                 })
            },
            // 购物车按钮
            shopClick(val){
                var page=this;
                var postData={
                    goodsid: page.product.goodsid,
                    num: 1
                };
                userRequest("/shopCar/addCarGoods",postData).then(function(response){
                    Dialog({ message: '添加购物车成功' })
                    page.$refs.ListHeader.getShoppingCarNum();
                });
            },goshopClick(){
                this.$router.push({path:"/Shopping"});
            },
              getShoppingCarNum(){
                        var page=this;
                        var postData={noError:true,defaultFn:function(){
                                 console.log("defaultProcess")
                                 page.shoppingNum=0;
                            }
                        }
                        userRequest("/shopCar/getCarGoodsNum",postData).then(function (response) {
                              page.shoppingNum=response;
                        })
            },
            clickType(e){
                var page=this;
                var changeId=e.target.dataset.id;
                page.product=page.products[changeId]
            },
            buy(){
               var page=this;
               var goodsId=page.product.goodsid;
               var productId=page.product.productID;
               var num=page.num;

               var  goodsparm=[{ goodsid: goodsId, num: num,token: "string"}];
               var params={
                    productCarList:goodsparm
               }

                userRequest("/shopOrder/addTmpOrder",params).then(function (response) {
                    page.goByPathTo("confirmOrder",{orderNo:response.orderNo});

                });

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
            goTo(path,params){
                if(path.indexOf("http")!=-1){
                    window.location.href=path;
                }else
                if(params){
                    this.$router.push({name:path,params:params});
                }else{
                    this.$router.push(path);
                }
            }

           ,
            queryCollect(){
                 var page=this;
                 var goodsId=page.product.goodsid;
                 var productId=page.product.productID;
                   userRequest("/shopProduct/queryProductCollectInfo",{goodsid:goodsId}).then(function(response){
                             if(response==1){
                                page.imgShow=true;
                             }else{
                                page.imgShow=false;
                             }
                     });
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
                .my-swipe{
                    display: block;
                    height: auto;
                    .van-swipe-item{
                        height: auto;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
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
                        position: relative;
                        &:first-child{
                            border-bottom: .02rem solid #f0f3fa;
                        }
                        label{
                            width: .75rem;
                            height: .8rem;
                            line-height: .8rem;
                            font-size: .26rem;
                            color: #b2b2b2;
                            float: left;
                        }
                        span{
                            height: .8rem;
                            line-height: .8rem;
                            display: block;
                            margin-left: .75rem;
                            font-size: .26rem;
                            color: #4c4c4c;
                            padding-left: .25rem;
                            overflow: hidden;
                        }
                        i{
                            position: absolute;
                            right: 0;
                            top: 50%;
                            margin-top: -.12rem;
                            font-size: .3rem;
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
                    margin-bottom: .35rem;
                }
                .img-box{
                    font-size: 0;
                    display: inline-table;
                    text-align: center;
                    img{
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
                bottom:1.5rem;
                i{
                    color: #fff;
                    font-size: .3rem;
                }
            }
            .detail-foot{
                width: 100%;
                height: 1.2rem;
                line-height: 1.2rem;
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
                        margin-top: .4rem;
                    }
                }
                .foot-fr{
                    width: 50%;

                    span{
                        display: inline-block;
                        width: 1.8rem;
                        height: .8rem;
                        line-height: .8rem;
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
                .van-action-sheet{
                    .van-action-sheet__content{
                        padding: .5rem .2rem .2rem .2rem;
                        position: relative;
                        .sheetContent{

                        }
                        i.el-icon-close{
                            position: absolute;
                            top: .1rem;
                            right: .1rem;
                            font-size: 20px;
                            color: #000;
                            font-weight: bolder;
                        }
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
                            .van-stepper{
                                float: right;
                            }
                        }
                        ul.show{
                            height: 120px;
                        }
                        ul{
                            margin: .2rem 0 .4rem 0;
                            display: flex;
                            flex-wrap:wrap;
                            li{
                                min-width: 3rem;
                                height: .6rem;
                                line-height: .6rem;
                                font-size: .2rem;
                                color: #b2b2b2;
                                text-align: center;
                                border: .02rem solid #b3b3b3;
                                border-radius: .3rem;
                                padding: 0 .1rem;
                                margin-right: .1rem;
                                margin-top: .1rem;
                                /*&+li{*/
                                /*    margin-left: .25rem;*/
                                /*}*/
                            }
                            .active{
                                background-color: #e9f2ff;
                                color: #83b7ff;
                                border-color: #83b7ff;
                            }
                        }
                    }
                    button.buyBtn{
                        position: fixed;

                        width: 7rem;
                        bottom:0;
                        margin: .4rem auto;
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
</style>