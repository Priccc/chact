const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const cheerio = require('cheerio');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

function templateContent() {
  const html = fs.readFileSync(
    path.resolve(cwd, 'src/index.html')
  ).toString();

  const doc = cheerio(html);
  const body = doc.find('body');
  body.append(`<script data-dll='true' src='/js/lib/vendor.dll.js'></script>`);
  return doc.toString();
}

module.exports = require('./webpack.base')({
  entry: [
    'webpack-hot-middleware/client',
    'index.js',
  ],
  output: {
    publicPath: '/',
    filename: 'js/[name].[hash:5].js',
    chunkFilename: 'js/chunk.[name].[hash:5].js',
  },
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
      ],
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          // options: {
          //   modules: true,
          //   localIdentName: '[name]__[local]___[hash:base64:5]',
          //   importLoaders: 1,
          // }
        },
        // {
        //   loader: 'resolve-url-loader',
        // },
        // {
        //   loader: 'postcss-loader',
        //   options: {
        //     sourceMap: 'inline',
        //   },
        // },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: cwd,
      manifest: require(path.resolve(cwd, './manifest.json')),
      sourceType: 'var',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      templateContent: templateContent(),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});