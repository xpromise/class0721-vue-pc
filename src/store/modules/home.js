// home组件的vuex状态
import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors } from "@api/home";

export default {
  state: {
    categoryList: [], // 首页三级分类列表数据
    banners: [], // 首页轮播图数据
    floors: [], // 首页楼层数据
  },
  getters: {},
  actions: {
    // 获取首页三级分类列表数据
    async getCategoryList({ commit }) {
      // 发送请求
      const categoryList = await reqGetBaseCategoryList();
      // 触发mutation函数
      commit("GET_CATEGORY_LIST", categoryList);
    },

    // async函数会返回一个promise对象
    // 这个promise对象：当内部代码全部执行完毕时，会变成成功
    async getBanners({ commit }) {
      // console.log("actions");
      const banners = await reqGetBanners();
      // 调用commit 同步调用mutation函数
      commit("GET_BANNERS", banners);
    },

    async getFloors({ commit }) {
      const floors = await reqGetFloors();
      commit("GET_FLOORS", floors);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GET_BANNERS(state, banners) {
      // console.log("mutation");
      state.banners = banners;
    },
    GET_FLOORS(state, floors) {
      state.floors = floors;
    },
  },
};
