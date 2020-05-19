<template>
    <div class="addAddress">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="top">
                <ul>
                    <li><label>联 系 人</label><input type="text" v-model="linkMan" placeholder="请输入您的姓名"></li>
                    <li><label>手机号码</label><input type="text" v-model="phone" placeholder="请输入您的手机号码"></li>
                    <!--<li><label>所在地址</label><input type="text" readonly @click="showPopup" v-model="showAddr"></li>-->
                    <li><label>所在地址</label><input type="text" id="address-input" placeholder="请选择您的所在地址"></li>
                    <li><label>详细地址</label><input type="text" v-model="address" placeholder="例如：10楼108室"></li>
                </ul>
            </div>
            <div class="tag">
                <label>标 签</label>
                <div class="tab-box">
                    <span :class="lableId==item.id?'check':''" v-for="item in labels" @click="lableId=item.id"  :data-id="item.id">{{item.name}}</span>
                </div>
            </div>
            <div class="default">
                设为默认地址
                <div class="switch fr">
                    <el-switch v-model="setDefault"></el-switch>
                </div>
            </div>
            <div class="btns">
                <button @click="save()">保 存</button>
            </div>
            <div id="addsBox"></div>
            <!--<van-popup-->
                    <!--v-model="show"-->
                    <!--position="bottom"-->
                    <!--:style="{ height: '50%' ,padding:'16px'}"-->
            <!--&gt;-->
                <!--<van-area-->
                        <!--:area-list="areaList"-->
                        <!--:columns-placeholder="['请选择', '请选择', '请选择']"-->
                        <!--value="110000"-->
                        <!--title="选择地址"-->
                        <!--@change="changeAddr"-->
                        <!--@cancel="cancelChoose"-->
                        <!--@confirm="chooseThis"-->
                <!--/>-->
            <!--</van-popup>-->
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import addressData from '@/js/address.js'
    import AjaxPicker from 'ajax-picker'
    import { request, userRequest} from '@/js/request.js'
    import { Dialog } from 'vant'
    export default {
        name: "addAddress",
        data(){
            var title="新增收货地址";
            var page=this;
             var isEdit =page.$route.params.edit;
             console.log(page.$route.params);

             var linkMan="";
             var phone="";
             var showAddr='请选择您的所在地址'
             var address="";
             var lableId=1;
             var id=null;
             if(isEdit){
               title="编辑收货地址";
                var oldData=page.$route.params.address;
                id=oldData.id;
                linkMan=oldData.linkMan;
                phone=oldData.linkPhone;
                showAddr=oldData.fullAddress.split(oldData.address)[0];
                address=oldData.address;
                lableId=oldData.lableId;
             }
            this.loadAddressTag();
            return{
                aid:id,
                title:title,
                setDefault:false,
                linkMan:linkMan,
                phone:phone,
                show: false,  //是否显示弹出层
                detailAddress: '',  //绑定详细地址输入框
                areaList: addressData, //可选地址数据列表
                showAddr: showAddr,      //显示校区地址
                resAddr: '',       //传给后端的位置信息
                address:address,
                lableId:lableId,
                labels:[]
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
             loadAddressTag(){
                      var page=this;
                     userRequest("/userAddress/queryUserAddressLableList",{current: 0, pageSize: 0}).then(function (response) {
                                        page.labels=response
                          })
                },
            //选好地址后点击确定
            chooseThis () {
                this.show = false
                //选中地址成功后回显
                this.showAddr = this.resAddr[0].name + '-' + this.resAddr[1].name + '-' + this.resAddr[2].name
                if(this.showAddr.indexOf("请选择")>0){
                    Dialog({ message: '请完整的选择地址' });
                    this.showAddr =null;
                    return;
                }
                console.log(this.resAddr, '即将传给后端的省市区信息')
            },
            cancelChoose(){
                this.show = false
            },
            save(){
                var page=this;
                var id=page.aid;
                if(!id){
                    id=0;
                }

                if(!page.address){
                    Dialog({ message: '请填写地址' })
                    return;
                }
                if(page.address.length<3){
                    Dialog({ message: '请正确填写地址' })
                    return;
                }
                if(!page.showAddr){
                    Dialog({ message: '请选择所在省市区' })
                    return;
                }
                if(page.showAddr.length<3){
                    Dialog({ message: '请选择所在省市区' })
                    return;
                }
                var postData={ address: page.address,
                     fullAddress: page.showAddr+page.address,
                     id: id,
                     isDefault: page.setDefault?1:0,
                     lableId: page.lableId,
                     linkMan: page.linkMan,
                      linkPhone: page.phone,
                      cityCode :0,
                      countyCode :0,
                      provinceCode  :0,
                      townCode  :0,
                 }
                var phone=postData.linkPhone;
                if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(phone)){
                    Dialog({ message: '手机号不正确' })
                    return;
                }
                if(!postData.linkMan){
                    Dialog({ message: '请填写收货人' })
                    return;
                }
                if(postData.linkMan.length<2){
                    Dialog({ message: '请正确填写收货人' })
                    return;
                }

                userRequest("/userAddress/saveUserAddress",postData).then(function (response) {
                    Dialog({ message: "添加地址成功" })
                    console.log(page.$route.params)
                    if(page.$route.params.from=="confirmOrder"){

                        page.$router.push({name:"confirmOrder",params:{formCar:true,addId:response,order:page.$route.params.data}});
                    }else{
                        page.$router.push("setAddress");
                    }
                });

            },


        },
        mounted(){
            // 城市四级联动
            var picker = new AjaxPicker({
                title: '配送至', //选择器标题
                tipText: ['省份', '城市', '区/县','乡镇'],  //选择器提示语（可以一个也可以多个，对应每一栏的选择提示语）
                input: 'address-input', //点击触发选择器的input的id
                container: 'addsBox', //选择器的容器的id
                renderArr: [ //渲染函数数组，第一个函数对应第一个列表，以此类推，该数组中的函数数量和列表的数量一致
                    function () {
                        // 在这里写获取第一个列表数据的方法，通常是ajax
                        // 在成功回调中加入下面这行代码，并将获取的数据传入:
                        // picker.render(your data)
                        // 请确保你的获取到的数据是一个对象数组，并符合以下格式，每个对象至少拥有value(name)和id这两个key(将在用户选择完毕后返回)
                        // 如果data不是一个对象数组，或者不符合格式要求，那么你可能要做一下数据处理，才能保证数据成功渲染出来：
                        // [
                        //   {value或name: '北京市', id: '0', other: ...},
                        //   {value或name: '上海市', id: '1', other: ...},
                        //   {value: '广东省', id: '2', other: ...}
                        //   ...
                        // ]
                        // example:
                        // $.ajax({
                        //   ...
                        //   success: function (data) {
                        //     picker.render(data)
                        //   }
                        // })
                    },
                    function () {
                        // 在这里写获取第二个列表数据的方法
                        // 你可以通过picker.result1获取用户在第一列表的选择结果
                        // picker.result1长这样：
                        // {
                        //   value: 'XXX',
                        //   id:'XXX',
                        //   index: 'XXX'
                        // }
                        // 在成功回调中加入下面这行代码，并将获取到的数据传入:
                        // picker.render(your data)
                    },
                    function () {
                        // 在这里写获取第三个列表数据的方法
                        // 你可以通过picker.result2获取用户在第二列表的选择结果
                        // picker.result2长这样：
                        // {
                        //   value: 'XXX',
                        //   id:'XXX',
                        //   index: 'XXX'
                        // }
                        // 在成功回调中加入下面这行代码，并将获取到的数据传入:
                        // picker.render(your data)
                    },

                ],
                success: function (arr) {
                    // 用户选择完毕后调用，返回结果数组
                    console.log(arr)
                }
            })
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
                            background-color: transparent;
                        }
                    }
                }
            }
            .tag{
                padding: .3rem .2rem 0 .2rem;
                background-color: #fff;
                overflow: hidden;
                margin: .2rem 0;
                font-size: .26rem;
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
                    span.check{
                        color: red;
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
