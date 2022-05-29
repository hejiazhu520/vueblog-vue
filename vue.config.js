const path = require('path')
const resolve = dir => path.join(__dirname, '', dir)
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  // assetsDir: '',
  // indexPath: 'index.html',
  devServer: {
    port: 8898,
    open: true,
    // 是否开启 HMR
    hot: true,
    // 允许本地配置 hosts 打开站点
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      // 自动解析确定的扩展
      extensions: ['.js', '.vue', '.json'],
      // 别名
      alias: {
        views: resolve('src/views'),
        '@': resolve('src'),
        '@components': resolve('src/components')
      }
    },
    plugins: []
  },
  transpileDependencies: ['element-ui'],
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        data(loaderContext) {
          const {
            resourcePath,
            rootContext
          } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          // 注入自定义变量
          return ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')

    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })
    // 分析大小
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
}