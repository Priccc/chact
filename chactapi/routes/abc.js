const express = require('express');
const Abc = require('../models/abc');
const config = require('../config');
const router = express.Router();

router.post('/signup', (req, res) => {
  console.log(req.body.name);
  if (!req.body.name) {
    res.json({success: false, message: '请输入您的账号密码.'});
  } else {
    var newAbc = new Abc({
      name: req.body.name
    });
    // 保存用户账号
    newAbc.save((err) => {
      if (err) {
        return res.json({success: false, message: '注册失败!'});
      }
      res.json({success: true, message: '成功创建新用户!'});
    });
  }
});
module.exports = router;