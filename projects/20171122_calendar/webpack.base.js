let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let HtmlPlugin = require('./build/html-plugin')

function resolve (p) {
  return path.resolve(__dirname, p)
}

let conf = {
  entry: {
    main: ['./src/main.js']
  },
  output: {
    path: resolve('./dist'),

    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].bundle.[chunkhash:7].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      chunks: ['main']
    }),
    new ExtractTextPlugin('[name].css'),
    // new HtmlPlugin()
  ],

  module: {
    //加载器配置
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: {
            loader: 'babel-loader',
            include: [
              resolve("src")
            ],
          }
        }
      }
    }, {
      test: /\.js$/,
      include: [resolve('src')],
      // exclude: ['node_modules'],
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 5000,//单位 字节，1千字节(kb)=1024字节(b)
        // publicPath: '../',
        name: 'imgs/[name].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        // publicPath: '../',
        name: 'fonts/[name].[ext]'
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader', // 超有用，不要漏了。解决 vue 单文件 js(import) 方式导入 css 无效问题
        use: ['css-loader', 'postcss-loader']
      }),
      // use: ['style-loader','css-loader','postcss-loader']

    }]
  },
  resolve: {
    modules: [
      resolve("../../node_modules")
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  }
}

module.exports = conf
