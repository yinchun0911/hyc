<template>
    <div class="failPayment">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="top">
                支付失败!
            </div>
            <div class="btns">
                <button>重新支付</button>
            </div>

        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "failPayment",
        data(){
            return{
                title:'支付失败'
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .failPayment{
        .content{
            margin-top: .88rem;
            .top{
                width: 100%;
                height: 3rem;
                line-height: 3rem;
                background-color: #83b7ff;
                text-align: center;
                font-size: .4rem;
                font-weight: bolder;
                color: #fff;
                padding-left: 1.58rem;
                position: relative;
                &:before{
                    content: '';
                    width: 1.11rem;
                    height: 1.11rem;
                    background: url("../../assets/images/fild.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 2.15rem;
                    top: 50%;
                    margin-top: -.55rem;
                }
            }
            .btns{
                padding: 0 .2rem;
                margin-top: 1.25rem;
                button{
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    background-color: #83b7ff;
                    color: #fff;
                    border-color: #83b7ff;
                    border-radius: .4rem;
                }
            }

        }
    }
</style>