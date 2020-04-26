<template>
    <div class="setAddress">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="top" v-for="address in addressList">
                <h2>{{address.linkMan}}<span>{{address.linkPhone}}</span><b>{{labels[address.lableId]}}</b><i class="el-icon-edit" @click="goTo('addAddress',{edit:true,address:address})"></i></h2>
                <p> {{address.fullAddress}}</p>
                <div><el-checkbox v-model="address.isDefault==1" @change="setDefault(address.id,address.isDefault==1)"   >设为默认</el-checkbox> <i @click="deleteAddr(address)" class="el-icon-delete"></i></div>
            </div>
            <div class="btns">
                <button @click="goTo('addAddress')"><i class="el-icon-plus"></i>添加地址</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest} from '@/js/request.js'
    export default {
        name: "setAddress",
        data(){
            this.loadAddressTag();
            return{
                title:'收货地址',
                checked:false,
                labels:{},
                addressList:[]
            }
        },
        methods:{
             loadAddress(){
                        var page=this;
                       userRequest("/userAddress/queryUserAddressList",{current: 0, pageSize: 0}).then(function (response) {
                                        page.addressList=response;
                                        console.log(response)
                        })

              },
              loadAddressTag(){
                          var page=this;
                         userRequest("/userAddress/queryUserAddressLableList",{current: 0, pageSize: 0}).then(function (response) {
                                        for(var item in response){
                                          page.labels[response[item].id]=response[item].name;
                                        }
                                        page. loadAddress();
                          })
                },
                deleteAddr(address){
                    var page=this;
                    userRequest("/userAddress/deleteUseAddress",{addressId: address.id}).then(function (response) {
                        page.addressList=[];
                        page.loadAddress();
                    });
                },
              setDefault(id,isDefault){
                 console.log(id);
                 if(isDefault==0){
                    isDefault=1
                 }else{
                    isDefault=0
                 }
                 var page=this;
                 userRequest("/userAddress/saveUserDefaultAddress",{addressId: id,isDefault:isDefault}).then(function (response) {
                           page.addressList=[];
                           page.loadAddress();
                });
              },
             goTo(path,params){
                    if(params){
                        this.$router.push({name:path,params:params});
                    }else{
                        this.$router.push(path);
                    }
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
                margin-bottom: .2rem;
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