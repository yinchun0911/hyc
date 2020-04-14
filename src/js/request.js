import axios from 'axios'
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/json'
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