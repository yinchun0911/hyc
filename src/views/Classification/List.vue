<template>
    <div class="list">
        <ListHeader :title="title" @shopClick="shopClick"></ListHeader>
        <div class="content">
            <ul class="nav">
                <li v-for="(item,index) in navList" :class="current==index?'active':''"  @click="liclick(index)">
                    <span>{{item.value}}<template v-if="index==2"><i class="el-icon-d-caret"></i></template></span>
                </li>
            </ul>
            <div class="list-box">
                <ul>
                    <template v-for="(item,index) in goodsList" >
                    <li>
                        <img class="Recommend" src="../../assets/images/classIfication/Recommend.png" alt="">
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-09.png" alt="">
                            </div>
                        </div>
                        <p>皇家粮仓香雪大米4kg礼盒装</p>
                        <div class="price">
                            <span>198.00</span>
                            <s>(228.00)</s>
                            <el-button type="primary" round icon="el-icon-plus"></el-button>
                        </div>
                    </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "List",
        data(){
            var typeId = this.$route.params.typeId
            loadData(1,typeId);
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
                goodsList:[]
            }
        },
        methods:{
            // 加载分类商品
            loadData(page,typeId){
                var page=this;
                       var typeID=data.typeID;
                       request("//shopProduct/queryProductList",{spu:typeID}).then(function (response) {
                       page.comtentList[data.typeName]=response;
                 })
            },
            // 购物车按钮
            shopClick(val){
                console.log(val)
            },
            liclick(index){
                this.current = index
            }
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
            background-color: #f0f3fa;
            ul.nav{
                padding: 0 .2rem;
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                display: flex;
                justify-content: space-between;
                li{
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
    }
</style>