// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "../views/Detail";
import AddCartSuccess from "../views/AddCartSuccess";
import ShopCart from "../views/ShopCart";
import Trade from "../views/Trade";
import Pay from "../views/Pay";
import PaySuccess from "../views/PaySuccess";
import Center from "../views/Center";

// 重写push和replace方法
// 目的：为了让编程式导航重复点击时不报错~
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
	// 如果用户想处理失败，就处理
	if (onComplete && onAbort) {
		return push.call(this, location, onComplete, onAbort);
	}
	// 如果用户不处理失败，给默认值：空函数
	return push.call(this, location, onComplete, () => {});
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
	// 如果用户想处理失败，就处理
	if (onComplete && onAbort) {
		return replace.call(this, location, onComplete, onAbort);
	}
	// 如果用户不处理失败，给默认值：空函数
	return replace.call(this, location, onComplete, () => {});
};

// 安装插件
Vue.use(VueRouter);

const router = new VueRouter({
	// 路由配置
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/login",
			component: Login,
			// 当组件加载显示时，meta中的参数会传到$route中
			// 当组件不加载显示时，meta中的参数不会传
			meta: {
				isFooterHide: true,
			},
		},
		{
			path: "/register",
			component: Register,
			meta: {
				isFooterHide: true,
			},
		},
		{
			// 命名路由
			name: "search",
			// ?: 代表 params 参数是可选的
			path: "/search/:searchText?",
			component: Search,
		},
		{
			// 命名路由
			name: "detail",
			path: "/detail/:id",
			component: Detail,
		},
		{
			// 命名路由
			name: "addcartsuccess",
			path: "/addcartsuccess",
			component: AddCartSuccess,
			// 路由独享守卫
			// beforeEnter: (to, from, next) => {
			// 	// 需求：只有添加了购物车才能进行，没有添加就去购物车页面
			// 	// console.log(to, from, next);
			// 	// 1. 从detail过来 2. 有数据
			// 	if (from.name === "detail" && sessionStorage.getItem("cart")) {
			// 		return next();
			// 	}

			// 	next("/shopcart");
			// },
		},
		{
			// 命名路由
			name: "shopcart",
			path: "/shopcart",
			component: ShopCart,
		},
		{
			// 命名路由
			name: "trade",
			path: "/trade",
			component: Trade,
		},
		{
			// 命名路由
			name: "pay",
			path: "/pay",
			component: Pay,
		},
		{
			// 命名路由
			name: "paysuccess",
			path: "/paysuccess",
			component: PaySuccess,
		},
		{
			// 命名路由
			name: "center",
			path: "/center/myorder",
			component: Center,
		},
	],
	// 每次切换路由页面滚动条位置
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

/*
	https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
	路由守卫：
		1. 是什么
			在路由跳转之前、之中、之后触发的钩子函数（类似于生命周期）
		2. 分类
			全局守卫
				全局前置守卫：在切换路由之前触发
					beforeEach
				全局解析守卫：之中
					beforeResolve
				全局后置守卫：之后
					afterEach
			路由守卫
				beforeEnter
			组件守卫		
				beforeRouteEnter
				beforeRouteUpdate
				beforeRouteLeave
		3. 作用：
			用来做权限认证（判断当前要跳转的地址，有没有权限可以访问）			
*/

// 需要进行权限验证的地址
const permissionPaths = ["/trade", "/pay", "/center"];
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
	/*
		to   要去的路由对象($route)
		from 从哪来的路由对象（当前路由对象）($route)
		next 是一个函数：跳转到哪个路由的方法
			比如：要去to这个路由 next()	
						要去登录路由 next('/login')  next({path: '/login'})  next({name: 'login'})
	
		
		权限验证：
			如果用户未登录，不允许去 trade pay center 等路由
	*/

	// if (permissionPaths.indexOf(to.path) > -1) {
	// 	if (store.state.user.token) {
	// 		next();
	// 	} else {
	// 		next("/login");
	// 	}
	// } else {
	// 	next();
	// }

	if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
		return next("/login");
	}

	next();
});

export default router;
