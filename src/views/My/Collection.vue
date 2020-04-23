<template>
    <div class="collection">
        <ListHeader :title="title" :text="text" :showHeadFr="false" :showMyHeadFr="true" @clickBtn="succseClick(text)"></ListHeader>
        <div class="content">
            <div class="listBox" v-for="month in monthArray" >
                <h2>{{month}} </h2>
                <div class="list" v-for="item in monthDataArray[month]" >
                    <div class="list-fl fl"  >
                        <el-checkbox v-model="checkIds[item.goodsid]" v-if="showChecked"></el-checkbox>
                        <div class="img"  @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})">
                            <img :src="item.productPic" alt="">
                        </div>
                    </div>
                    <div class="list-fr" :class="{marLeft:showChecked}">
                        <h3  @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})" >{{item.productName}}</h3>
                        <i class="tag" @click="goTo('detail',{productID:item.productID,goodsid:item.goodsid})"  > {{item.standrdsName}}</i>
                        <div class="prices">
                            <span class="jg">{{item.productPrice}}</span>
                            <el-button type="primary" @click="addShopClick(item.productID,item.goodsid)" round icon="el-icon-plus"></el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="collection-foot" v-if="showChecked">
            <div class="warp">
                <el-checkbox v-model="checked" @change="clickAll()">全选</el-checkbox>
                <button @click="del()" >删 除</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    import {Dialog} from "vant";
    var moment = require('moment');
    export default {
        name: "collection",
        data(){
            this.loadData(0,this);
            return{
                title:'我的收藏',
                text:'管理',
                checked:false,
                showChecked:false,
                monthArray:[],
                monthDataArray:{},
                checkIds:{}
            }
        },
        methods:{
            goTo(path,params){
                        if(params){
                            this.$router.push({name:path,query:params});
                        }else{
                            this.$router.push(path);
                        }
             },
              addShopClick(val){
                 console.log(val)
                 var page=this;
                 var postData={
                     goodsid: val,
                     num: 1
                 };
                 userRequest("/shopCar/addCarGoods",postData).then(function(response){
                     Dialog({ message: '添加购物车成功' })
                 });
             },
            loadData(pageNo,op){
                 var postData={
                      current: pageNo,
                      pageSize: 10,
                    }
                var nowYear=new Date().getFullYear();
                userRequest("/appUser/queryUserCollectList",postData).then(function (response) {
                        for(var i in response){
                            var data=response[i];
                            var time=data.collectTime.split("-");
                            var monthStr="";
                            if(nowYear==time[0]){
                                monthStr=time[1]+"月"+time[2]+"日";
                            }else{
                                monthStr=time[0]+"年"+time[1]+"月"+time[2]+"日";
                            }
                            if(op.monthArray.indexOf(monthStr)==-1){
                                op.monthArray.push(monthStr);
                                op.monthDataArray[monthStr]=[];
                            }
                            op.monthDataArray[monthStr].push(data);
                        }
                        console.log(op.monthArray,op.monthDataArray)
                 })
            },
            clickAll(){
                var page=this;
                for(var i in page.monthDataArray){
                    for(var j in page.monthDataArray[i] ){
                        var op=page.monthDataArray[i][j];
                        page.checkIds[op.goodsid]=page.checked;
                    }
                }
            },
            del(){
                var page=this;
                var total=0;
                var success=0;
                for(var i in page.checkIds){
                    if(!this.checkIds[i]){
                        continue;
                    }
                    total++;
                    userRequest("/shopProduct/delProductCollectInfo",{goodsid:i}).then(function (response) {
                        success++;
                        if(total==success ){
                               page.monthArray=[];
                               page.monthDataArray={};
                               page.loadData(0,page);
                        }
                    });
                }
            },
            succseClick(text){
                if(text=='管理'){
                    this.showChecked = true
                    this.text = '完成'
                }else{
                    this.showChecked = false
                    this.text = '管理'
                }

            }
        },
         mounted() {
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .collection{
        .content{
            margin-top: 1.08rem;
            margin-bottom: 1rem;
            .listBox{
                background-color: #fff;
                overflow: hidden;
                border-radius: .2rem;
                margin: .2rem;
                padding: 0 .3rem .3rem;
                h2{
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .24rem;
                    font-weight: normal;
                    border-bottom: .02rem solid #f0f3fa;
                }
                .list{
                    margin-top: .25rem;
                    .el-checkbox{
                        line-height: 1.53rem;
                        margin-right: .2rem;
                    }
                    .el-checkbox__inner{
                        width: .4rem;
                        height: .4rem;
                        border-radius: 50%;
                        &:after{
                            left: 7px;
                            top:3px;
                        }
                    }
                    .list-fl{
                        width: 2.08rem;
                        height: 1.53rem;
                        font-size:0;
                        display:table;
                        .img{
                            display:table-cell;
                            text-align: center;
                            vertical-align:middle;
                            width: 100%;
                            height: 1.53rem;
                            border: .02rem solid #e6e6e6;
                            img{
                                max-width: 2.08rem;
                                max-height: 1.53rem;
                            }
                        }
                    }
                    .list-fr{
                        margin-left: 2.44rem;
                        h3{
                            font-size: .24rem;
                            color: #4c4c4c;
                        }
                        i.tag{
                            display: inline-block;
                            margin-top: .1rem;
                            color: #83b7ff;
                            font-size: .22rem;
                            border: .02rem solid #83b7ff;
                            padding: .02rem .1rem;
                            border-radius: .2rem;
                        }
                        .prices{
                            margin-top: .4rem;
                            span.jg{
                                font-size: .3rem;
                                color: #ff5644;
                                position: relative;
                                font-weight: bolder;
                                padding-left: .25rem;
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
                            .el-button{
                                float: right;
                                width: .4rem;
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0;
                            }
                        }
                    }
                    .marLeft{
                        margin-left: 2.84rem;
                    }
                }
            }
        }
        .collection-foot{
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            background-color: #fff;
            overflow: hidden;
            padding: 0 .2rem;
            position: fixed;
            bottom:0;
            z-index: 1000;
            .warp{
                .el-checkbox__inner{
                    width: .4rem;
                    height: .4rem;
                    border-radius: 50%;
                    &:after{
                        left: 7px;
                        top:3px;
                    }
                }
                button{
                    float: right;
                    width: 2rem;
                    height: .6rem;
                    line-height: .6rem;
                    background-color: #83b7ff;
                    color: #fff;
                    font-size: .3rem;
                    border-radius: .4rem;
                    margin-top: .1rem;
                    border: 0;
                }
            }
        }
    }
</style>