<template>
    <div class="information">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="list">
                <h3><img src="../assets/images/information-03.png" alt="">最新消息</h3>
                <ul>
                     <li v-for="item in list" @click="markRead(item.messageID,item.isRead)">
                        <div class="badge fl">
                            <img src="../assets/images/information-01.png" alt="">
                            <i v-if="item.isRead != 1" class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>{{item.messageTitle}}<span>{{item.messageTime}}</span></h4>
                            <p>{{item.messageContext}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list" v-if="earlyList.length>0" >
                <h3><img src="../assets/images/information-04.png" alt="">两周前消息</h3>
                <ul>
                     <li v-for="item in earlyList" @click="markRead(item.messageID,item.isRead)">
                        <div class="badge fl">
                            <img src="../assets/images/information-01.png" alt="">
                            <i v-if="item.isRead !=  1" class="dot"></i>
                        </div>
                        <div class="msg">
                            <h4>{{item.messageTitle}}<span>{{item.messageTime.split(" ")[0]}} </span></h4>
                            <p>{{item.messageContext}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    var moment = require('moment');
    export default {
        name: "information",
        data(){
            this.loadMsg(0);

            return{
                num:0,
                list:[],
                earlyList:[],
                title:'消息'
            }
        },
        methods:{
            markRead(id,isRead,item){
                if(isRead==0){
                  userRequest("/shopIndex/indexMessageRead",{messageID:id}).then(function (response) {
                    item.isRead=1;
                  });
                }
            },
            loadMsg(pageNo){
               var page=this;
               var postData={
                 current: pageNo,
                 pageSize: 20,
               }
               var date=new Date();
               userRequest("/shopIndex/queryIndexMessageList",postData).then(function (response) {
                       var title="消息"+response.totle;
                        page.title=title;
                        var list=response.pageInfo.list;
                        for(var i in list){
                            var data=list[i];
                            var day = moment(data.messageTime);

                           if(2>=0-day.diff(date, 'w')){
                                var passDay=0-parseInt(day.diff(date, 'H')/24);
                               console.log(data.messageTime,passDay,day.diff(date, 'm'))
                               var passTime="";
                               if(passDay>=7){
                                    passTime=1+"周前";
                               }else if(passDay>=1){
                                     passTime=passDay+"天前";
                                }else if (0-day.diff(date, 'm') >60){
                                    passTime=(0-day.diff(date, 'H'))+"小时前";
                               }else if(0-day.diff(date, 'm') >1){
                                    passTime=(0-day.diff(date, 'm'))+"分钟前";
                               }else{
                                    passTime="刚刚"
                               }
                               data.messageTime=passTime;
                               page.list.push(data);
                            }else{
                              page.earlyList.push(data);
                            }
                        }
               });

            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .information{
        .content{
            margin-top: 1.02rem;
            .list{
                margin-bottom: .25rem;
                h3{
                    padding: 0 .2rem;
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .3rem;
                    color: #333;
                    img{
                        width: .39rem;
                        height: .4rem;
                        margin-right: .15rem;
                    }
                }
                ul{
                    margin-top: .15rem;
                    background-color: #fff;
                    overflow: hidden;
                    li{
                        height: 1.42rem;
                        border-bottom: .02rem solid #ddd;
                        padding: .32rem .2rem;
                        .badge{
                            width: 1.25rem;
                            height: 100%;
                            text-align: center;
                            position: relative;
                            img{
                                display: inline-block;
                                width: .8rem;
                                height: .8rem;
                                border-radius: 50%;
                            }
                            i.dot{
                                display: inline-block;
                                width: .2rem;
                                height: .2rem;
                                background-color: #ff0d0d;
                                border-radius: 50%;
                                position: absolute;
                                right: .2rem;
                                top: .05rem;
                            }
                        }
                        .msg{
                            margin-left: 1.25rem;
                            h4{
                                font-size: .28rem;
                                color: #333;
                                font-weight: normal;
                                span{
                                    float: right;
                                    font-size: .24rem;
                                    color: #999;
                                }
                            }
                            p{
                                font-size: .24rem;
                                color: #999;
                                padding-top: .1rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>