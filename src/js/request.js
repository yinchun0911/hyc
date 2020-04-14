import axios from 'axios'
import Vue from 'vue'

export function get(url, params) {
        var data=null;

      if(url.indexOf("http")!=0){
        url=Vue.prototype.APIHOST+url
      }

    return new Promise((resolve, reject) => {

        axios.get(url, {

            params: params

        }).then(res => {

            if(res.data.code=="200"){
                                       resolve(res.data.data);
                   }

        }).catch(err => {

            reject(err.data)

        })

    });

}
export function userRequest(url, params){
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
                        }
            })
            .catch(err => {
                reject(err.data)
            })
    });

}