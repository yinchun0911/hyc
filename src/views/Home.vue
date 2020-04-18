<template>
  <div class="home">
    <SearchHeader @sweepCodeClick="sweepCodeClick" @msgEventClick="msgEventClick" :badgeNum="msgNum" @searchClick="searchClick"></SearchHeader>
    <div class="banner">
      <div class="swiper-container" id="gallery">
        <div class="swiper-wrapper">

        <template v-for="(swiper,index) in swiperList">
          <div class="swiper-slide" :data-url="swiper.jumpUrl">
            <img :src="swiper.carouselPic" alt="">
          </div>
       </template>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="content">
      <h2>惠原仓政企职工生活服务平台</h2>
      <div class="nav">
        <ul>
          <li v-for="item in navList" :data-link="item.menuLink"><img :src="item.menuIcon" alt="">{{item.menuName}}</li>
        </ul>
      </div>
      <div class="main">
        <img @click="goTo('list',{areaID:special1.activityAreaID})" :src="special1.activityAreaPic" alt="">
        <img @click="goTo('list',{areaID:special2.activityAreaID})" :src="special2.activityAreaPic"alt="">
      </div>
      <div class="more-box">
        <img @click="goTo('list',{areaID:special3.activityAreaID})" :src="special3.activityAreaPic" alt="">
      </div>


<template v-for="(special,index) in specialArea">
    <div class="specialArea" :id="special.activityAreaID">
            <h3><img src="../assets/images/icon-04.png" alt="">{{ special.activityAreaName }}<span  @click="goTo('list',{areaID:special.activityAreaID})">更多&gt;</span></h3>
            <div class="areaBanner">
              <img @click="goTo('list',{areaID:special.activityAreaID})" :src="special.activityAreaPic" alt="">
            </div>
            <ul>
            <template v-for="(item,index) in special.indexActivityAreaDataList">
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
import { request, userRequest} from '@/js/request.js'
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
      console.log('扫一扫')
    },
    // 信息按钮
    msgEventClick(){
       this.goTo("information")
    },
    //搜索按钮
    searchClick(val){
      console.log(val)
      this.goTo('list',{keyword:val})
    },
    goByPathTo(path,params){
            if(params){
                this.$router.push({name:path,query:params});
            }else{
                this.$router.push(path);
            }
    },
     goTo(path,params){
        if(params){
            this.$router.push({name:path,params:params});
        }else{
            this.$router.push(path);
        }
    }
  },


  mounted() {
    var gallerySwiper = new Swiper('#gallery', {
      spaceBetween: 10,
      effect : 'fade',
      paginationClickable: true,
      autoplay: {
        delay: 2000,//2秒切换一次
        disableOnInteraction: false,
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable :true,
      },
    });
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
      .swiper-slide{
        display: block;
        width: 7.1rem;
        height: 3rem;
        img{
          width: 100%;
        }
      }
      .item_1{
        background: url('../assets/images/banner.png') no-repeat center 0;
        background-size: 100% 100%;
      }
      .item_2{
        background: url('../assets/images/banner.png') no-repeat center 0;
        background-size: 100% 100%;
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
        padding-left: 1.08rem;
        font-size: .3rem;
        color: #4c4c4c;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          left: .3rem;
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
          display: flex;
          justify-content: space-between;
          padding: .2rem .2rem 0 .2rem;
          li{
            width: 33.3%;
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
