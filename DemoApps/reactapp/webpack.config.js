var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var requireErrorHandlerPlugin = require('require-error-handler-webpack-plugin');
var JsonpMainTemplatePlugin = require('webpack/lib/JsonpMainTemplatePlugin');

var appConfig = require('./config');

var isDev = process.env.NODE_ENV !== 'production';
var isAnalyze = process.env.NODE_ENV == 'analyze';

var showUglifyWarnings = false;

module.exports = {
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: {
    main: appConfig.mainSrcPath,
    vendors: appConfig.vendorPackages
  },
  output: {
    path: path.join(__dirname, appConfig.outputPath),
    filename: appConfig.bundleNameJS,
    chunkFileName: appConfig.bundleNameJS,
    publicPath: appConfig.publicPath
  },
  plugins: getPlugins([
    new webpack.ProvidePlugin(appConfig.provideMap),
    new webpack.optimize.CommonsChunkPlugin('vendors', appConfig.bundleNameJS),
    new ExtractTextPlugin(appConfig.bundleNameCSS, {
      allChunks: true,
      publicPath: appConfig.publicPath
    }),
    new HtmlWebpackPlugin({
      title: appConfig.productName,
      filename: appConfig.indexFilename,
      template: appConfig.templatePath,
      inject: false
    }),
    new requireErrorHandlerPlugin.JsonpErrorHandlerPlugin(JsonpMainTemplatePlugin),
    new requireErrorHandlerPlugin.RequireEnsureErrorHandlerPlugin(),
    new requireErrorHandlerPlugin.AMDRequireErrorHandlerPlugin(),
    new CopyWebpackPlugin(appConfig.copyList)
  ]),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.resolve(__dirname, appConfig.srcPath)
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  resolve: {
    modulesDirectories: ["node_modules"],
    fallback: path.join(__dirname, "node_modules")
  },
  node: {
    fs: 'empty',
    tls: 'empty'
  }
};

function getPlugins(plugins) {

  if (isDev && !isAnalyze) {
    plugins.push(
      new webpack.NoErrorsPlugin()
    );
  }
  else {
    plugins.push(
      new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: showUglifyWarnings
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    );
  }

  return plugins;
}