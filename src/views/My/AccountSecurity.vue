<template>
    <div class="accountSecurity">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <ul>
                <li>
                    <input type="text" v-model="phone" placeholder="手机号">
                    <button>绑定手机号</button>
                </li>
               <!-- <li>
                    <input type="text" placeholder="微信号">
                    <span>张三</span>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "accountSecurity",
        data(){
             var phone=sessionStorage.getItem("phone")+"";
            return{
                phone:phone,
                title:'账号与安全',
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .accountSecurity{
        .content{
            margin-top: 1.02rem;
            ul{
                background-color: #fff;
                overflow: hidden;
                padding: 0 .2rem;
                li{
                    height: .8rem;
                    line-height: .8rem;
                    border-bottom: .02rem solid #f0f3fa;
                    font-size: .26rem;
                    position: relative;
                    &:before{
                        content: '';
                        width: .31rem;
                        height: .31rem;
                        background: url("../../assets/images/my/pho.png") no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        left: .2rem;
                        top:50%;
                        margin-top: -.1rem;
                    }
                    &:last-child{
                        &:before{
                            content: '';
                            width: .31rem;
                            height: .31rem;
                            background: url("../../assets/images/my/weixin.png") no-repeat;
                            background-size: 100% 100%;
                            position: absolute;
                            left: .2rem;
                            top:50%;
                            margin-top: -.1rem;
                        }
                    }
                    input{
                        width: 5.1rem;
                        height: 100%;
                        border: 0;
                        padding-left: .65rem;
                        font-size: .26rem;
                    }
                    button{
                        float: right;
                        width: 2rem;
                        height: .6rem;
                        line-height: .6rem;
                        background-color: #83b7ff;
                        font-size: .26rem;
                        color: #fff;
                        text-align: center;
                        margin-top: .1rem;
                        border-radius: .4rem;
                        border: 0;
                    }
                    span{
                        float: right;
                        font-size: .26rem;
                        color: #4c4c4c;
                    }
                }
            }
        }
    }
</style>