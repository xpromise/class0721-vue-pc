## 总结路由参数

1. params
   路由配置
   /xxx/:xxx 必选 params 参数
   /xxx/:xxx? 可选 params 参数
   使用/传递 params  
    <router-link to="/xxx/xxx">
   this.$router.push('/xxx/xxx')
      this.$router.push({ name: '必须使用命名路由', params: {} })
   可选参数：需要 params 就加上 params 选项，不需要 params 就去掉
2. query
   使用/传递 query
   <router-link to="/xxx?key=value">
   this.$router.push('/xxx?key=value')
    this.$router.push({path: '/xx', query: {}})

3. meta
   路由配置
   meta: { key: value }
   使用 meta 参数
   this.\$route.meta.xxx

4. props
   以上方式可以 props 方式传递到组件中  
   路由配置
   props(route) { return { ...route.params, ...route.meta, ...route.query } }
   组件声明接受
   props: ['xxx']

5. 公共路由组件参数
   配置
   <router-view :key="value"></router-view>  
   组件声明接受
   props: ['xxx']

## 封装 axios

1. 下载包
   yarn add axios nprogress

2. 封装拦截器

- 功能：
  - 设置公共请求地址前缀
    - 将来实现 api 接口，公共请求地址前缀可以省略不写，更简单
  - 请求拦截器中设置公共的请求头数据
    - token（目前还未完成）
  - 响应拦截器中处理响应最终是成功、失败
    - 外面发送完请求，then 方法就一定是成功，catch 就一定是失败
  - 简述：拦截器用来做发送请求的一些公共操作

3. 添加了进度条

- 请求拦截器：NProgress.start()
- 响应拦截器（成功、失败）：NProgress.done()

4. 使用 element-ui，添加错误提示

- 安装 element-ui

  - vue add element
  - 注意: 会重写 App.vue 文件，记得先复制一份

- 将来要添加新组件

  - plugins/element.js

- 响应拦截器失败的时候，通过 Message.error(message)

5. 发送请求，通常情况下会出现跨域问题

- 在 vue.config.js 中配置代理服务器

```js
devServer: {
  proxy: {
    "/api": {
      target: "http://182.92.128.115", // 目标服务器地址
      changeOrigin: true, // 允许跨域
      // pathRewrite: { // 重写路径
      //   "^/api": "",
      // },
    },
  },
},
```

- 注意：客户端发送请求，要发送给代理服务器，代理服务器地址就是客户端运行的服务器，所以请求地址会以 / 开头，因为 / 代表就是当前服务器地址

