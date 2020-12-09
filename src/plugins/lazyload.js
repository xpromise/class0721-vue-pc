/*
  https://github.com/hilongjw/vue-lazyload

  1. 安装
    yarn add vue-lazyload
  2. 配置
    plugins/lazyload.js
  3. main.js 引入  
  4. 使用
    将图片的src属性改成v-lazy

*/
import Vue from "vue";
import VueLazyload from "vue-lazyload";
import loading from "../assets/imgs/loading.gif";

Vue.use(VueLazyload, {
	// loading: "../assets/imgs/loading.gif", // 不行，不能当做图片解析
	loading: loading,
});
