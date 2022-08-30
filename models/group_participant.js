const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const chat_chema = new Schema({
         group_id:{ type:Schema.Types.ObjectId,ref: 'chat_groups', required: true },
         dateTime: {type:String,default:''},  
         user_id: { type:Schema.Types.ObjectId,ref: 'user_tbl', required: true },
        });

   
module.exports = mongoose.model('group_participants', chat_chema);

