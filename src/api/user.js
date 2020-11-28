import request from "@utils/request";

// 封装一个发送请求的功能函数
export const reqLogin = (phone, password) => {
  // 将request的返回值返回出去
  // 外面可以接受到request返回值（promise对象），通过这个promise对象可以判断请求成功。失败
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: {
      // 放置请求体参数，通常post请求
      phone,
      password,
    },
    // params: {}, // 放置查询字符串参数，通常get请求
  });
};
