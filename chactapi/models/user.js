const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        unique:true,//不可重复约束
        require:true //不可为空约束
    },
    password:{
        type:String,
        require:true //不可为空约束
    },
    sex:{
        type:String
    },
    birthday:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    state:{
        type:String
    }
})

module.exports = mongoose.model('User',UserSchema);