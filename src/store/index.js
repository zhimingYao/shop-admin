import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import order from './modules/order'
import voucher from './modules/voucher.js'
import spike from "./modules/spike.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  // vuex模块化
  // modules 赋值 对象
  // key:自定义模块化名字
  // value 对象{state,actions,mutaions}
  modules: {
    app,
    permission,
    settings,
    user,
    order,
    voucher,
    spike,
    // wjh:{
    //   state,
    //   namespaced?,
    //   mutations,
    //   actions:{
    //     // store.dispatch('wjh/a')
    //     a(){
    //     }
    //   },
    //   getters?,
    //   modules?
    // }
  },
  getters
})

export default store
