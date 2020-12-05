import request from "@utils/request";

// 获取所有购物车数据
export const reqGetCartList = () => {
	return request({
		method: "GET",
		url: `/cart/cartList`,
	});
};

// 添加、减少购物车商品数量
export const reqUpdateCartCount = (skuId, skuNum) => {
	return request({
		method: "POST",
		url: `/cart/addToCart/${skuId}/${skuNum}`,
	});
};

// 切换商品选中状态
export const reqUpdateCartCheck = (skuId, isChecked) => {
	return request({
		method: "GET",
		url: `/cart/addToCart/${skuId}/${isChecked}`,
	});
};

// 删除商品
export const reqDelCart = (skuId) => {
	return request({
		method: "DELETE",
		url: `/cart/deleteCart/${skuId}`,
	});
};
