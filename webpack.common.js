const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  context: srcPath,
  entry: {
    app: ['./app.tsx'],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpg|ico)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendorGroup: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
      chunks: ['manifest', 'vendor', 'app'],
      chunksSortMode: 'manual',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REST_ENV: JSON.stringify(process.env.REST_ENV),
      },
    }),
  ],
};
