<template>
    <div class="ticket">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <template v-for="item in cardList">
                        <div :class="['cardRoll',item.cardName=='红色观影券'?'red':'',
                                                  item.cardName=='蓝色观影券'?'blue':'',
                                                  item.cardName=='橙色蛋糕券'?'yellow':'',
                                                  item.cardName=='绿色洗衣券'?'green':'']">
                            <div>
                                <span>剩余点数：{{item.cardBalance}}点</span>
                                <p>{{item.cardNo}}</p>
                            </div>
                        </div>
            </template>

            <button>绑定实体点券</button>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
     import { request, userRequest} from '@/js/request.js'

    export default {
        name: "ticket",
        data(){
            this.loadData(0)
            return{
                title:'我的点券',
                cardList:[]
            }
        },
         methods:{
            loadData(current){
                var page=this;
                var postData={
                  current: current,
                  pageSize: 20,
                }
                userRequest("/appUser/queryUserCardList",postData).then(function (response) {
                        for(var i in response){
                            page.cardList.push(response[i])
                        }
                 })
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .ticket{
        .content{
            margin-top: 1.2rem;
            .cardRoll{
                div{
                    position: relative;
                    margin: 0 auto;
                    width: 7.26rem;
                    height: 2.15rem;
                    span{
                        position: absolute;
                        bottom: .52rem;
                        left: 2rem;
                        font-size: .28rem;
                        color: #fff;
                    }
                    p{
                        font-size: .26rem;
                        color: #fff;
                        position: absolute;
                        right: .28rem;
                        top: .5rem;
                    }
                }
            }
            .blue{
                background: url("../../assets/images/classIfication/cardRoll-01.png") no-repeat;
                background-size: 100% 100%;
            }
            .red{
                background: url("../../assets/images/classIfication/cardRoll-02.png") no-repeat;
                background-size: 100% 100%;
            }
            .yellow{
                background: url("../../assets/images/classIfication/cardRoll-03.png") no-repeat;
                background-size: 100% 100%;
            }
            .green{
                background: url("../../assets/images/classIfication/cardRoll-04.png") no-repeat;
                background-size: 100% 100%;
            }
            button{
                width: 100%;
                height: .8rem;
                line-height: .8rem;
                color: #fff;
                font-size: .3rem;
                border-radius: .4rem;
                background-color: #83b7ff;
                border: 0;
                margin-top: .7rem;
            }
        }

    }

</style>