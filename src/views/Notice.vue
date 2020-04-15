<template>
    <div class="notice">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="list">
                <div class="time">2020年03月19日</div>
                <div class="msg">
                    <h2>又有新版本更新咯！！</h2>
                    <p>惠原仓2.1.1版本已经上线，赶快去更新吧！！</p>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "notice",
        data(){
            return{
                title:'系统通知',
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .notice{
        .content{
            margin-top: 1.02rem;
            padding: 0 .2rem;
            .list{
                .time{
                    width: 3.2rem;
                    height: .4rem;
                    line-height: .4rem;
                    color: #fff;
                    background-color: #ccc;
                    font-size: .22rem;
                    text-align: center;
                    border-radius: .4rem;
                    margin: 0 auto;
                }
                .msg{
                    background-color: #fff;
                    overflow: hidden;
                    margin-top: .2rem;
                    padding: .25rem;
                    border-radius: .2rem;
                    position: relative;
                    h2{
                        font-size: .28rem;
                        color: #4c4c4c;
                        font-weight: normal;
                    }
                    p{
                        font-size: .26rem;
                        color: #b2b2b2;
                        margin-top: .4rem;
                    }
                    i{
                        position: absolute;
                        right: .15rem;
                        top: 50%;
                        margin-top: -.1rem;
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>