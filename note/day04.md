## banners 和 floors 数据遍历展示

## 轮播图

1. 在哪里去 new Swiper
   在 mounted 去 new Swiper，为了保证 DOM 结构生成了在 new Swiper
   此时 Swiper 才能获取到 DOM 元素，才能生成轮播图
2. 但是 mounted 直接 new Swiper，此时还没有获取到 banners 数据
   因为此时在 mounted 中刚刚发送请求加载轮播图图片数据，所以轮播图数据还未生成，所以失败
3. 要等轮播图图片数据请求回来，在 new Swiper
4. await this.getBanners() --> 等待 vuex 将数据更新完毕，再执行后面代码
   action 函数如果返回一个 promise 对象，await 就能等待 action 和 mutation 函数全部做完直到数据更新（可以通过打印调试看现象）
5. 此时虽然轮播图数据有了，但是 DOM 结构没有
   因为更新用户界面都是异步的，所以要等同步全部执行完，在去更新
6. 方案一：定时器  
   通过定时器将 new Swiper 添加宏任务队列，而更新用户界面是微任务队列
   所以是先更新用户界面，此时就有 DOM 结构
   再 new Swiper，此时就 OK
7. 方案二：
   this.\$nextTick(() => {})
   Vue.nextTick(() => {})  
   等当前用户界面更新完毕，在触发其中的回调函数
   将其中的回调函数放到更新完成 DOM 后在触发
   其中的回调函数可以近似看做实在 updated 中执行（但是只会执行一次）
8. 注意：Swiper6 需要手动引入其他插件才可以使用

```js
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

// https://swiperjs.com/get-started/
Swiper.use([Navigation, Pagination, Autoplay]);
```

9. 因为轮播图由多个地方用，封装轮播图组件，此时又有新的问题，轮播图不能正常生成

轮播图组件会渲染两次，第一个 banners 数据还是[], 第二次才有数据
而轮播图组件第一次就会触发 mounted，此时 banners 数据还未生成，是[], 渲染失败

10. 通过 watch 解决，watch 监听 carouselList 的变化
    第一次 banners 数据是[]，是数据初始化，不会触发
    第二次 banners 才有数据，会触发 watch，此时在这里初始化 Swiper 就有数据

11. 数据有了还需要等数据渲染成 DOM 元素才行，所以需要加 this.\$nextTick

12. 其他组件 Floor 中使用轮播图出现问题
    原因：Floor 组件是等待数据加载成功再进行遍历渲染的，所以轮播图一上来就有数据
    第一次 banners 数据就有了，不会触发 watch，所以不能 new Swiper

13. 此时需要在 mounted 中来判断数据是否存在，然后 new Swiper
    mounted 代表数据已经渲染完成 DOM 元素，所以不需要加 this.\$nextTick

14. 最后所有轮播图都使用 .swiper-container 这个容器去 new Swiper
    导致所有轮播图会出现一些问题，切换显示时会一闪一闪
    所以将容器改成 this.\$refs.swiper
