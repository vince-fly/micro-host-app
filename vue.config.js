const path = require('path');
const port = 8080; // dev port
let styleVariables = require('./src/style/variables.scss.js');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: dev ? './' : './',
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/style/*.scss'), //导入的scss文件的路径
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(styleVariables)
          // eslint-disable-next-line no-useless-escape
          .map((k) => `\$${k.replace('_', '-')}: ${styleVariables[k]};`)
          .join('\n'),
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['ts', 'tsx', '.js', '.jsx', '.vue', '.json'],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('element-ui-js')
      .test(/\.js$/)
      .include.add(path.resolve('src'))
      .add(path.resolve('node_modules/element-ui/packages'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .end();
  },
};
