module.exports = {
  plugins: {
    autoprefixer: {},
    // npm install postcss-px-to-viewport --save-dev
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的时设计稿的宽度
      viewportHeight: 667, // 视窗的高度，对应的时设计稿的高度（也可以不设置）
      unitPrecision: 5, // 指定 px 转为视窗单位值的小数点后的位数（很多时候不能整除）
      viewportUnit: 'vw', // 指定转换的视窗单位类型，建议使用 vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类
      minPixelValue: 1, // 1 px 及以下不转换为视窗单位
      mediaQuery: false // 允许在媒体查询中转换 px
    }
  }
}
