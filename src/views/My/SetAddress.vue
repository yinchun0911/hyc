<template>
    <div class="setAddress">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="top">
                <h2>Car Walker<span>15022021331</span><b>家</b><i class="el-icon-edit"></i></h2>
                <p>重庆市渝北区XXXX12#10-1</p>
                <div><el-checkbox v-model="checked">设为默认</el-checkbox><i class="el-icon-delete"></i></div>
            </div>
            <div class="btns">
                <button><i class="el-icon-plus"></i>添加地址</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "setAddress",
        data(){
            return{
                title:'收货地址',
                checked:false
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .setAddress{
        .content{
            margin-top: 1.02rem;
            padding: 0 .2rem;
            .top{
                background-color: #fff;
                border-radius: .2rem;
                overflow: hidden;
                padding: .25rem .3rem;
                h2{
                    font-size: .3rem;
                    color: #4c4c4c;
                    font-weight: normal;
                    span{
                        padding-left: .25rem;
                        font-size: .24rem;
                        color: #b2b2b2;
                    }
                    b{
                        margin-left: .25rem;
                        padding: 0 .15rem;
                        font-weight: normal;
                        background-color: #ffaf83;
                        color: #fefefe;
                        border-radius: .05rem;
                    }
                    i{
                        float: right;
                        font-size: .34rem;
                    }
                }
                p{
                    font-size: .26rem;
                    color: #b2b2b2;
                    margin-top: .2rem;
                }
                div{
                    margin-top: .2rem;
                    .el-checkbox__label{
                        font-size: .26rem;
                        color: #4c4c4c;
                    }
                    i{
                        float: right;
                        font-size: .34rem;
                    }
                }
            }
            .btns{
                padding: 0 .2rem;
                margin-top: .35rem;
                button{
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    background-color: transparent;
                    color: #83b7ff;
                    margin-bottom: .45rem;
                    border-color: #83b7ff;
                    border-radius: .4rem;
                }
            }
        }
    }
</style>