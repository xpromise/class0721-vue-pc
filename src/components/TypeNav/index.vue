<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="isSearchShow = false">
      <h2 class="all" @mouseenter="isSearchShow = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="search">
        <div class="sort" v-show="isHomeShow || isSearchShow">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="category in categoryList"
              :key="category.categoryId"
            >
              <h3>
                <!-- 一级分类名称 -->
                <a
                  :data-categoryName="category.categoryName"
                  :data-categoryId="category.categoryId"
                  :data-categoryType="1"
                  >{{ category.categoryName }}</a
                >
                <!-- 第一种方案：使用router-link跳转，问题产生太多组件，页面性能不会很好 -->
                <!-- <router-link
                :to="`/search?categoryName=${category.categoryName}&category1Id=${category.categoryId}`"
                >{{ category.categoryName }}</router-link
              > -->
                <!-- 第二种方案：编程式导航 -->
                <!-- <a
                @click.prevent="
                  $router.push({
                    name: 'search',
                    query: {
                      categoryName: category.categoryName,
                      category1Id: category.categoryId,
                    },
                  })
                "
                >{{ category.categoryName }}</a
              > -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                  >
                    <dt>
                      <!-- 二级分类名称 -->
                      <a
                        :data-categoryName="child.categoryName"
                        :data-categoryId="child.categoryId"
                        :data-categoryType="2"
                        >{{ child.categoryName }}</a
                      >
                      <!-- <router-link
                      :to="`/search?categoryName=${child.categoryName}&category2Id=${child.categoryId}`"
                      >{{ child.categoryName }}</router-link
                    > -->
                      <!-- <a
                      @click.prevent="
                        $router.push({
                          name: 'search',
                          query: {
                            categoryName: child.categoryName,
                            category2Id: child.categoryId,
                          },
                        })
                      "
                      >{{ child.categoryName }}</a
                    > -->
                    </dt>
                    <dd>
                      <!-- 三级分类名称 -->
                      <em
                        v-for="grandChild in child.categoryChild"
                        :key="grandChild.categoryId"
                      >
                        <a
                          :data-categoryName="grandChild.categoryName"
                          :data-categoryId="grandChild.categoryId"
                          :data-categoryType="3"
                          >{{ grandChild.categoryName }}</a
                        >
                        <!-- <router-link
                        :to="`/search?categoryName=${grandChild.categoryName}&category3Id=${grandChild.categoryId}`"
                        >{{ grandChild.categoryName }}</router-link
                      > -->
                        <!-- <a
                        @click.prevent="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryName: grandChild.categoryName,
                              category3Id: grandChild.categoryId,
                            },
                          })
                        "
                        >{{ grandChild.categoryName }}</a
                      > -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      // 初始化响应式数据
      isHomeShow: this.$route.path === "/",
      isSearchShow: false,
    };
  },
  computed: {
    // 当使用vuex模块化，这种方式就不行了
    // ...mapState(["testCount", "categoryList"]),
    // ...mapState(["testCount", "home.categoryList"]),
    // ...mapState(["testCount", "home"]), // 这种方式可以，需要使用 this.home.categoryList。太麻烦

    ...mapState({
      // 对象中的数据，就会传递给组件

      // categoryList就是组件能接受到的数据
      // 它的值是一个函数，函数内部会调用得到值
      // 调用时会将所有vuex数据传递进去，就是state
      categoryList: (state) => state.home.categoryList,
      // testCount: (state) => state.testCount,
    }),
  },
  methods: {
    // 函数直接写
    // 注意：将来action函数名称和mutation函数名称不要重复
    ...mapActions(["getCategoryList"]),
    // 跳转到search
    goSearch(e) {
      // 注意：自定义属性都是小写
      const { categoryname, categoryid, categorytype } = e.target.dataset; // 元素自定义属性对象

      // 需求：如何获取需要的参数？
      // 已知：得到触发事件目标元素
      // 解决：给元素设置自定义属性 data-xxx, 通过自定义属性得到需要的参数

      // 判断是否是点中了a标签，才能跳转
      if (!categoryname) return;

      // 隐藏分类列表
      this.isSearchShow = false;

      const location = {
        name: "search", // 必须使用命名路由（因为要使用params参数）
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };

      // 判断当前是否有params参数，有加上
      const { searchText } = this.$route.params;

      if (searchText) {
        location.params = {
          searchText,
        };
      }

      // this.$route.path 路径路由
      // this.$route.name 命名路由名称
      if (this.$route.name === "search") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
      // this.$router.replace(location);
    },
  },
  mounted() {
    // console.log(this);
    // 在请求之前先判断vuex有没有数据
    if (this.categoryList.length) return;
    // 调用vuex的action函数
    this.getCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // 控制显示隐藏过渡效果
      &.search-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      }
      &.search-enter {
        height: 0px;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
