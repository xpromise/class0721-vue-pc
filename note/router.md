# vue-router

## 概念

前端路由: 用来开发单页面应用
单页面应用 SPA：

- 整个应用只有一个完整页面
- 点击链接不会发送请求，不会刷新页面
- 会更新地址和局部页面

## 两种模式

- hash

  - 路径带#, 没法用锚点功能，不美观
  - 兼容性较好 ie8
  - 原理：
    - 跳转路由：window.location.hash
    - 监视路径：window.onhashchange 事件

- history

  - 不带#，可以用锚点功能，美观
  - 兼容性较差 ie10
  - 原理：

    - 跳转路由：window.history.pushState
    - 监视路径：window.popstate 事件

  - 问题 history 模式出现 404 问题

    - 原因：开发服务器处理 / 根路径请求，别的路径是处理不了
    - 所以：访问 /home 就会出现 404

    - 解决：
      - 开发模式(webpack)：
        ```js
        devServer: {
          historyApiFallback: true, // 一旦请求404，就默认返回index.html页面
        },
        ```
      - 上线模式（nginx）:

  - 问题 hash 模式不出现 404 问题
    - 因为 hash 模式的路径都在 # 后面
    - 而 # 后面的参数发送请求是不会携带，
    - 所以每次请求请求地址都是 / ，自然没有 404
