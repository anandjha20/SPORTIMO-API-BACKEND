const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const notification_archive = new Schema({
         notification_id:{type:mongoose.Schema.Types.ObjectId, ref: 'notification_tbls', required: true },                    
         user_id: { type:mongoose.Schema.Types.ObjectId, ref: 'user_tbl', required: true },
         date: {type:Date, default:Date.now}
     });


module.exports = mongoose.model('notification_archive', notification_archive);