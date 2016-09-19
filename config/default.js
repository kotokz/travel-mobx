var path = require('path');

module.exports = {
  globals: {
    __DEV__: false
  },
  server: {
    host: 'localhost',
    port: 3000,
    static: path.resolve(__dirname, '../dist/static')
  },
  webpack: {
    dist: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
}