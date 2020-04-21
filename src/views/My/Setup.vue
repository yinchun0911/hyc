<template>
    <div class="setup">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <ul>
                <li @click="goTo('setAddress')">收货地址 <i class="el-icon-arrow-right"></i></li>
                <li @click="goTo('accountSecurity')">账号与安全<i class="el-icon-arrow-right"></i></li>
                <li @click="goTo('proposal')">投诉建议<i class="el-icon-arrow-right"></i></li>
            </ul>
            <div class="btns">
                <button @click="logout()">切换账号</button>
                <button @click="logout()" class="backBtn">退出登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "setup",
        data(){
            return{
                title:'基础设置'
            }
        }, methods:{

            logout(){
               localStorage.setItem("userId",null);
                localStorage.setItem("token",null);
               this.goTo("login");
            },
             goTo(path,params){
                    if(params){
                        this.$router.push({name:path,params:params});
                    }else{
                        this.$router.push(path);
                    }
                }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .setup{
        .content{
            margin-top: 1.02rem;
            ul{
                background-color: #fff;
                overflow: hidden;
                li{
                    padding: 0 .2rem;
                    height: .8rem;
                    line-height: .8rem;
                    font-size: .26rem;
                    color: #4c4c4c;
                    border-bottom: .02rem solid #f0f3fa;
                    position: relative;
                    i{
                        float: right;
                        font-size: 20px;
                        position: absolute;
                        right: .15rem;
                        top:50%;
                        margin-top: -.2rem;
                    }
                }
            }
            .btns{
                padding: 0 .2rem;
                margin-top: 1rem;
                button{
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    background-color: #83b7ff;
                    color: #fff;
                    margin-bottom: .45rem;
                    border-color: #83b7ff;
                    border-radius: .4rem;
                }
                .backBtn{
                    background-color: #fff;
                    color: #b2b2b2;
                    border-color: #d7d9dd;
                    span{
                        position: relative;
                        padding-left: .3rem;
                    }
                }
            }
        }
    }
</style>