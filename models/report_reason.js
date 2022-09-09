const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const report_schema = new Schema({
    name :{type :String,trim:true,lowercase: true, unique:true,  required:true}
});


module.exports = mongoose.model('report_reason_tbls', report_schema);

