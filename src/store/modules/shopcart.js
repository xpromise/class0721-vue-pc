import {
	reqGetCartList,
	reqUpdateCartCheck,
	reqUpdateCartCount,
	// reqDelCart,
} from "@api/shopcart";

export default {
	state: {
		cartList: [], // 所有购物车数据
	},
	getters: {},
	actions: {
		async getCartList({ commit }) {
			const cartList = await reqGetCartList();
			commit("GET_CART_LIST", cartList);
		},
		async updateCartCount({ commit }, { skuId, skuNum }) {
			await reqUpdateCartCount(skuId, skuNum);
			console.log(commit);
		},

		// actions函数只能接受外面的一个参数
		// this.updateCartCheck(a, b) 第二个参数b actions函数是接受不到的
		async updateCartCheck({ commit }, { skuId, isChecked }) {
			// 发送请求 --> 更新服务器数据
			await reqUpdateCartCheck(skuId, isChecked);
			// 1. 手动更新vuex的数据 --> 页面就会重新渲染
			// 2. 重新请求所有购物车数据
			console.log(commit);
		},
	},
	mutations: {
		GET_CART_LIST(state, cartList) {
			state.cartList = cartList;
		},
	},
};
