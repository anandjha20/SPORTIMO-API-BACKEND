const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const admin_settings = new Schema({
                             
         unblock_period_days: { type:Number ,default:0},
         auto_chat_blocking: { type: Number ,default:0},
         guest_user_active_days: {type:Number, default:0}
     });


module.exports = mongoose.model('admin_settings', admin_settings);
