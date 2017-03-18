const express = require('express');
const router = express.Router();

// 任何路由的每次request都执行
router.use(function(req, res, next) {
    // 打印
    console.log('Something is happening.');
    next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});

// 用这个路由来做简单的测试(用get动词访问 http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use('/user', require('./user'));
router.use('/abc', require('./abc'));

module.exports = router;