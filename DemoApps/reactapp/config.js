// package.json content
var npmPackage = require('./package');


// Product Info
var productName = "reactapp";
var productVersion = npmPackage.version;


// Source paths
var mainSrcPath = './src/index.js';
var srcPath = 'src';


// Bundling info
var indexFilename = '../index.html';
var templatePath = 'templates/index.tpl';
var publicPath = `/static/${productName}/`;
var outputPath = `dist/${productName}`;
var bundleName = `${productName}-${productVersion}-[name]`;
var bundleNameJS = bundleName + '.js';
var bundleNameCSS = bundleName + '.css';


// Vendorize info
var vendorPackages = npmPackage.vendorize;


// Globals info (usually polyfills for compatibility with older browsers)
var provideMap = {};
var globalize = npmPackage.globalize;

var globalizeKeys = Object.keys(globalize);
globalizeKeys.forEach(function(global) {
  provideMap[global] = 'imports-loader?this=>global!exports-loader?global.' + global + '!' + globalize[global];
});


// Libraries to show publicly in the <head> (like bootstrap CSS)
var copyList = [];
var publicize = npmPackage.publicize;

var publicizeKeys = Object.keys(publicize);
publicizeKeys.forEach(function(asset) {
  copyList.push({ from: 'node_modules/' + asset, to: publicize[asset]});
});


// Export for webpack usage
module.exports = {
  productName,
  productVersion,
  mainSrcPath,
  srcPath,
  indexFilename,
  templatePath,
  publicPath,
  outputPath,
  bundleNameJS,
  bundleNameCSS,
  vendorPackages,
  provideMap,
  copyList
};
