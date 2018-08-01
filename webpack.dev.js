const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const distPath = path.resolve(__dirname, 'dist');

module.exports = merge.strategy({ entry: 'prepend' })(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: distPath,
    filename: '[name].js',
  },
  devServer: {
    contentBase: distPath,
    inline: true,
    host: 'localhost',
    port: 8085,
    stats: 'minimal',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
});
