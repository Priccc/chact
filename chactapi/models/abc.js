const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbcSchema = new Schema({
    name:{
        type:String,
        unique:true,//不可重复约束
        require:true //不可为空约束
    }
})

module.exports = mongoose.model('Abc',AbcSchema);