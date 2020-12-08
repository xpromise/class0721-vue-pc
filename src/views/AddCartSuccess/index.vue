<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="cart.imgUrl" />
          </div>
          <div class="right-info">
            <p class="title">
              {{ cart.skuName }}
            </p>
            <p class="attr">{{ cart.skuDesc }}</p>
          </div>
        </div>
        <div class="right-gocart">
          <a href="javascript:" class="sui-btn btn-xlarge">查看商品详情</a>
          <router-link to="/shopcart">去购物车结算 > </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCartSuccess",
  data() {
    return {
      cart: JSON.parse(sessionStorage.getItem("cart") || "{}"),
    };
  },
  // 组件路由前置守卫
  beforeRouteEnter: (to, from, next) => {
    // 注意：没有this
    // 从vuex读取数据：1. store 2. 通过next访问this

    next((vm) => {
      console.log(vm);
      // 通过 `vm` 访问组件实例
      // 需求：只有添加了购物车才能进行，没有添加就去购物车页面
      // console.log(to, from, next);
      // 1. 从detail过来 2. 有数据
      if (from.name === "detail" && sessionStorage.getItem("cart")) {
        return next();
      }

      next("/shopcart");
    });
  },
};
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  background-color: #f4f4f4;

  .cart-complete {
    width: 1200px;
    margin: 0 auto;

    h3 {
      font-weight: 400;
      font-size: 16px;
      color: #6aaf04;
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0;

      .icon-pc-right {
        background-color: #fff;
        border: 2px solid #6aaf04;
        padding: 3px;
        margin-right: 8px;
        border-radius: 15px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;

      .left-good {
        float: left;

        .left-pic {
          border: 1px solid #dfdfdf;
          width: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }

        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;

          .title {
            width: 100%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }

          .attr {
            color: #aaa;
          }
        }
      }

      .right-gocart {
        float: right;

        a {
          padding: 7px 36px;
          font-size: 15px;
          line-height: 22px;
          color: #333;
          background-color: #eee;
          text-decoration: none;
          box-sizing: border-box;
          border: 1px solid #e1e1e1;
        }

        a:hover {
          background-color: #f7f7f7;
          border: 1px solid #eaeaea;
        }

        a:active {
          background-color: #e1e1e1;
          border: 1px solid #d5d5d5;
        }

        .btn-danger {
          background-color: #e1251b;
          color: #fff;
        }

        .btn-danger:hover {
          background-color: #e1251b;
        }
      }
    }
  }
}
</style>