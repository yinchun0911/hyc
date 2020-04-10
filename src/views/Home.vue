<template>
  <div class="home">
    <SearchHeader @sweepCodeClick="sweepCodeClick" @msgEventClick="msgEventClick" @searchClick="searchClick"></SearchHeader>
    <div class="banner">
      <div class="swiper-container" id="gallery">
        <div class="swiper-wrapper">
          <div class="swiper-slide item_1"></div>
          <div class="swiper-slide item_2"></div>
          <div class="swiper-slide item_1"></div>
          <div class="swiper-slide item_2"></div>
          <div class="swiper-slide item_1"></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="content">
      <h2>惠原仓政企职工生活服务平台</h2>
      <div class="nav">
        <ul>
          <li v-for="item in navList"><img :src="item.src" alt="">{{item.name}}</li>
        </ul>
      </div>
      <div class="main">
        <img src="../assets/images/main-01.png" alt="">
        <img src="../assets/images/main-02.png" alt="">
      </div>
      <div class="more-box">
        <img src="../assets/images/main-03.png" alt="">
      </div>
      <div class="specialArea">
        <h3>电影专区<span>更多&gt;</span></h3>
        <div class="areaBanner">
          <img src="../assets/images/specialArea-01.jpg" alt="">
        </div>
        <ul>
          <li>
            <img src="../assets/images/specialArea-list-01.jpg" alt="">
            <p class="title">福冈</p>
            <p class="introduce">海骁和宰文大学时海骁和宰文大学时海骁和宰文大学时</p>
          </li>
          <li>
            <img src="../assets/images/specialArea-list-02.jpg" alt="">
            <p class="title">北京女子图鉴</p>
            <p class="introduce">讲述了整容医生陈讲述了整容医生陈讲述了整容医生陈</p>
          </li>
          <li>
            <img src="../assets/images/specialArea-list-03.jpg" alt="">
            <p class="title">优点</p>
            <p class="introduce">暂无简述</p>
          </li>
        </ul>
      </div>
      <div class="specialArea">
        <h3 class="recharge">充值专区<span>更多&gt;</span></h3>
        <div class="areaBanner">
          <img src="../assets/images/specialArea-02.jpg" alt="">
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchHeader from '@/components/SearchHeader.vue'
import Footer from '@/components/Footer.vue'
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
export default {
  name: 'Home',
  data(){
    return{
      navList:[
        {
          src:require('../assets/images/nav-icon-01.png'),
          name:'优选商城'
        },
        {
          src:require('../assets/images/nav-icon-02.png'),
          name:'惊喜礼包'
        },
        {
          src:require('../assets/images/nav-icon-03.png'),
          name:'蛋糕甜点'
        },
        {
          src:require('../assets/images/nav-icon-04.png'),
          name:'文娱热映'
        },
        {
          src:require('../assets/images/nav-icon-05.png'),
          name:'快乐阅读'
        }
      ]
    }
  },
  methods:{
    // 扫一扫
    sweepCodeClick(){
      console.log('扫一扫')
    },
    // 信息按钮
    msgEventClick(){
      console.log('信息按钮')
    },
    //搜索按钮
    searchClick(val){
      console.log(val)
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
          &:before{
            content: '';
            position: absolute;
            left: 35%;
            top: 50%;
            width: .41rem;
            height: .40rem;
            margin-top: -.2rem;
            background: url("../assets/images/icon-04.png") no-repeat;
            background-size: 100% 100%;
          }
          span{
            float: right;
            font-size: .24rem;
            color:#83b7ff;
          }
        }
        .recharge{
          &:before{
            background: url("../assets/images/icon-05.png") no-repeat;
            background-size: 100% 100%;
          }
        }
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
