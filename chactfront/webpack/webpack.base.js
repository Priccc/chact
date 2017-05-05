const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const nodePath = path.resolve(cwd, 'node_modules');
const appPath = path.resolve(cwd, 'src');

process.noDeprecation = true;
// process.traceDeprecation = true;

module.exports = options => ({
  context: appPath,
  entry: options.entry,
  output: Object.assign(options.output, {
    path: path.resolve(cwd, '../chactapi/public'),
  }),
  module: {
    rules: options.rules.concat([
      {
        test: /\.js$/,
        exclude: nodePath,
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDev ? './webpack-cache/' : false,
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: nodePath,
        include: appPath,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `css/iconfont/[hash].[ext]?t=${Date.now()}`,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `img/[hash].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ]),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    }),
    new webpack.ProvidePlugin({
      Immutable: 'immutable',
      React: 'react',
      ReactDOM: 'react-dom',
      Md5: 'md5',
      fetch: 'exports?self.fetch!whatwg-fetch',
      moment: 'moment',
    }),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
      if (!/\/moment\//.test(context.context)) { return }
      // context needs to be modified in place
      Object.assign(context, {
        // include only CJK
        regExp: /^\.\/(ja|ko|zh)/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: '../../locale'
      })
    }),
  ].concat(options.plugins),
  resolve: {
    modules: [appPath, nodePath],
    extensions: [
      ' ',
      '.js',
      '.jsx',
      '.css',
      '.scss',
    ],
    alias: {
      redux: 'redux/dist/redux.min.js',
      'react-router': 'react-router/umd/ReactRouter.min.js',
      'react-redux': 'react-redux/dist/react-redux.min.js',
      'react-router-redux': 'react-router-redux/dist/ReactRouterRedux.min',
      immutable: 'immutable/dist/immutable.min',
      components: 'components',
      actions: 'actions',
      containers: 'containers',
      reducers: 'reducers',
      utils: 'utils',
      soucre: 'source',
    },
    mainFields: ['jsnext:main', 'main'],
  },
  devtool: 'inline-source-map',
  target: 'web',
  stats: true,
});