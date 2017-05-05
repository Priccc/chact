const UserModel = require('./models/User');
const GroupModel = require('./models/Group');

module.exports = function(router, io) {
 router.post('/cmp', function(req, res){
   console.log(io);
   // var product_id = req.body.product_id;
   // var bid = req.body.bid.split('b')[1];
   //
   // io.sockets.emit("bidSuccess", {product_id: product_id, bid: bid});
   res.json(200, {message: "Message received!"});
 }),
 //查询用户名是否存在
 router.post('/findByName',(req,res)=>{
     UserModel.findOne({
       'username':req.body.username
     },(err,user)=>{
       console.log(user)
       if(err){
         throw err;
       }
       if(!user){
         return res.json({success: true, result:{isExit: false}});
       }else {
         return res.json({success: true, result:{isExit: true}});
       }
     })

 })
};
