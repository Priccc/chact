const express = require('express');
const User = require('../models/user');
const config = require('../config');
const router = express.Router();

//查询用户名是否存在
router.post('/findByName',(req,res)=>{
    User.findOne({
      'username':req.body.username
    },(err,user)=>{
      if(err){
        throw err;
      }
      if(!user){
        return res.json({success: false, result:{isExit: false}});
      }else {
        return res.json({success: false, result:{isExit: true}});
      }
    })
    
})

// 注册账户
router.post('/signup', (req, res) => {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      sex:req.body.sex,
      birthday:req.body.birthday,
      email:req.body.email,
      addresss:req.body.addresss
    });
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        return res.json({success: false, result:{message: '注册失败!'}});
      }
      res.json({success: true, result:{message: '成功创建新用户!'}});
    });
});
//用户登录
router.post('/login',(req,res) =>{
  User.findOne({
    'username': req.body.username
  },(err,user)=>{
    if(err){
      throw err;
    }
    if(!user){
      return res.json({success: false, result:{message:'认证失败,用户不存在!'}});
    } else if(user){
      if(user.password == req.body.password){
        return res.json({success: true, result:{message:'认证成功'}});
      }else{
        return res.json({success: false, result:{message:'认证失败,密码错误!'}});
      }
    }
  })
})
module.exports = router;