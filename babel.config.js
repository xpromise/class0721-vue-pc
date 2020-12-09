module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  // 实现elementui按需加载
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}