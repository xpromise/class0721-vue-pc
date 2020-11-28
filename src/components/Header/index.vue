<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm" @submit.prevent="search">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchText"
          />
          <!-- 
            问题：点击搜索，路径出现问号（原因是提交了表单）
            1. button 按钮如果没有type 那么在表单中 默认type就是submit
              此时会提交表单，事件就绑定在form上
                @submit.prevent="search"
            2. 不用form表单
                @click="search"
           -->
          <button class="sui-btn btn-xlarge btn-danger">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      // 搜索的内容
      searchText: "",
    };
  },
  methods: {
    /**
     * 搜索功能函数
     */
    /* search() {
      // 获取搜索的数据
      const { searchText } = this;
      // 判断是否要添加params参数
      const params = searchText ? `/${searchText}` : "";
      // 生成跳转的路径
      const location = "/search" + params;
      // 编程式导航：原因将来要做搜索功能（要发送请求）
      this.$router.push(location);
    }, */

    search() {
      /*
        $router.push(location)
          location 可以是字符串 path/:xxx?key=value
          location 可以是对象 
            {
              path: 路由路径,
              query: {} 查询字符串参数
            }

            {
              name: 命名路由名称,
              params: {} params参数
              query: {} 查询字符串参数
            }
              命名路由params可选

        编程式导航重复跳转到同一个路径会报错：
          Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/search".    
      */
      // 获取搜索的数据
      const { searchText } = this;
      // 编程式导航：原因将来要做搜索功能（要发送请求）
      const location = {
        // path: "/search",
        name: "search", // 使用命名路由
        // params: {
        //   searchText: searchText,
        // },
        // query: {
        //   name: "jack",
        // },
      };
      if (searchText) {
        location.params = {
          searchText,
        };
      }
      this.$router.push(
        location,
        // (res) => {
        //   console.log("成功", res);
        // },
        // (err) => {
        //   console.log(err);
        // }
      );
      // .then((res) => {
      //   console.log("成功", res);
      // })
      // .catch((err) => {
      //   console.log("err", err);
      // });
    },
  },
};
</script>

<style lang="less" scoped>
// lang="less" 当前可以使用less写样式
// scoped 作用域样式代码（当前样式只对当前组件生效，其他组件没有效果）
/* 
  当你添加 scoped 属性
    给当前组件所有结构添加一个唯一的属性 data-v-xxx
    所有元素选择器都会加上选择这个属性
      之前: .header-aaa { }
      之后：.header-aaa[data-v-xxx] {}
    因为只有当前组件具有这个属性 data-v-xxx
    所以样式只会对当前组件生效，其他组件不会影响
*/
// .header-aaa {
//   color: red;
// }

.container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  .loginList {
    float: left;

    p {
      float: left;
      margin-right: 10px;

      .register {
        border-left: 1px solid #b3aeae;
        padding: 0 5px;
        margin-left: 5px;
      }
    }
  }

  .typeList {
    float: right;

    a {
      padding: 0 10px;

      & + a {
        border-left: 1px solid #b3aeae;
      }
    }
  }
}

.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
