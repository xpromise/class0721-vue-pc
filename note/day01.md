## 项目描述

    1). 这是一个关于哪方面的项目?
    2). 有哪些功能模块, 你负责哪些?
    3). 技术栈是哪些?
    4). 对主要的功能模块做详细介绍?

## 技术选型

    1). 前台数据处理/交互/组件化
    2). 前后台交互
    3). 模块化
    4). 项目构建/工程化
    5). css预编译器
    6). 其它

## 接口相关理解

    1). 接口、API
        - 简单理解：前后端通信的地址
        - 复杂理解：包含请求地址、请求方式、请求参数、响应的结果等所有内容才是一个完整接口
        - vue接口文档：vue向外暴露的功能方法、属性等
    2). 接口文档
    3). 对/调/测接口 / 联调
    4). 前后台分离
    5). mock数据/接口

## git 版本控制的基本操作

    1). 创建本地仓库(代码在本地仓库中)
        创建.gitignore文本, 并配置好
        git init
        git add .
        git commit -m "init app"

    2). 创建远程仓库
        New Repo
        指定仓库名
        创建

    3). 将本地仓库的代码推送到远程仓库
        git remote add origin url (在本地记录远程仓库的地址)
        git push origin master

    4). 如果本地代码有修改, 要提交到本地仓库, 推送到仓库
        git add .
        git commit -m "xxx"
        git push origin master

        git config --global credential.helper store (记住用户和密码)

    5). 如果远程代码有修改, 要拉取到本地仓库
        git pull origin master

    6). 将远程仓库的代码clone到本地(生成仓库)
        git clone url

## 分支操作

    1). 创建本地分支, 并推送到远程
        git checkout -b dev
        git push origin origin dev
    2). 拉取远程新分支到本地
        git pull  (如果分支是在clone后创建的才需要执行)
        git checkout -b dev origin/dev
    3). 本地dev分支代码修改
        git add .
        git commit -m "xxx"
        git push origin dev
    4). 将dev分支合并到master
        git checkout master
        git merge dev

## 使用脚手架创建项目并运行

    1). 使用vue-cli4
    2). 开发环境运行  npm run serve
        启动一个开发服务器，运行代码
    3). 生产环境打包运行 npm run build
        构建打包输出文件（将来用来项目上线的文件）
        通常情况下：map文件只用来调试、测试，调试完成可以删除
        运行打包输出的文件：
            npm i serve -g
            serve -s dist -p 5000

## eslint 配置

    1). package.json 中 `rules: { xxx: 0 }`，可以禁用某一个 eslint 规则
    2). 源代码位置输入 `/* eslint-disable xxx */` 禁止代码下一行eslint 的 xxx 规则
    3). vue.config.js 中 lintOnSave: false，禁用所有 eslint 规则

## 引入 vue-router

    1). 下载vue-router
    2). 确定整体路由结构:
        上: Header
        中: router-view
        下: Footer
    3). 定义一级路由组件: Home/Search/Register/Login (要有基本结构)
    4). 创建路由器, 配置路由, 配置路由器
    5). 组件中路由相关的2个对象 (面试问题)
        $router: 路由器对象, 包含一些用于路由跳转的方法: push()/replace()/back()
        $route: 当前路由信息对象, 包含当前路由相关数据的对象: path/name/query/params/meta

## Header 组件

    路由跳转/导航的2种方式
    1). 声明式/路由链接跳转: <router-link to="/xxx">
    2). 编程式跳转/导航: 点击监听 + router.push()/replace()
    如果只需要跳转，用第一种
    如果需要发送请求（做些其他事），再跳转，用第二种

## 样式的处理

- 样式命名
  - 组件名称-xxx-xxx
- 样式使用
  - 尽量用单个类名选择器，不要嵌套
  - 优点：代码少、解析速度快
- scoped
  - 让组件样式只在当前组件生效，不会影响其他组件
  - 原理：给当前组件所有元素添加一个唯一的属性 data-v-xxx
  - 所有样式选择器都会添加上属性选择器，所以样式只在当前组件生效
