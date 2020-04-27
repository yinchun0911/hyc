<template>
    <div class="head">
        <div class="head-fl fl" >
            <img src="../assets/images/icon-01.png" alt="">
        </div>
        <div class="head-center fl">
            <input type="text" v-model="serchTxt" @keypress="inputChange"  placeholder="请输入关键词">
            <el-button type="primary" icon="el-icon-search" circle @click="search(serchTxt)"></el-button>
        </div>
        <div class="head-fr fr" @click="msgEvent">
            <el-badge :value="badgeNum" class="item" :hidden="badgeNum ==0">
                <img src="../assets/images/icon-02.png" alt="">
            </el-badge>
        </div>
    </div>
</template>

<script>
    export default {
        name: "searchHeader",
         props:['badgeNum'],
        data(){
            return{
                serchTxt:''
            }
        },
        methods:{
            inputChange(e){
                var page=this;
                if(e.keyCode == 13){
                    e.preventDefault();//禁止键盘默认事件
                    this.$router.push('/classification/list?keyword='+page.serchTxt)
                }
            },
            sweepCode(){
                this.$emit('sweepCodeClick');
            },
            msgEvent(){
                this.$emit('msgEventClick');
            },
             search(val){
                  this.$router.push('/classification/list?keyword='+val)
              }

        }
    }
</script>

<style lang="less">
    .head{
        width: 100%;
        height: .88rem;
        background-color: #83b7ff;
        padding: 0 .2rem;
        position: fixed;
        top: 0;
        z-index: 1000;
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