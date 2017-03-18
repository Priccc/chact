const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const cheerio = require('cheerio');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const cwd = process.cwd();
const nodePath = path.resolve(cwd, 'node_modules');
module.exports = require('./webpack.base')({
    entry: [
        'webpack-hot-middleware/client',
        'index.js'
    ],
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'less-loader'
                }
            ]
        },
        {
            test: /\.scss$/,
            exclude: nodePath,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'resolve-url-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: 'inline'
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ],
        },
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: cwd,
            manifest: require(path.resolve(cwd, './manifest.json')),
            sourceType: 'var'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            templateContent: templateContent()
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});

function templateContent() {
    const html = fs.readFileSync(
        path.resolve(cwd, 'src/index.html')
    ).toString();

    const doc = cheerio(html);
    const body = doc.find('body');
    body.append(`<script data-dll='true' src='/js/lib/vendor.dll.js'></script>`);
    return doc.toString();
}