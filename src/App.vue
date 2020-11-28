<template>
  <div>
    <Header />
    <!-- 加载显示当前路由组件 -->
    <router-view></router-view>
    <!-- 当不是登录或者注册时就显示 -->
    <!-- <Footer v-if="isFooterShow" /> -->
    <!-- <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" /> -->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>

<script>
import Header from "@comps/Header";
import Footer from "@comps/Footer";

export default {
  name: "App",
  // data() {
  //   return {
  //     isFooterShow: true,
  //   };
  // },
  components: {
    Header,
    Footer,
  },
  // watch: {
  //   $route: {
  //     handler(newVal) {
  //       this.isFooterShow =
  //         newVal.path !== "/login" && newVal.path !== "/register";
  //     },
  //     immediate: true, // 一上来触发
  //   },
  // },
};
</script>

<style lang="less" scoped>
</style>