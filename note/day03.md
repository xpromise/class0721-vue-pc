## 任务

    1). vuex的模块化
    2). TypeNav的交互(与用户)效果
    3). mock数据接口
    4). 使用vuex管理mock接口返回的banners与floors数据

## vuex 的模块化

1. 模块化优点：

   - 尽可能避免将来合并文件出现的冲突问题
     - store/modules/index.js 这个文件将来会出现冲突（保留双方代码）
   - 每个页面的数据会在一个文件中，方便维护

2. 配置 modules

3. vuex 管理的数据结构

```js
{
    testCount: 0, // 总数据
    home: { // 分模块数据
        categoryList: [],
        banners: []
    },
    login: {}
}
```

4. 组件得到状态数据

```js
computed: {
    ...mapState({
        categoryList: (state) => {
            return state.home.categoryList
        },
        banners: (state) => state.home.banners,
        testCount: (state) => state.testCount
    })
}
```

## 优化减少组件对象数量: 使用编程式导航代替声明式导航

    需求: 点击某个分类项, 跳转到Search路由, 并携带categoryName & category1Id/category2Id/category3Id
    实现: 使用声明路由导航<router-link>
    问题: 每个分类都要创建一个RouterLink组件对象(非常多), 显示缓慢
    解决: 使用编程式路由导航, 不用创建RouterLink组件对象, 显示更快
    	绑定点击监听, 在回调函数中通过push()/replace()来跳转
    	如何标识3分分类? 通过不同的属性名

## 优化事件处理效率: 利用事件委托

    问题: 每个分类项都需要绑定点击监听, 监听数量太多了, 效率不高
    解决: 利用事件委托, 绑定一个点击监听来搞定所有分类项的点击响应

## 利用标签自定义属性携带动态数据

    问题: 如何得到对应的分类项的数据
    解决: 利用标签的data自定义属性 (H5的语法)
    	给a标签指定data自定义属性: <a :data-categoryName="c1.categoryName">
    	在事件回调函数读取data自定义属性值: const {categoryname} = event.target.dataset

## 控制一级列表的显示与隐藏

    设计状态数据: isHomeShow isSearchShow
    isHomeShow：决定home路由组件显示 this.$route.path === '/'
    isSearchShow： 决定Search路由组件显示
        初始值: 是false
            当移入移出时改变其值，从而决定显示隐藏

## 一级列表显示隐藏的过渡效果

    给显示隐藏的元素包上一个<transition name="xxx">
    在显示/隐藏过程的类名下指定: transition样式
    在隐藏时的类名下指定: 隐藏的样式

## 优化请求执行的位置, 减少请求次数

    问题: 从首页跳转到搜索页, 还会请求三级分类列表
    原因: 在TypeNav组件的mounted()中分发给异步action请求的 ==> 每个TypeNav组件对象都会发请求
    解决: mounted先判断是否有数据（this.categoryList.length），有数据return，没有数据在发送请求

## 合并分类 query 参数与搜索的关键字 params 参数

    问题:
    	当根据分类跳转search时, 丢了keyword的params参数
    	当根据keyword跳转search时, 丢了categoryName/cateory1Id/cateory2Id/cateory3Id的query参数
    解决:
    	当根据分类跳转search时, 同时携带上keyword的params参数
    	当根据keyword跳转search时,携带上categoryName/cateory1Id/cateory2Id/cateory3Id的query参数

## mock 数据接口

    问题: 当前首页只有分类的接口写好, 其它数据的接口还没有写好
    场景: 后台还没写好接口，开发者不能等，要去模拟数据（注意：清楚数据结构）
    解决: 前端工程师自己mock/模拟接口数据
    原理：
        搭建一个mock服务器，设置路由
        当客户端访问mock服务器的指定路由时，返回一个模拟数据回去

## 理解 JSON 数据结构

    a.结构: 名称, 数据类型  ==> 用于读取数据值
    b.value: 会显示到界面上
    c.真实接口返回的数据与mock的数据的关系: value可以变, 但结构不能变
    注意: 如果有变化 ==> 需要修改模板中读取显示的代码  ==> 真实情况是多少会有些不同, 变化越小需要修改的代码就越少

## 使用 mockjs 来 mock 接口

    下载mockjs, 引入使用
     mockjs: 生成随机数据，拦截 Ajax 请求, 返回生成的随机数据
     定义mock json数据: 使用mockjs的随机语法
     mockServer中: 通过Mock.mock()来定义mock接口
     main.js中: 引入mockServer
     必须写ajax请求代码访问:
    	utils/mockRequest中: 封装针对mock接口的axios封装封装
    	utils/request中: 定义对应的接口请求函数
        组件中: 调用接口请求函数
    注意: 浏览器并不会发对mock接口的请求

## 使用 vuex 管理 mock 接口返回的 banners 与 floors 数据

    state: banners / floors
    mutation: GET_BANNERS() / GET_FLOORS()
    action: getBanners() / getFloors()
