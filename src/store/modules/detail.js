// detail组件的vuex状态
import { reqGetProductDetail } from "@api/detail";

export default {
	state: {
		productDetail: {
			categoryView: {}, // 分类数据
			skuInfo: {
				skuImageList: [],
			}, // 商品详情数据
			spuSaleAttrList: [], // 商品选择属性数据列表
		},
	},
	getters: {
		categoryView(state) {
			return state.productDetail.categoryView;
		},
		skuInfo(state) {
			return state.productDetail.skuInfo;
		},
		spuSaleAttrList(state) {
			return state.productDetail.spuSaleAttrList;
		},
	},
	actions: {
		async getProductDetail({ commit }, id) {
			const productDetail = await reqGetProductDetail(id);
			commit("GET_PRODUCT_DETAIL", productDetail);
		},
	},
	mutations: {
		GET_PRODUCT_DETAIL(state, productDetail) {
			state.productDetail = productDetail;
		},
	},
};
