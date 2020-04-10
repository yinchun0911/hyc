import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import common from '@/js/common.js'
import cookie from '@/js/cookie.js'
/**jquery及相关**/
import  '@/assets/libs/jQuery.forceCache.js'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.prototype.cookie = cookie

Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(common);

Vue.prototype.APIHOST = process.env.NODE_ENV === 'production' ? '//10.1.3.239:12315' : '/apis'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
