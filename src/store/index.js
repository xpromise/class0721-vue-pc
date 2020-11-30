import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";


Vue.use(Vuex);

// 储存状态数据容器
const state = {
  // testCount: 0,
};

// 储存只读计算属性数据容器
const getters = {};

// 包含n个用来间接修改state的函数对象
const actions = {};

// 包含n个用来直接修改state的函数对象
const mutations = {};

/* 
  vuex管理的数据：
  {
    testCount: 0, // 总数据
    home: { // 其他模块数据
      categoryList: []
    },
    login: {

    }
  }
*/
export default new Vuex.Store({
  state, // 总state
  getters, // 总getters
  actions, // 总actions
  mutations, // 总mutations
  modules, // 其他vuex模块的数据

  // modules: {
  //   home: { // home的vuex数据
  //     state: {},
  //     getters: {},
  //     actions: {},
  //     mutations: {}
  //   },
  //   login: { // login的vuex数据
  //     state: {},
  //     getters: {},
  //     actions: {},
  //     mutations: {}
  //   }
  // }
});
