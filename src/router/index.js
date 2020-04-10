import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Classification from '../views/Classification/Home.vue'
import List from '../views/Classification/List.vue'
import Details from '../views/Classification/Details.vue'
import ConfirmOrder from '../views/Classification/ConfirmOrder.vue'
import SelectCardRoll from '../views/Classification/SelectCardRoll.vue'
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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
    //分类
  {
    path: '/classification',
    name: 'classification',
    component: Classification
  },
  {
    path: '/classification/list',
    name: 'list',
    component: List
  },
  {
    path: '/classification/details',
    name: 'detail',
    component: Details
  },
  {
    path: '/classification/confirmOrder',
    name: 'confirmOrder',
    component: ConfirmOrder
  },
  {
    path: '/classification/selectCardRoll',
    name: 'selectCardRoll',
    component: SelectCardRoll
  },
    // 购物车
  {
    path: '/Shopping',
    name: 'Shopping',
    component: Shopping
  },
  {
    path: '/successPayment',
    name: 'successPayment',
    component: SuccessPayment
  },
  {
    path: '/failPayment',
    name: 'failPayment',
    component: FailPayment
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    component: My
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/ticket',
    name: 'ticket',
    component: Ticket
  },
  {
    path: '/paymentHistory',
    name: 'paymentHistory',
    component: PaymentHistory
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/proposal',
    name: 'proposal',
    component: Proposal
  },
  {
    path: '/problem',
    name: 'problem',
    component: Problem
  },
  {
    path: '/setup',
    name: 'setup',
    component: Setup
  },
  {
    path: '/setAddress',
    name: 'setAddress',
    component: SetAddress
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: AddAddress
  },
  {
    path: '/accountSet',
    name: 'accountSet',
    component: AccountSet
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
