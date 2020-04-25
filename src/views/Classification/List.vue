<template>
    <div class="list">
        <ListHeader :title="title"  @shopClick="shopClick"></ListHeader>
        <div class="content">
            <ul class="nav">
                <li v-for="(item,index) in navList" :class="current==index?'active':''"  @click="liclick(index);">
                    <span >{{item.value}}<template v-if="current==index"><i class="el-icon-d-caret"></i></template></span>
                </li>
            </ul>
            <div class="list-box">
                <ul>
                    <template v-for="(item,index) in goodsList" >
                     <li :id="item.goodsid" >
                        <img v-if="item.isPush !=null" class="Recommend" src="../../assets/images/classIfication/Recommend.png" alt="">
                        <div @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})" class="img">
                            <div class="tgd">
                                <img :src="item.productPic" alt="">
                            </div>
                        </div>
                        <p @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})" >{{item.productName}}</p>
                        <div class="price">
                            <span @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})"  >{{item.productPrice}}</span>
                            <s @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})" v-if="item.productPrice!=null">({{item.productPrice}})</s>
                            <el-button type="primary" @click="addShopClick(item.goodsid)" round icon="el-icon-plus"></el-button>
                        </div>
                    </li>
                    </template>
                </ul>
            </div>
            <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
                <van-form @submit="onSubmit">
                    <van-field
                            v-model="priceMin"
                            name="最低价格"
                            label="最低价格"
                            placeholder="最低价格"
                            :rules="[{ required: true, message: '请填写最低价格' }]"
                    />
                    <van-field
                            v-model="priceMax"
                            name="最高价格"
                            label="最高价格"
                            placeholder="最高价格"
                            :rules="[{ required: true, message: '请填写最高价格' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                            确定
                        </van-button>
                    </div>
                </van-form>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    import { Dialog } from 'vant'
    export default {
        name: "List",
        data(){
            return{
                title:'商品列表',
                current:0,
                navList:[
                    {value:'综合'},
                    {value:'新品'},
                    {value:'价格'},
                    {value:'销量'},
                    {value:'筛选'},
                ],
                isbottom:-1,
                currentPage:0,
                priceMin:1,priceMax:100,
                postData:{
                    current:0,
                    pageSize:6,
                    pageNum:0,
                    sortType:"1",
                    sortMethod:'1',
                    keyWords: "",
                    token:"",

                },
                lastPage:-1,
                goodsList:[],
                show:false

            }
        },
        methods:{

            // 加载分类商品
            loadData(op,page){
                   var typeId = op.$route.query.typeId;
                   var areaID = op.$route.query.areaID;
                    var keyWords=  op.$route.query.keyword;
                   if(typeId){
                    op.postData.typeId=typeId+"";
                   }
                    if(areaID){
                        op.postData.areaID=areaID+"";
                    }
                    if(keyWords){
                        op.postData.keyWords=keyWords;
                    }
                  op.postData.current=page;

                  if(!op.postData.sortType){
                    op.postData.sortType="1";
                  }
                  if(!op.postData.sortMethod){
                      op.postData.sortMethod='1';
                   }

                   if(page==0||page==1){
                    op.goodsList=[];
                   }
                    if(op.current==4){
                        if(op.priceMin>op.priceMax){
                            Dialog({message:"请正确设置价格区间"});
                            return;
                        }
                        op.postData.lowPrice=op.priceMin;
                        op.postData.highPrice=op.priceMax;
                    }else{
                        op.postData.lowPrice=null;
                        op.postData.highPrice=null;
                    }

                  var typeID=typeId;
                  if(op.isbottom==1){
                    return;
                  };
                  request("/shopProduct/queryProductList",op.postData).then(function (response) {
                        for(var i in response.list){
                            op.goodsList.push(response.list[i])
                        }
                        op.pageNum=response.pageNum;
                        op.isbottom=1;
                        op.lastPage=response.lastPage
                 })
            },
            addShopClick(val){
                console.log(val)
                var page=this;
                var postData={
                    goodsid: val,
                    num: 1
                };
                userRequest("/shopCar/addCarGoods",postData).then(function(response){
                    Dialog({ message: '添加成功' })
                });
            },
            // 购物车按钮
            shopClick(val){
                this.$router.push({path:"/Shopping"});
            },
            liclick(index){
                this.showPrice();
                console.log(1111,this.current,index,this.postData.sortMethod);
                if( this.current == index){
                    if(this.postData.sortMethod=='1'){
                        this.postData.sortMethod='0';
                     }else{
                        this.postData.sortMethod='1';
                     }
                }else{
                    this.current = index;
                    this.postData.sortType=index+1;
                    this.postData.sortMethod='1'
                }
                this.showPrice(index);
                if(index==4&&this.show){

                    return;
                }
                this.pageNum=0
                this.goodsList=[];
                this.isbottom = -1;

                this.loadData(this,this.pageNum);

            },
            showPrice(index){
                var page=this;
                if(index==4) {page.show=!page.show}
            },
            goTo(path,params){
                if(params){
                    this.$router.push({name:path,query:params});
                }else{
                    this.$router.push(path);
                }
            },
            handleScroll() {

                console.log(this.$refs)
                if(this.isbottom==1&&this.lastPage!=-1 && this.pageNum<this.lastPage){
                      this.isbottom = -1
                    this.pageNum++
                    this.loadData(this,this.pageNum);
                }else{
                    console.log("到底了")
                }

            },
            onSubmit(values) {
                this.pageNum=0
                this.goodsList=[];
                this.isbottom = -1;
                this.loadData(this,this.pageNum);

            },
        },
        mounted(){
             this.loadData(this,1);
             window.addEventListener('scroll', this.handleScroll)
        },
        destroyed(){
            window.removeEventListener('scroll', this.handleScroll)
        },

        components: {
            ListHeader
        },
    }
</script>

<style lang="less">
    .list{
        .header{
            height: .88rem;
            background-color: #83b7ff;
            padding: 0 .2rem;
            font-size: .3rem;
            color: #fff;
            text-align: center;
            line-height: .88rem;
            .header-fl{

                text-align: center;
                i{
                    font-size: 20px;
                    color: #fff;
                }
            }
            .header-fr{
                margin-top: .2rem;
                line-height: 1;
                img{
                    width: .49rem;
                    height: .43rem;
                }
                .el-badge__content{
                    width: .3rem;
                    height: .3rem;
                    line-height: .3rem;
                    padding: 0;
                    font-size: .16rem;
                    border-radius: 50%;
                    border: 0;
                }
            }
        }
        .content{
            margin-top: .88rem;
            background-color: #f0f3fa;
            ul.nav{
                width: 100%;
                padding: 0 .2rem;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                position: fixed;
                top:.88rem;
                z-index: 1000;
                li{
                    float: left;
                    width: 20%;
                    text-align: center;
                    span{
                        font-size: .26rem;
                        color: #b2b2b2;
                    }
                }
                .active{
                    span{
                        background-color: #83b7ff;
                        color: #fff;
                        padding: .02rem .25rem;
                        border-radius: .2rem;
                    }
                }
            }
            .list-box{
                padding: 0 .2rem;
                margin-top: 1.76rem;
                ul{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap:wrap;
                    li{
                        padding: .2rem;
                        width: 49%;
                        background-color: #fff;
                        border-radius: .2rem;
                        margin-top: .2rem;
                        position: relative;
                        .Recommend{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 1.01rem;
                            height: 1.03rem;
                        }
                        .img{
                            width:100%;
                            height: 2.69rem;
                            font-size:0;
                            display:table;
                            .tgd {
                                display:table-cell;
                                text-align: center;
                                vertical-align:middle;
                                width: 100%;
                                height:2.69rem;
                                img{
                                    max-width: 2.84rem;
                                    max-height: 2.69rem;
                                }                            }
                        }
                        p{
                            margin-top: .5rem;
                            font-size: .24rem;
                            color: #4c4c4c;
                        }
                        .price{
                            margin-top: .1rem;
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
                            .el-button{
                                float: right;
                                width: .4rem;
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0;
                            }
                        }
                    }
                }
            }
        }
        .van-popup--bottom{
            padding-top: .3rem;
        }
    }
</style>