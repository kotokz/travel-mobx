var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('config');
var env = config.util.getEnv('NODE_ENV');
var DEV = env === 'development';
var publicPath = config.get('webpack.publicPath');

var webpackConfig = {
  devtool: config.get('webpack.devtool'),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  entry: {
    app: [path.join(__dirname, 'src/index')],
    vendor: [
      'react',
      'react-router',
      'mobx',
      'mobx-react',
      'moment',
      'lodash'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    //filename: DEV ? "[name].js" : "[name].[ hash].js",
    filename: "[name].js",
    publicPath: publicPath
  }
};

var port = config.get('server.port')
if (DEV) {
  webpackConfig.entry.app.unshift(
    'webpack-hot-middleware/client?path=http://localhost:' + port + '/__webpack_hmr',
    'react-hot-loader/patch'
  );
}

//var cssLoader = 'css?sourceMap&-minimize&importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]';
webpackConfig.module = {
  loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.tsx?$/,
      loader: 'react-hot-loader/webpack!ts',
      include: /src/,
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ fallbackLoader: "style-loader", loader: ['css-loader', 'postcss-loader'] })
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: ['css-loader', 'postcss-loader', 'less?sourceMap'] })
    }
  ]
};

// webpackConfig.postcss = [
//   cssnano({
//     autoprefixer: {
//       add: true,
//       remove: true,
//       browsers: ['last 2 versions']
//     },
//     discardComments: {
//       removeAll: true
//     },
//     discardUnused: false,
//     mergeIdents: false,
//     reduceIdents: false,
//     safe: true,
//     sourcemap: true
//   })
// ];

webpackConfig.plugins = [
  // new ExtractTextPlugin({ 
  //   filename: '[name].[contenthash].css', 
  //   allChunks: true
  // }),
  new ExtractTextPlugin("styles.css")
];

var globals = config.get('globals');
if (globals) {
  globals['process.env'] = {
    NODE_ENV: JSON.stringify(env)
  };
  webpackConfig.plugins.push(
    new webpack.DefinePlugin(globals)
  );
}

if (DEV) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: 'vendor.js',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig;
