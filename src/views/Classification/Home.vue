<template>
    <div class="classHome">
        <ClassHeader @sweepCodeClick="sweepCodeClick" @searchClick="searchClick" @shopClick="shopClick"></ClassHeader>
        <div class="content">
            <van-sidebar v-model="activeKey" @change="onChange">
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
                <van-sidebar-item title="标签名称" />
            </van-sidebar>
            <div class="box">
                <h2>食品饮料</h2>
                <ul>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-01.png" alt="">
                            </div>
                        </div>
                        <p>米</p>
                    </li>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-02.png" alt="">
                            </div>
                        </div>
                        <p>食用油</p>
                    </li>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-03.png" alt="">
                            </div>
                        </div>
                        <p>调味品</p>
                    </li>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-04.png" alt="">
                            </div>
                        </div>
                        <p>烘培原料</p>
                    </li>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-05.png" alt="">
                            </div>
                        </div>
                        <p>南北干货</p>
                    </li>
                </ul>
                <h2>优选礼包</h2>
                <ul>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-06.png" alt="">
                            </div>
                        </div>
                        <p>坚果礼包</p>
                    </li>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-07.png" alt="">
                            </div>
                        </div>
                        <p>营养礼包</p>
                    </li>
                </ul>
                <h2>优选礼包</h2>
                <ul>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-08.png" alt="">
                            </div>
                        </div>
                        <p>可口可乐</p>
                    </li>
                </ul>
                <h2>优选礼包</h2>
                <ul>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-08.png" alt="">
                            </div>
                        </div>
                        <p>可口可乐</p>
                    </li>
                </ul>
                <h2>优选礼包</h2>
                <ul>
                    <li>
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-08.png" alt="">
                            </div>
                        </div>
                        <p>可口可乐</p>
                    </li>
                </ul>
            </div>
        </div>
          <Footer></Footer>
    </div>

</template>

<script>
    import ClassHeader from '@/components/ClassHeader.vue'
    import Footer from '@/components/Footer.vue'
    export default {
        name: "home",
        data(){
            return{
                activeKey:0
            }
        },
        methods:{
            onChange(val){
                console.log(val)
            },
            // 扫一扫
            sweepCodeClick(){
                console.log('扫一扫')
            },
            // 购物车按钮
            shopClick(val){
                console.log(val)
            },
            //搜索按钮
            searchClick(val){
                console.log(val)
            }
        },
        components: {
            ClassHeader,
            Footer
        }
    }
</script>

<style lang="less">
    .classHome{
        .van-sidebar{
            width: 1.52rem;
            height: calc(100vh - 2.05rem);
            float: left;
            .van-sidebar-item{
                background-color: #f0f3fa;
            }
            .van-sidebar-item__text{
                font-size: .22rem;
                color: #b2b2b2;
            }
            .van-sidebar-item--select{
                border-color: #83b7ff;
                background-color: #fff;
                .van-sidebar-item__text{
                    color: #83b7ff;

                }
            }
        }
        .box{
            background-color: #fff;
            margin-left: 1.52rem;
            height: calc(100vh - 2.05rem);
            overflow-y: auto;
            overflow-x: hidden;
            h2{
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                font-size: .3rem;
                color: #4c4c4c;
                font-weight: normal;
            }
            ul{
                display: flex;
                flex-wrap:wrap;
                li{
                    width: 33.3%;
                    margin-bottom: .5rem;
                    .img{
                        width: 100%;
                        height: 1.04rem;
                        margin: 0 auto;
                        display:table;
                        .tgd {
                            display:table-cell;
                            width: 100%;
                            height: 1.04rem;
                            text-align: center;
                            vertical-align:middle;
                        }
                        img{
                            max-width: 1.07rem;
                            max-height: 1.04rem;
                        }
                    }

                    p{
                        margin-top: .2rem;
                        width: 100%;
                        text-align: center;
                        font-size: .24rem;
                        color: #4c4c4c;
                    }
                }
            }
        }
    }
</style>