const path = require('path');
const webpack = require('webpack');

const vendors = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router',
  'react-router-redux',
  'immutable',
  'antd',
  'md5',
  'moment',
  'lodash',
  'react-addons-perf',
  'socket.io-client',
];
module.exports = {
  context: process.cwd(),
  entry: {
    vendor: vendors
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'js/lib/[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[hash]',
    })
  ]
};