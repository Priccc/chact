const express = require('express');
const User = require('../models/user');
const config = require('../config');
const router = express.Router();

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

// 检查用户名与密码并生成一个accesstoken如果验证通过
// router.post('/user/accesstoken', (req, res) => {
//   User.findOne({
//     name: req.body.name
//   }, (err, user) => {
//     if (err) {
//       throw err;
//     }
//     if (!user) {
//       res.json({success: false, message:'认证失败,用户不存在!'});
//     } else if(user) {
//       // 检查密码是否正确
//       user.comparePassword(req.body.password, (err, isMatch) => {
//         if (isMatch && !err) {
//           var token = jwt.sign({name: user.name}, config.secret,{
//             expiresIn: 10080  // token到期时间设置
//           });
//           user.token = token;
//           user.save(function(err){
//             if (err) {
//               res.send(err);
//             }
//           });
//           res.json({
//             success: true,
//             message: '验证成功!',
//             token: 'Bearer ' + token,
//             name: user.name
//           });
//         } else {
//           res.send({success: false, message: '认证失败,密码错误!'});
//         }
//       });
//     }
//   });
// });

// // passport-http-bearer token 中间件验证
// // 通过 header 发送 Authorization -> Bearer  + token
// // 或者通过 ?access_token = token
// router.get('/users/info',
//   passport.authenticate('bearer', { session: false }),
//   function(req, res) {
//     res.json({username: req.user.name});
// });

router.get('/', (req, res) => {
    res.json({ message: 'hello users'});
  });
router.get('/:name', (req, res) => {
    res.json({ name: req.params.name});
  });

module.exports = router;