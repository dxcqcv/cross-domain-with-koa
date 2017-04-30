const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');

// LOADERS
const rules = {
  js: {
    test: /\.js$/,
    use: [{
      loader: 'babel-loader', 
      options: {
        plugins: ['transform-runtime'],
        presets: ['es2015']
      }
    }],
    exclude: /node_modules/
  },
  html: {
    test: /\.pug$/,
    use: ['pug-loader'],
    exclude: /node_modules/
  },
  css: {
    test: /\.(styl|css)$/,
    exclude: /node_modules/,
    use: ['style-loader','css-loader','postcss-loader','stylus-loader'] 
  },
  json: {
    test: /\.json$/,
    exclude: /node_modules/,
    use: ['json-loader']
  }
};

// CONFIG
const config = module.exports = {};

config.resolve = {
  extensions: ['.js','.css','.styl','.pug','.json'],
  mainFields: ['browser','module','main']
};

config.module = {
  rules: [
    rules.html,
    rules.js,
    rules.css,
    rules.json,
  ]
};

config.devtool = 'cheap-module-source-map';

config.entry = {
  app: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/index.js')],
  cors: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/cors.js')],
  domain: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/domain.js')],
  iframe: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/iframe.js')],
  message: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/message.js')],
  messageIframe: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/message-iframe.js')],
  jsonp: ['webpack-hot-middleware/client?reload=1',  path.resolve(__dirname,'./app/src/public/js/jsonp.js')]

};


config.output = {
  path: path.join(__dirname, 'app/dist/public'),
  publicPath: '/assets/',
  filename: 'js/[name].js'
};


config.plugins = [
  new CleanWebpackPlugin(['app/dist/js']),
  new HotModuleReplacementPlugin(),
  new OccurrenceOrderPlugin(),
  new LoaderOptionsPlugin({
    debug: true,
    minimize: false,
    options: {
      postcss: [
        autoprefixer()
      ]
    }
  }),
  new HtmlWebpackPlugin({
    title: 'index',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/index.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['app'], // invoke js
    template: path.join(__dirname, 'app/src/views/index.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'cors',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/demo/cors.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['cors'],
    template: path.join(__dirname, 'app/src/views/demo/cors.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'jsonp',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/demo/jsonp.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['jsonp'],
    template: path.join(__dirname, 'app/src/views/demo/jsonp.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'error',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/error.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['app'],
    template: path.join(__dirname, 'app/src/views/error.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'domain',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/demo/domain.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['domain'], // invoke js
    template: path.join(__dirname, 'app/src/views/demo/domain.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'iframe',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/demo/iframe.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['iframe'], // invoke js
    template: path.join(__dirname, 'app/src/views/demo/iframe.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'message',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/demo/message.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['message'], // invoke js
    template: path.join(__dirname, 'app/src/views/demo/message.pug')
  }),
  new HtmlWebpackPlugin({
    title: 'message-iframe',
    chunkSortMode: 'dependency',
    filename: path.join(__dirname, 'app/dist/views/demo/message-iframe.html'),
    hash: false,
    alwaysWriteToDisk: true,
    inject: 'body',
    chunks: ['messageIframe'], // invoke js
    template: path.join(__dirname, 'app/src/views/demo/message-iframe.pug')
  }),
  new HtmlWebpackHarddiskPlugin(),
  new CommonsChunkPlugin({
    children: true,
    async: true
  }),
  new NoEmitOnErrorsPlugin(),
  new BabiliPlugin()
];

