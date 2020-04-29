<template>
  <div class="home">
    <SearchHeader @sweepCodeClick="sweepCodeClick" @msgEventClick="msgEventClick" :badgeNum="msgNum" @searchClick="searchClick"></SearchHeader>
    <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <template v-for="(swiper,index) in swiperList">
                <van-swipe-item :data-url="swiper.jumpUrl">
                    <img :src="swiper.carouselPic"  @click="goByPathTo(swiper.jumpUrl)" alt="">
                </van-swipe-item>
            </template>
        </van-swipe>
    </div>
    <div class="content">
      <h2>惠原仓政企职工生活服务平台</h2>
      <div class="nav">
        <ul>
          <li v-for="item in navList" :data-link="item.menuLink" @click="goByPathTo(item.menuLink)" ><img :src="item.menuIcon" alt="">{{item.menuName}}</li>
        </ul>
      </div>
      <div class="main">
        <img @click="goByPathTo('list',{areaID:special1.activityAreaID})" :src="special1.activityAreaPic" alt="">
        <img @click="goByPathTo('list',{areaID:special2.activityAreaID})" :src="special2.activityAreaPic"alt="">
      </div>
      <div class="more-box">
        <img @click="goByPathTo('list',{areaID:special3.activityAreaID})" :src="special3.activityAreaPic" alt="">
      </div>


<template v-for="(special,index) in specialArea">
    <div class="specialArea" :id="special.activityAreaID">
            <h3><img src="../assets/images/icon-04.png" alt="">{{ special.activityAreaName }}<span  @click="goTo('list',{areaID:special.activityAreaID})">更多&gt;</span></h3>
            <div class="areaBanner">
              <img @click="goByPathTo('list',{areaID:special.activityAreaID})" :src="special.activityAreaPic" alt="">
            </div>
            <ul>
            <template v-for="(item,index) in special.indexActivityAreaDataList">
              <li @click="goByPathTo('detail',{productID:item.productID})">
                <img :src="item.activityAreaProductPic" alt="">
                <p class="title">{{item.activityAreaProductName}}</p>
                <p class="introduce">{{item.activityAreaProductRemark}}</p>
              </li>
                <li @click="goByPathTo('detail',{productID:item.productID})">
                    <img :src="item.activityAreaProductPic" alt="">
                    <p class="title">{{item.activityAreaProductName}}</p>
                    <p class="introduce">{{item.activityAreaProductRemark}}</p>
                </li>
              </template>
            </ul>
    </div>
</template>
</div>
    <Footer :shoppingNum="shoppingNum"></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchHeader from '@/components/SearchHeader.vue'
import Footer from '@/components/Footer.vue'
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import {getrequest, request, userRequest} from '@/js/request.js'
import wx from "weixin-js-sdk";
export default {
  name: 'Home',
  data(){
    this.getSwiperData();
    this.getNavData();
    this.getSpecialArea();
    this.getMsgNum();
    return{
      swiperList:[],
      navList:[],
      special1:{},
      special2:{},
      special3:{},
      specialArea:[],
      specialTop:[],
      msgNum:0,
      shoppingNum:0
    }
  },

  methods:{

    getMsgNum(){
        var page=this;
        var postData={noError:true,defaultFn:function(){
                 console.log("defaultProcess")
                 page.msgNum=0;
            }
        }
        userRequest("/shopIndex/queryIndexMessageCount",postData).then(function (response) {
              page.msgNum=response;
        })
    },


    getSwiperData(){
       //获取轮播图
      var page=this;
      request("/shopIndex/queryIndexCarousel",null).then(function (response) {
        page.swiperList=response;

       })
    },
    getNavData(){
        //导航
        var page=this;
         request("/shopIndex/queryIndexMenu",null).then(function (response) {
            page.navList=response;
         })
    },
      getSpecialArea(){
            var page=this;
             request("/shopIndex/queryIndexActivityArea",null).then(function (response) {
                page.special1=response[0];
                page.special2=response[1];
                page.special3=response[2];
                var area=[]
                for(var i=3;i<response.length;i++){
                    area.push(response[i]);
                }
                console.log(area)
                page.specialArea=area;
               })
        },

    // 扫一扫
    sweepCodeClick(){
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                console.log(res)
            }
        });
    },
    // 信息按钮
    msgEventClick(){
       this.goTo("information")
    },
    //搜索按钮
    searchClick(val){

    },
      initWechat(){
          var href=window.location.href.split("?")[0];
          getrequest("/wechat/wxconfig", {url:href}).then(function (res) {
              console.log(res);
              var appId = res.data.data.appId;
              var noncestr = res.data.data.nonceStr;
              var jsapi_ticket = res.data.data.jsapi_ticket;
              var timestamp = res.data.data.timestamp;
              var signature = res.data.data.signature;
              wx.config({
                  debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: appId, //必填，公众号的唯一标识
                  timestamp: timestamp, // 必填，生成签名的时间戳
                  nonceStr: noncestr, //必填，生成签名的随机串
                  signature: signature,// 必填，签名，见附录1
                  jsApiList: ['scanQRCode','chooseWXPay', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'getLocation', 'openLocation'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
              });
              wx.ready(()=>{
                  console.log("init  success");
              });
              wx.error(function(res){
                  console.log("init 失败",res)
              });


          });


      },
    goByPathTo(path,params){
        if(path.indexOf("http")==0){
            window.location.href=path;
            return;
        }
            if(params){
                this.$router.push({name:path,query:params});
            }else{
                this.$router.push({path:path});
            }
    },
     goTo(path,params){
         if(path.indexOf("http")!=-1){
             window.location.href=path;
         }else
        if(params){
            this.$router.push({name:path,params:params});
        }else{
            this.$router.push(path);
        }
    }
  },


  mounted() {
      this.initWechat();
  },
  components: {
    SearchHeader,
    Footer
  }
}
</script>

<style lang="less">
  .home{
    .banner{
      width: 100%;
      height: 1.82rem;
      background-color: #7fb1f7;
      padding: 0 .2rem;
        margin-top: .88rem;
      .my-swipe{
        display: block;
        width: 100%;
        height: 3rem;
          .van-swipe-item{
              height: 3rem;
              img{
                  width: 7.1rem;
                  height: 3rem;
              }
          }
      }
    }
    .content{
      background-color: #f0f3fa;
      padding: 1.18rem .2rem .2rem .2rem;
      margin-bottom: 1rem;
      h2{
        height: .8rem;
        line-height: .8rem;
        background-color: #fff;
        margin-top: .2rem;
        border-radius: .2rem;
        text-align: center;
        font-size: .3rem;
        color: #4c4c4c;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          left: 1rem;
          top: 50%;
          width: .56rem;
          height: .48rem;
          margin-top: -.2rem;
          background: url("../assets/images/icon-03.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .nav{
        background-color: #fff;
        border-radius: .2rem;
        height: 2.06rem;
        margin-top: .2rem;
        padding-top: .55rem;
        ul{
          display: flex;
          justify-content: space-between;
          li{
            width: 20%;
            text-align: center;
              font-size: .26rem;
              color: #4c4c4c;
            img{
              display: block;
              width: .7rem;
              height: .67rem;
              margin: 0 auto .25rem auto;
            }
          }
        }
      }
      .main{
        margin-top: .2rem;
        display: flex;
        justify-content: space-between;
        img{
          width: 3.45rem;
          height: 1.5rem;
        }
      }
      .more-box{
          width: 100%;
        margin-top: .65rem;
        font-size: 0;
        display: inline-block;
        text-align: center;
        img{
          width: 6.26rem;
          height: 2.82rem;
        }
      }
      .specialArea{
        margin-top: .2rem;
        background-color: #fff;
        border-radius: .2rem;
        h3{
          height: .8rem;
          line-height: .8rem;
          padding-right: .2rem;
          padding-left: 1rem;
          text-align: center;
          font-size: .3rem;
          color: #4c4c4c;
          border-bottom: .02rem solid #f0f3fa;
          position: relative;
          /*&:before{*/
          /*  content: '';*/
          /*  position: absolute;*/
          /*  left: 35%;*/
          /*  top: 50%;*/
          /*  width: .41rem;*/
          /*  height: .40rem;*/
          /*  margin-top: -.2rem;*/
          /*  background: url("../assets/images/icon-04.png") no-repeat;*/
          /*  background-size: 100% 100%;*/
          /*}*/
            img{
                width: .41rem;
                height: .40rem;
                margin-right: .15rem;
            }
          span{
            float: right;
            font-size: .24rem;
            color:#83b7ff;
          }
        }
        /*.recharge{*/
        /*  &:before{*/
        /*    background: url("../assets/images/icon-05.png") no-repeat;*/
        /*    background-size: 100% 100%;*/
        /*  }*/
        /*}*/
        .areaBanner{
          padding: .2rem;
          img{
            width: 100%;
          }
        }
        ul{
            width: 100%;
            overflow-y: hidden;
            overflow-x: auto;
          display: flex;
          justify-content: space-between;
          padding: .2rem .2rem 0 .2rem;
          li{
            width: 31%;
              &+li{
                  margin-left: .2rem;
              }
            img{
              width: 2.1rem;
            }
            .title{
              font-size: .26rem;
              color: #4c4c4c;
              margin-top: .15rem;
            }
            .introduce{
              font-size: .22rem;
              color: #b2b2b2;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding: .1rem 0;
            }
          }
        }
      }
    }
  }

</style>
