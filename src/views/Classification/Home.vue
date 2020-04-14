<template>
    <div class="classHome">
        <ClassHeader @sweepCodeClick="sweepCodeClick" @searchClick="searchClick" @shopClick="shopClick"></ClassHeader>
        <div class="content">
            <el-tabs tab-position="left">
                <template v-for="(left,index) in leftList">
                    <el-tab-pane :label="left.typeName">
                        <div class="box">
                          <template v-for="(item,index2) in comtentList[left.typeName]">
                            <h2>{{item.typeName}}</h2>
                            <ul>
                                  <li @click="goTo('list',{typeId:item.typeId})">
                                     <div class="img">
                                         <div class="tgd">
                                             <img src="../../assets/images/classIfication/list-01.png" alt="">
                                         </div>
                                     </div>
                                     <p>米</p>
                                 </li>
                             </ul>
                          </template>
                        <h2>优选礼包</h2>
                        <h2>优选礼包</h2>
                        <ul>
                            <li @click="goTo('list',{typeId:11})">
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
                </template>

            </el-tabs>

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
                comtentList:[]
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
                    page.comtentList[data.typeName]=response;
              })

            },
            initTopList(){
              var page=this;
                 request("/shopProduct/queryProductTypeLevelOneList",null).then(function (response) {
                      page.leftList=response;
                      for(var i in response){
                        page.loadSubList(response[i])
                      }

                  })
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