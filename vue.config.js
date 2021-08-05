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
      patterns: [path.resolve(__dirname, './src/assets/style/variables.less')]
    }
  },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       // 向所有 Sass/Less 样式导入共享的全局变量
  //       // variables.scss不能包含直接编译的css代码，因为全局引入会向每个scss文件添加
  //       // 由于sass-loader 版本不同，键名也不同
  //       // sass-loader v8-   --> data
  //       // sass-loader v8    --> prependData
  //       // sass-loader v10+  --> additionalData
  //       prependData: `
  //           @import "~@/assets/styles/variables.less";
  //       `
  //     }
  //   }
  // },
  chainWebpack: config => {
    // 让 babel 转码一些最新的 js API
    config.entry('main').add('babel-polyfill')
    config.module
      .rule('image')
      .test(/\.ico$/)
      .use('url-loader')
      .loader('url-loader')
  },
  // 跨域
  devServer: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://192.168.3.232:8099/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
