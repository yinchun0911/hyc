<template>
    <div class="addAddress">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="top">
                <ul>
                    <li><label>联 系 人</label><input type="text" placeholder="请输入您的姓名"></li>
                    <li><label>手机号码</label><input type="text" placeholder="请输入您的手机号码"></li>
                    <li><label>所在地址</label><input type="text" readonly @click="showPopup" v-model="showAddr"></li>
                    <li><label>详细地址</label><input type="text" placeholder="例如：10楼108室"></li>
                </ul>
            </div>
            <div class="tag">
                <label>标 签</label>
                <div class="tab-box">
                    <span>家</span>
                    <span>公司</span>
                    <span>学校</span>
                    <span class="addTag"><i class="el-icon-plus"></i></span>
                </div>
            </div>
            <div class="default">
                设为默认地址
                <div class="switch fr">
                    <el-switch v-model="defaultValue"></el-switch>
                </div>
            </div>
            <div class="btns">
                <button>保 存</button>
            </div>
            <van-popup
                    v-model="show"
                    position="bottom"
                    :style="{ height: '50%' ,padding:'16px'}"
            >
                <van-area
                        :area-list="areaList"
                        :columns-placeholder="['请选择', '请选择', '请选择']"
                        value="110000"
                        title="选择地址"
                        @change="changeAddr"
                        @cancel="cancelChoose"
                        @confirm="chooseThis"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import addressData from '@/js/address.js'
    export default {
        name: "addAddress",
        data(){
            return{
                title:'新增收货地址',
                defaultValue:false,
                show: false,  //是否显示弹出层
                detailAddress: '',  //绑定详细地址输入框
                areaList: addressData, //可选地址数据列表
                showAddr: '请选择您的所在地址',      //显示校区地址
                resAddr: '',       //传给后端的位置信息
            }
        },
        methods: {
            //控制popup组件的弹出和隐藏
            showPopup () {
                this.show = true
            },
            //改变地址选择，当切换省市区时进行数据留存
            changeAddr (picker) {
                //value=0改变省，1改变市，2改变区
                let val = picker.getValues()
                this.resAddr = val
            },
            //选好地址后点击确定
            chooseThis () {
                this.show = false
                //选中地址成功后回显
                this.showAddr = this.resAddr[0].name + '-' + this.resAddr[1].name + '-' + this.resAddr[2].name
                console.log(this.resAddr, '即将传给后端的省市区信息')
            },
            cancelChoose(){
                this.show = false
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .addAddress{
        .content{
            margin-top: 1.02rem;
            .top{
                background-color: #fff;
                overflow: hidden;
                padding: 0 .2rem;
                ul{
                    li{
                        height: .8rem;
                        line-height: .8rem;
                        border-bottom: .02rem solid #f0f3fa;
                        font-size: .26rem;
                        label{
                            width: 1.37rem;
                            display: inline-block;
                            color: #4c4c4c;
                        }
                        input{
                            width:5.7rem;
                            height: .8rem;
                            line-height: .8rem;
                            border: 0;
                        }
                    }
                }
            }
            .tag{
                padding: .3rem .2rem 0 .2rem;
                background-color: #fff;
                overflow: hidden;
                margin: .2rem 0;
                label{
                    width: 2.11rem;
                    float: left;
                    letter-spacing: .2rem;
                }
                .tab-box{
                    margin-left: 2.11rem;
                    span{
                        padding: 0 .35rem;
                        font-size: .26rem;
                        color: #b2b2b2;
                        border: .02rem solid #b2b2b2;
                        border-radius: .2rem;
                        margin-bottom: .3rem;
                        display: inline-block;
                        &+span{
                            margin-left: .4rem;
                        }
                    }
                    .addTag{
                        margin-left: 0;
                    }
                }
            }
            .default{
                height: .8rem;
                line-height: .8rem;
                background-color: #fff;
                overflow: hidden;
                font-size: .22rem;
                color: #b2b2b2;
                padding: 0 .2rem;
            }
            .btns{
                padding: 0 .2rem;
                margin-top: 1.2rem;
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
            }
        }
    }
</style>