const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // 解析body字段模块
const morgan = require('morgan'); //命令行log显示
const mongoose = require('mongoose');
const routes = require('./routes'); //路由配置
const config = require('./config'); //全局配置
var server = require('http').Server(app);
var io = require('socket.io')(server);
const controller = require('./controller');

let port = process.env.PORT || 8086;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值

app.use(morgan('dev')); // 命令行中显示程序运行日志,便于bug调试

app.use('/api', routes); //路由传入

// io.on('connect', (socket) => {
//   controller(socket);
// });

mongoose.Promise = global.Promise;
mongoose.connect(config.database); //连接数据库

app.listen(port, () => {
  console.log('listening on port : ' + port);
});