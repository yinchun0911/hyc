import axios from 'axios'
import Vue from 'vue'
import { Dialog } from 'vant'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true;
import router   from '../router'



export function userRequest(url, params){
     params.appUserId= localStorage.getItem("userId");
     params.token= localStorage.getItem("token");
     if(params.noError&&params.appUserId==null){
              if(typeof params.defaultFn=="function"){
                     params.defaultFn();
              }
     }
     params.needUser=true;
    return request(url, params);
}
export function getRemotHost(){
       return Vue.prototype.APIHOST;
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
        let config=null;
        if (url.indexOf("/file/upload")>0){
            config={
                headers:{
                    'Content-Type':'application/text/html;charset=utf-8'      //改这里就好了
                }
            }
        }
        axios.post(url, data,config)
            .then(res => {
                        if(res.data.code=="200"){
                            resolve(res.data.data);
                        }else if(typeof params.defaultFn=="function"){
                            params.defaultFn();
                        }else{
                            Dialog({ message: res.data.msg })
                            if("请先登录惠原仓"==res.data.msg){
                                router.push({name:"login"});
                            }

                        }
            })
            .catch(err => {
                reject(err.data)
            })
    });

}


export function getrequest(url, params) {
    var data=null;
    if(url.indexOf("http")!=0){
        url=Vue.prototype.APIHOST+url
    }

    return new Promise((resolve, reject) => {

        axios.get(url, {params:params})
            .then(res => {
                if(url.indexOf("http")!=0){
                    resolve(res);
                }else if(res.data.code=="200"){
                    resolve(res.data.data);
                }else if(typeof params.defaultFn=="function"){
                    params.defaultFn();
                }else{
                    Dialog({ message: res.data.msg })
                    if("请先登录惠原仓"==res.data.msg){
                        router.push({name:"login"});
                    }

                }
            })
            .catch(err => {
                reject(err.data)
            })
    });

}

