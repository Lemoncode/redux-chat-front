let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: [
    'babel-polyfill',
    './index.jsx',
  ],
  output: {
    path: path.join(basePath, 'dist'),
    filename: 'bundle.js',        
  },
  devtool: 'source-map',
  devServer: {
    stats: 'errors-only'
  },  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    })
  ],
};
