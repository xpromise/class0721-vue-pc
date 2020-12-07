import { reqRegister, reqLogin } from "@api/user";

export default {
	state: {
		name: localStorage.getItem("name") || "",
		token: localStorage.getItem("token") || "",
	},
	getters: {},
	actions: {
		async register({ commit }, { phone, password, code }) {
			await reqRegister({ phone, password, code });
			console.log(commit);
		},
		async login({ commit }, { phone, password }) {
			const user = await reqLogin(phone, password);
			commit("REQ_LOGIN", user);
		},
	},
	mutations: {
		REQ_LOGIN(state, user) {
			state.name = user.name;
			state.token = user.token;
		},
	},
};
