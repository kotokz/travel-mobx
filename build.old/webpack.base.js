'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const postcss = [
  require('autoprefixer')(),
  require('precss')
]

module.exports = {
  entry: {
    client: './src/index'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../src'),
      components: path.join(__dirname, '../src/components')
    }
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['ts-loader'],
      include: path.join(__dirname, '../src')
    }]
  },
  browserlist: ['last 2 versions', 'ie > 8'],
  postcss,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'travel-mobx',
      template: __dirname + '/index.html',
      filename: '../dist/index.html'
    })
  ]
}
