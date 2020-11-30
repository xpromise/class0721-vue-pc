// @ts-nocheck
import Vue from "vue";
import App from "./App";

import router from "./router";
import store from "./store";

import "./plugins/element.js";

// 引入mockServer，为了加载里面代码
// 里面代码一旦加载，就去启动mock服务器，从而拦截相应的请求
import './mock/mockServer';

// 引入公共资源
import "./styles/reset.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 应用router
  router,
  store,
}).$mount("#app");
