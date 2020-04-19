import axios from 'axios'
import Vue from 'vue'
import { Dialog } from 'vant'
axios.defaults.headers.post['Content-Type'] = 'application/json'

import { router }  from '@/router/index.js'

export function userRequest(url, params){
     params.appUserId=sessionStorage.getItem("userId");
     params.token=sessionStorage.getItem("token");
     if(params.noError&&params.appUserId==null){
              if(typeof params.defaultFn=="function"){
                     params.defaultFn();
              }
     }
     params.needUser=true;
    return request(url, params);
}
export function request(url, params) {
       var data=null;
        if(params!=null){
            data=JSON.stringify(params)
        }
      if(url.indexOf("http")!=0){
        url=Vue.prototype.APIHOST+url
      }

    return new Promise((resolve, reject) => {

        axios.post(url, data)
            .then(res => {
                        if(res.data.code=="200"){
                            resolve(res.data.data);
                        }else if(typeof params.defaultFn=="function"){
                            params.defaultFn();
                        }else{
                            Dialog({ message: res.data.msg })
                            if("请先登录惠原仓"==res.data.msg){
                            //无法跳转
                                router.push({name:"login"});
                            }

                        }
            })
            .catch(err => {
                reject(err.data)
            })
    });

}