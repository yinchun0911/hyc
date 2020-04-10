<template>
    <div class="setup">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <ul>
                <li>收货地址<i class="el-icon-arrow-right"></i></li>
                <li>账号与安全<i class="el-icon-arrow-right"></i></li>
                <li>通用设置<i class="el-icon-arrow-right"></i></li>
                <li>版本更新<i class="el-icon-arrow-right"></i></li>
                <li>投诉建议<i class="el-icon-arrow-right"></i></li>
            </ul>
            <div class="btns">
                <button>切换账号</button>
                <button class="backBtn">退出登录</button>
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