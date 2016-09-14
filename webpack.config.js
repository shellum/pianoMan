var path = require('path');
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
var srcDir = __dirname + '/src';
var destDir = __dirname + '/dist';
var imgSrcDir = __dirname + '/src/images';
var imgDestDir = './images/';
var cssSrcDir = __dirname + '/src/css';
var cssDestDir = './css/';
var htmlSrcDir = __dirname + '/src';
var htmlDestDir = './';

module.exports = {
  entry: srcDir + '/main.js',
  output: {path:destDir,filename: 'bundle.js'},
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?/,
        include: srcDir,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: cssSrcDir,
        loader: 'file?name='+cssDestDir+'[name].[ext]',
      },
      {
        test: /\.html$/,
        include: htmlSrcDir,
        loader: 'file?name='+htmlDestDir+'[name].[ext]',
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin([
      {from: 'src/images', to: 'images'},
      {from: 'src/html'},
      {from: 'src/css', to: 'css'},
    ])
  ]
};
