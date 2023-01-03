const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const report_schema = new Schema({
    name :{type :String,trim:true,lowercase: true, unique:true,  required:true},
    name_ara :{type :String,trim:true,lowercase: true, default:''},
    name_fr :{type :String,trim:true,lowercase: true, default:''}
});


module.exports = mongoose.model('report_reason_tbls', report_schema);

