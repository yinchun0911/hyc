<template>
    <div class="head">
        <div class="head-fl fl" @click="sweepCode">
            <img src="../assets/images/icon-01.png" alt="">
        </div>
        <div class="head-center fl">
            <input type="text" v-model="serchTxt" placeholder="请输入关键词">
            <el-button type="primary" icon="el-icon-search" circle @click="search(serchTxt)"></el-button>
        </div>
        <div class="head-fr fr" @click="shopClick(badgeNum)">
            <el-badge :value="badgeNum" class="item" :hidden="badgeNum==0">
                <img src="../assets/images/header-gw.png" alt="">
            </el-badge>
        </div>
    </div>
</template>

<script>
    export default {
        name: "classHeader",
        props:['badgeNum'],
        data(){
            return{
                serchTxt:''
            }
        },
        methods:{
            sweepCode(){
                this.$emit('sweepCodeClick');
            },
            search(val){
                this.$router.push('/classification/list?keyword='+val)
            },
            shopClick(val){
                this.$router.push({path:"/Shopping"});
            },
        }
    }
</script>

<style lang="less">
    .head{
        height: .88rem;
        background-color: #83b7ff;
        padding: 0 .2rem;
        .head-fl{
            img{
                width: .47rem;
                height: .47rem;
                margin-top: .2rem;
            }
        }
        .head-center{
            width: 5.7rem;
            height: .68rem;
            position: relative;
            input{
                width: 100%;
                height: 100%;
                border-radius: .5rem;
                margin-top: .1rem;
                margin-left: .2rem;
                font-size: .26rem;
                text-indent: .2rem;
            }
            .el-button{
                width: .66rem;
                height: .66rem;
                padding: 0;
                position: absolute;
                right: -.2rem;
                top: .1rem;
            }
        }
        .head-fr{
            margin-top: .2rem;
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
</style>