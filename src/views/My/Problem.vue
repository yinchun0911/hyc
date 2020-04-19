<template>
    <div class="problem">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <el-collapse accordion >
                 <el-collapse-item v-for="type in problem">
                    <template slot="title">
                        <h2 :class="'q'+type.typeSort">{{type.typeName}}</h2>
                    </template>
                    <div class="main" v-for="it in type.problemInfoList  ">
                        <h4>{{it.sortNum}}、{{it.question}}</h4>
                        <div class="msg">
                            {{it.answer}}
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>

        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "problem",
        data(){
            this.loadData();
            return{
                title:'常见问题',
                problem:{}
            }
        },
        methods:{
            loadData(){
                var op=this;
               request("/appUserCommon/queryNormalAnswerInfo",{}).then(function (response) {
                     op.problem=response
               });

            }
        },

        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .problem{
        .content{
            margin-top: 1.08rem;
            .el-collapse {
                border-top: 1px solid #f0f3fa;
                border-bottom: 1px solid #f0f3fa;
                .el-collapse-item__header{
                    height: .8rem;
                    line-height: .8rem;
                    padding-left: .2rem;
                    h2{
                        font-size: .26rem;
                        color: #4c4c4c;
                        font-weight: normal;
                        position: relative;
                        padding-left: .65rem;
                        &:before{
                            content: '';
                            width: .45rem;
                            height: .43rem;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            margin-top: -.21rem;
                        }
                    }
                    .q1{
                        &:before{
                            background: url("../../assets/images/my/q1.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                    .q2{
                        &:before{
                            background: url("../../assets/images/my/q2.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                    .q3{
                        &:before{
                            background: url("../../assets/images/my/q3.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                    .q4{
                        &:before{
                            background: url("../../assets/images/my/q4.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
                .el-collapse-item__content{
                    margin: 0 .2rem;
                }
                .main{
                    margin-bottom: .3rem;
                    background-color: #f5f5f5;
                    h4{
                        font-size: .26rem;
                        position: relative;
                        padding-left: .35rem;
                        &:before{
                            content: '';
                            width: .1rem;
                            height: .38rem;
                            background-color: #3291ff;
                            border-radius: .1rem;
                            position: absolute;
                            left: 0;
                        }
                    }
                    .msg{
                        padding: .35rem;
                        p{
                            font-size: .2rem;
                            color: #afafaf;
                        }
                    }
                }
            }
        }
    }
</style>