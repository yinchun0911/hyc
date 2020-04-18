<template>
    <div class="header">
        <div class="header-fl fl">
            <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
        </div>
        {{title}}
        <div class="header-fr fr" v-if="showHeadFr" @click="shopClick(shoppingNum)">
            <el-badge :value="shoppingNum" class="item">
                <img src="@/assets/images/header-gw.png" alt="">
            </el-badge>
        </div>
        <div class="header-fr fr" v-if="showMyHeadFr" @click="clickBtn">
            <span class="fr-word">{{text}}</span>
        </div>
    </div>
</template>

<script>
import { request, userRequest} from '@/js/request.js'
    export default {
        name: "listHeader",
        data(){
            this.getShoppingCarNum();
            return{
                shoppingNum:0
            }
        },
        props:{
            title:{
                type:String,
            },
            text:{
                type:String,
            },
            showHeadFr:{
                type:Boolean,
                default:true
            },
            showMyHeadFr:{
                type:Boolean,
                default:true
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
                })
            },
            shopClick(val){
                this.$emit('shopClick',val);
            },
            clickBtn(){
                this.$emit('clickBtn');
            }
        }
    }
</script>

<style lang="less">
    .header{
        width: 100%;
        height: .88rem;
        background-color: #83b7ff;
        padding: 0 .2rem;
        font-size: .3rem;
        color: #fff;
        text-align: center;
        line-height: .88rem;
        position: fixed;
        top:0;
        z-index: 1000;
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
            .fr-word{
                font-size: .24rem;
                display: inline-block;
                margin-top: .15rem;
            }
        }
    }
</style>