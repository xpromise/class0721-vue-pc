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

    async getBanners({ commit }) {
      const banners = await reqGetBanners();
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
      state.banners = banners;
    },
    GET_FLOORS(state, floors) {
      state.floors = floors;
    },
  },
};
