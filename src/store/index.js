import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function deepClone (obj) {
  var newObj = undefined;
  switch (typeof obj) {
    case 'number':
      newObj = NaN;
      break;
    case 'string':
      newObj = '';
      break;
    case 'boolean':
      newObj = undefined;
      break;
    case 'object':
      newObj = obj instanceof Array ? [] : {};
      break;
  }
  return newObj;
}
export default new Vuex.Store({
  state:{
    isAdmin:false,
    navShowHide:false,
    noCompany:false,
    flag:false,
    is_requesting_companeyList:false,
    dialogVisible: false,
    localStorageIsSync:false,

  },
  mutations:{
    set_state(state,[key,value]){
      state[key] = value;
      localStorage.setItem(key,JSON.stringify({
        value: value,
        is_store: true
      }));
    },
    set_localStorageToState(state,[key,value]){
      state[key] = value;
    }
  },
  getters:{

  },
  actions:{
    localStorageToStore({commit,state}){
      if(state.localStorageIsSync){
        return false;
      }
      for(var key in localStorage){
        var value = {};
        try{
          value = JSON.parse(localStorage[key]);
        } catch(e) {}
        if (value.is_store) {
          commit('set_localStorageToState',[key,value.value]);
        }
      }
      commit('set_localStorageToState',['localStorageIsSync',true]);
    },
    clearLocalStorage({commit,state}) {
      console.log('clearLocalStorage start');
      for(var key in localStorage) {
        var value = {};
        try{
          value = JSON.parse(localStorage[key]);
        } catch(e) {}
        if (value.is_store) {
          localStorage.removeItem(key);
          commit('set_localStorageToState',[key,deepClone(state[key])])
        }
      }
    },
  },
})
