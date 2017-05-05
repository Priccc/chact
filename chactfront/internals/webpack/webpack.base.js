const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const nodePath = path.resolve(cwd, 'node_modules');
const srcPath = path.resolve(cwd, 'src');
module.exports = options => ({
    context: srcPath,
    entry: options.entry,
    output: {
        publicPath: '/',
        path: path.resolve(cwd, '../chactapi/public'),
        filename: 'js/[name].[hash:5].js',
        chunkFilename: 'js/chunk.[chunkhash:5].js',
    },
    module: {
        rules: options.rules.concat([
            {
                test: /\.js$/,
                exclude: nodePath,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        'transform-runtime',
                        ["import", { "libraryName": "antd", "style": true, }]
                    ],
                    presets: isDev ? ['react-hmre', 'es2015', 'react', 'stage-1'] : ['es2015', 'react', 'stage-1'],
                    cacheDirectory: isDev ? './webpack-cache/' : false
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: `css/iconfont/[hash].[ext]?t=${Date.now()}`
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: `img/[hash].[ext]`
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            }
        ]),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            }
        }),
        new webpack.ProvidePlugin({
            // fetch: 'exports?self.fetch!whatwg-fetch',
            Immutable: 'immutable',
            moment: 'moment'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
        }),
    ].concat(options.plugins),
    resolve: {
        modules: [srcPath, nodePath],
        extensions: [
            ' ',
            '.js',
            '.jsx',
            '.css',
            '.scss'
        ],
        alias: {
            // 'react': 'react/dist/react.min.js',
            // 'react-dom': `react-dom/dist/react-dom.min.js`,
            // 'redux': `redux/dist/redux.min.js`,
            // 'react-router': `react-router/umd/ReactRouter.min.js`,
            // 'react-redux': 'react-redux/dist/react-redux.min.js',
            // 'react-router-redux': 'react-router-redux/dist/ReactRouterRedux.min',
            'immutable': 'immutable/dist/immutable.min',
            'components': 'components',
            'actions': 'actions',
            'containers': 'containers',
            'reducers': 'reducers'
        }
    },
    devtool: 'inline-source-map',
    target: 'web',
    stats: true,
})