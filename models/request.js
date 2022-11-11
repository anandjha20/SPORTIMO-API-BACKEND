const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const request_Schema = new Schema({
         request_type:{type:String,eunm:['follow'],default:'follow'},                    
         user_id: { type:mongoose.Schema.Types.ObjectId, ref: 'user_tbl', required: true },
         another_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user_tbl', required: true },
         date: {type:Date, default:Date.now}
     });


module.exports = mongoose.model('request', request_Schema);