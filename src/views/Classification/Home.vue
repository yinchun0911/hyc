<template>
    <div class="classHome">
        <ClassHeader @sweepCodeClick="sweepCodeClick" @searchClick="searchClick" @shopClick="shopClick"></ClassHeader>
        <div class="content">
            <van-sidebar v-model="activeKey" @change="onChange">
                <template v-for="(left,index) in leftList">
                    <van-sidebar-item   :title="left.typeName" />
                </template>
            </van-sidebar>
            <div class="box">


             <template v-for="(tiem,index) in comtentList">
                <h2>食品饮料</h2>
                <ul>
                    <li @click="goTo('list',{typeId:11})">
                        <div class="img">
                            <div class="tgd">
                                <img src="../../assets/images/classIfication/list-01.png" alt="">
                            </div>
                        </div>
                        <p>米</p>
                    </li>
                </ul>
                </template>
            </div>
        </div>
          <Footer></Footer>
    </div>

</template>

<script>
    import ClassHeader from '@/components/ClassHeader.vue'
    import Footer from '@/components/Footer.vue'
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "home",
        data(){
            this.initTopList();
            return {
                leftList:[],
                comtentList:[],
                 activeKey:0
            }
        },
        methods:{
            goTo(path,params){
                this.$router.push({name:path,params:params});
            },
            loadSubList(data){
                var page=this;
                var typeID=data.typeID;
                request("/shopProduct/queryProductTypeLevelOtherList",{typeID:typeID}).then(function (response) {
                    page.comtentList=response;
              })

            },
            initTopList(){
              var page=this;
                 request("/shopProduct/queryProductTypeLevelOneList",null).then(function (response) {
                      page.leftList=response;
                       page.loadSubList(response[0])
                })
            },

            onChange(val){
                 var page=this;
                 page.loadSubList(this.leftList[val].typeID);

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