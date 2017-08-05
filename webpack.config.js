let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'axios', 'babel-preset-stage-1', 'lodash', 'material-ui',
  'paypal-checkout', 'react', 'react-dom', 'react-redux',
  'react-router-dom', 'react-slick', 'react-svg',
  'react-tap-event-plugin', 'redux', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './client/src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      { 
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
        'style-loader', 
        'css-loader'
        ],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'client/src/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
