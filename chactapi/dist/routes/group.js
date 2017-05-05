const express = require('express');
const GroupModel = require('../models/Group');
const config = require('../config');
const router = express.Router();

//创建新群聊
router.post('/test', (req, res) => {
  //  const user = GroupModel.getGroup(req.body._id);
  res.json({ success: true, result: 'true' });
});
module.exports = router;