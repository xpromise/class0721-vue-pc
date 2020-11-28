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
    this.$route.meta.xxx  

4. props
  以上方式可以props方式传递到组件中    
  路由配置
    props(route) { return { ...route.params, ...route.meta, ...route.query } }
  组件声明接受
    props: ['xxx']

5. 公共路由组件参数
  配置
    <router-view :key="value"></router-view>  
  组件声明接受
    props: ['xxx']  