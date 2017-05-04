const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Group = require('./models/Group');
const Message = require('./models/Message');
const config = require('./config');

module.exports = function socketHandler(socket) {
    //查询用户名是否存在
    socket.on('findByName', ({ username }) => {
        User.findOne({
            'username': req.body.username
        }, (err, user) => {
            console.log(user);
            if (err) {
                throw err;
            }
            if (!user) {
                return res.json({ success: true, result: { isExit: false } });
            } else {
                return res.json({ success: true, result: { isExit: true } });
            }
        });
    });
};