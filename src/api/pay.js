import request from "@utils/request";

// 获取订单信息列表
export const reqGetTrade = () => {
	return request({
		method: "GET",
		url: "/order/auth/trade",
	});
};
