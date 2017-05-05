
const express = require('express');
const path = require('path');
const compression = require('compression');
const cwd = process.cwd();
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const fs = middleware.fileSystem;
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};


const addProdMiddlewares = (app, options) => {
  app.use(compression());

  app.get('*', (req, res) => res.sendFile(path.resolve(cwd, 'server/views/index.html')));
};


module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(cwd, 'dist');
  app.use(publicPath, express.static(outputPath));

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../webpack/webpack.dev');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
