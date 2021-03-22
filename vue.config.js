const path = require('path')

module.exports = {
  runtimeCompiler: true,
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/style/common.less')]
    }
  },
  chainWebpack: config => {
    // 让 babel 转码一些最新的 js API
    config.entry('main').add('babel-polyfill')
    config.module
      .rule('image')
      .test(/\.ico$/)
      .use('url-loader')
      .loader('url-loader')
  }
}
