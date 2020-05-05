import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Classification from '../views/Classification/Home.vue'
import Notice from '../views/Notice.vue'
import Information from '../views/Information.vue'
import List from '../views/Classification/List.vue'
import Details from '../views/Classification/Details.vue'
import ConfirmOrder from '../views/Classification/ConfirmOrder.vue'
import SelectCardRoll from '../views/Classification/SelectCardRoll.vue'
import OrderDetails from '../views/Classification/OrderDetails.vue'

import Shopping from '../views/Shopping/Home.vue'
import SuccessPayment from '../views/Shopping/SuccessPayment.vue'
import FailPayment from '../views/Shopping/FailPayment.vue'
import My from '../views/My/Home.vue'
import Order from '../views/My/Order.vue'
import Ticket from '../views/My/Ticket.vue'
import PaymentHistory from '../views/My/PaymentHistory.vue'
import Collection from '../views/My/Collection.vue'
import Proposal from '../views/My/Proposal.vue'
import Problem from '../views/My/Problem.vue'
import Setup from '../views/My/Setup.vue'
import SetAddress from '../views/My/SetAddress.vue'
import AddAddress from '../views/My/AddAddress.vue'
import AccountSet from '../views/My/AccountSet.vue'
import AccountSecurity from '../views/My/AccountSecurity.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path:'/login',
    name:'login',
    component:Login,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path:'/notice',
    name:'notice',
    component:Notice,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path:'/information',
    name:'information',
    component:Information,
    meta: {
      title: '惠原仓'
    }
  },
    //分类
  {
    path: '/classification',
    name: 'classification',
    component: Classification,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/classification/list',
    name: 'list',
    component: List,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/classification/details',
    name: 'detail',
    component: Details,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/classification/confirmOrder',
    name: 'confirmOrder',
    component: ConfirmOrder ,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/classification/selectCardRoll',
    name: 'selectCardRoll',
    component: SelectCardRoll,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/classification/orderDetails',
    name: 'orderDetails',
    component: OrderDetails,
    meta: {
      title: '订单详情'
    }

  },
    // 购物车
  {
    path: '/Shopping',
    name: 'Shopping',
    component: Shopping,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/successPayment',
    name: 'successPayment',
    component: SuccessPayment,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/failPayment',
    name: 'failPayment',
    component: FailPayment,
    meta: {
      title: '惠原仓'
    }
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    component: My,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: Ticket,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/paymentHistory',
    name: 'paymentHistory',
    component: PaymentHistory,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/proposal',
    name: 'proposal',
    component: Proposal,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/problem',
    name: 'problem',
    component: Problem,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/setup',
    name: 'setup',
    component: Setup,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/setAddress',
    name: 'setAddress',
    component: SetAddress,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: AddAddress,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/accountSet',
    name: 'accountSet',
    component: AccountSet,
    meta: {
      title: '惠原仓'
    }
  },
  {
    path: '/accountSecurity',
    name: 'accountSecurity',
    component: AccountSecurity,
    meta: {
      title: '惠原仓'
    }
  }
]

const router = new VueRouter({
  mode: 'history',

  routes
});
router.beforeEach((to, from, next) => {
    console.log("to",to.path,"from",from.path)
    if (to.meta.title) {
      document.title = to.meta.title
    }
    console.log(to.path=="/classification/confirmOrder"&&(from.path=="/classification/selectCardRoll" || from.path=="/"));
     if(to.path=="/classification/confirmOrder"&&(from.path=="/classification/selectCardRoll" || from.path=="/")){
       next("/")

     }  else   if(to.path=="/successPayment"&&(from.path!="/classification/selectCardRoll")){
       next("/")

     }else if(to.path=="/classification/selectCardRoll"&&(from.path!="/classification/confirmOrder"&&from.path!="/order")){
       next("/")
     }else if(from.path=="/login"&& to.path!="/"){
       next("/")
     }else{
       next();
     }

})

export default router
