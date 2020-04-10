<template>
    <div class="classHome">
        <ClassHeader @sweepCodeClick="sweepCodeClick" @searchClick="searchClick" @shopClick="shopClick"></ClassHeader>
        <div class="content">
            <el-tabs tab-position="left">
                <el-tab-pane label="食品饮料">
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
                    </div>
                </el-tab-pane>
                <el-tab-pane label="鲜花蛋糕">鲜花蛋糕</el-tab-pane>
                <el-tab-pane label="时令水果">时令水果</el-tab-pane>
                <el-tab-pane label="书店">书店</el-tab-pane>
                <el-tab-pane label="美妆护肤">美妆护肤</el-tab-pane>
                <el-tab-pane label="生活服务">生活服务</el-tab-pane>
                <el-tab-pane label="卫生服务">卫生服务</el-tab-pane>
                <el-tab-pane label="个人护理">个人护理</el-tab-pane>
                <el-tab-pane label="厨房用具">厨房用具</el-tab-pane>
                <el-tab-pane label="亲子母婴">亲子母婴</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ClassHeader from '@/components/ClassHeader.vue'
    export default {
        name: "home",
        methods:{
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
        }
    }
</script>

<style lang="less">
    .classHome{
        .el-tabs{
            background-color: #f0f3fa;
        }
        .el-tabs__header{
            /*background-color: #f0f3fa;*/
        }
        .el-tabs__item{
            font-size: .22rem;
            color: #b2b2b2;
            height: 1rem;
            line-height: 1rem;
        }
        .el-tabs__item.is-active{
            background-color: #fff;
        }
        .el-tabs__active-bar{
            height: 1rem !important;
        }
        .el-tabs__content{
            background-color: #fff;
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
    .classHome .el-tabs--left .el-tabs__active-bar.is-left, .el-tabs--left .el-tabs__nav-wrap.is-left::after{
        left: 0;
        right: auto;
    }
    .classHome .el-tabs--left .el-tabs__header.is-left{
        margin-right: 0;
    }
    .classHome .el-tabs__nav-wrap:after{
        content: '';
        display: none;
    }
</style>