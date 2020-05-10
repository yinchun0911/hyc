<template>
    <div class="classHome">
        <ClassHeader @sweepCodeClick="sweepCodeClick" :badgeNum="badgeNum" @searchClick="searchClick" @shopClick="shopClick"></ClassHeader>
        <div class="content">
            <van-sidebar  v-model="activeKey" @change="onChange">
                <template v-for="(left,index) in leftList">
                    <van-sidebar-item   :title="left.typeName" />
                </template>
            </van-sidebar>
             <template v-for="(list,index) in comtentList">
                 <div class="box" v-if="activeKey == index">
                    <template   v-for="(item,index2) in comtentList[index]">

                        <h2>{{item.typeName}}</h2>
                        <ul>
                            <template v-for="(sub,index3) in item.subList">
                                <li @click="goTo('list',{typeId:sub.typeID})">
                                    <div class="img">
                                        <div class="tgd">
                                            <img :src="sub.typePic" alt="">
                                        </div>
                                    </div>
                                    <p>{{sub.typeName}}</p>
                                </li>
                             </template>
                        </ul>

                    </template>
                  </div>
            </template>

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
            var typeId = this.$route.query.typeId;
            var areaID = this.$route.query.areaID;

            this.initTopList(typeId,areaID);
            this.getShoppingCarNum();
            var queryIndex=this.$route.query.index;
            if(!queryIndex){
                queryIndex=0;
            }
            return {
                leftList:[],
                comtentList:[],
                activeKey:-1,
                queryIndex:queryIndex,
                badgeNum:0,
                totalNum:0
            }
        },
        methods:{
            goTo(path,params){
                this.$router.push({name:path,query:params});
            },
            loadSubList(data,index,qtypeId,qareaID){
                var page=this;
                var typeID=data.typeID;

                if(typeID==qtypeId){

                    page.queryIndex=index;
                }
                if(typeID==qareaID){

                    page.queryIndex=index;
                }
                var postData={current:0,pageSize:0,token:"string",typeID:typeID}
                request("/shopProduct/queryProductTypeLevelOtherList",postData).then(function (response) {
                    page.comtentList[index]=response;

                    for(let it in response){
                        var ctypeID=response[it].typeID;

                        if(ctypeID==qtypeId){

                            page.queryIndex=parseInt(index);
                        }
                        if(ctypeID==qareaID){

                            page.queryIndex=parseInt(index);
                        }
                       for(var st in  response[it].subList){
                           var stypeId= response[it].subList[st].typeID;

                           if(stypeId==qtypeId){

                               page.queryIndex=parseInt(index);
                           }
                           if(stypeId==qareaID){

                               page.queryIndex=parseInt(index);
                           }
                       }
                    }
                    console.log("total",index,typeof page.totalNum,typeof index,page.totalNum==(parseInt(index)+1))
                    if(page.totalNum==(parseInt(index)+1)){
                        console.log("check")
                        page.checkInitEd()
                    }
              })

            },
            initTopList(typeId,areaID){
              var page=this;
                 request("/shopProduct/queryProductTypeLevelOneList",null).then(function (response) {
                      page.leftList=response;
                      page.totalNum=response.length;
                      for(let it in response){
                       page.loadSubList(response[it],it,typeId,areaID)
                      }


                })
            },

            onChange(val){
                 var page=this;
                 page.activeKey=val
               //  page.loadSubList(this.leftList[val].typeID);

            },
            getShoppingCarNum(){
                        var page=this;
                        var postData={noError:true,defaultFn:function(){
                                 console.log("defaultProcess")
                                 page.badgeNum=0;
                            }
                        }
                        userRequest("/shopCar/getCarGoodsNum",postData).then(function (response) {
                              page.badgeNum=response;
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
                this.goTo('list',{keyword:val})
                console.log(val)
            },
            checkInitEd(){
                console.log("check")
                var page=this;
                    setTimeout(function () {
                        page.activeKey=page.queryIndex;
                    },200);


            }
        },mounted() {

        },
        components: {
            ClassHeader,
            Footer
        }
    }
</script>

<style lang="less">
    .classHome{
        .content{
            margin-top: 0.88rem;
        }
        .van-sidebar{
            width: 1.52rem;
            height: calc(100vh - 2.05rem);
            float: left;
            .van-sidebar-item{
                background-color: #f0f3fa;
                text-align: center;
                padding: 15px 12px 15px 8px;
            }
            .van-sidebar-item__text{
                font-size: .24rem;
                color: #323233;
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
                        margin-top: .1rem;
                        width: 100%;
                        text-align: center;
                        font-size: .2rem;
                        color: #4c4c4c;
                    }
                }
            }
        }
    }
</style>