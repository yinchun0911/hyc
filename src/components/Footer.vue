<template>
    <div class="foot">
        <ul>
            <li v-for="(item,index) in footerNavList" :key='index' @click="liclick(item.path)">
                <template v-if="index==2">
                    <el-badge :value="shoppingNum" class="item" :hidden="shoppingNum==0">
                        <img :src="$route.path === item.path ? item.icon : item.normal" alt="">
                    </el-badge>
                    <p :class="$route.path === item.path ? 'active' : ''">{{item.value}}</p>
                </template>
                <template v-else>
                    <img :src="$route.path === item.path ? item.icon : item.normal" alt="">
                    <p :class="$route.path === item.path ? 'active' : ''">{{item.value}}</p>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "Footer",
        data(){
            this.getShoppingCarNum();
            return{
                refeash:true,
                // current:0,
                footerNavList:[
                    {
                        value:'首页',
                        path:'/',
                        normal:require('../assets/images/footer-01.png'),
                        icon:require('../assets/images/footer-active-01.png'),
                    },
                    {
                        value:'分类',
                        path:'/classification',
                        normal:require('../assets/images/footer-02.png'),
                        icon:require('../assets/images/footer-active-02.png'),
                    },
                    {
                        value:'购物车',
                        path:'/Shopping',
                        normal:require('../assets/images/footer-03.png'),
                        icon:require('../assets/images/footer-active-03.png'),
                    },
                    {
                        value:'我的',
                        path:'/my',
                        normal:require('../assets/images/footer-04.png'),
                        icon:require('../assets/images/footer-active-04.png'),
                    }
                ],shoppingNum:0
            }
        },
        methods:{
            getShoppingCarNum(){
                        var page=this;

                        var postData={noError:true,defaultFn:function(){
                                         console.log("defaultProcess")
                                         page.shoppingNum=0;
                                    }
                        }
                        userRequest("/shopCar/getCarGoodsNum",postData).then(function (response) {
                              page.shoppingNum=response;
                            if(page.refeash) {
                                console.log("init getNum");

                            }
                        });
            },
            liclick(path){
                this.$router.replace(path);
            }

        },
        destroyed(){

        },
    }
</script>

<style lang="less">
    .foot{
        width: 100%;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        z-index: 1000;
        ul{
            display: flex;
            justify-content: space-between;
            li{
                padding-top: .15rem;
                width: 25%;
                text-align: center;
                .el-badge__content{
                    width: .3rem;
                    height: .3rem;
                    line-height: .3rem;
                    padding: 0;
                    font-size: .16rem;
                    border-radius: 50%;
                    border: 0;
                }
                img{
                    width:.42rem;
                    height:.44rem;
                }
                p{
                    text-align: center;
                    font-size: .24rem;
                    color: #808080;
                    padding: .1rem 0;
                }
                .active{
                    color: #83b7ff;
                }
            }
        }
    }
</style>