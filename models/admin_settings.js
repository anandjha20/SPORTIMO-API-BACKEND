const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const admin_settings = new Schema({
                             
         unblock_period_days: { type:Number ,default:0},
         auto_chat_blocking: { type: Number ,default:0},
         guest_user_active_days: {type:Number, default:0},
         default_prediction_period: { type: Number ,default:10},
         default_prediction_update_period: { type: Number ,default:10},
         rank_1_bonus: { type: Number ,default:100},
         rank_2to3_bonus: { type: Number ,default:75},
         rank_4to5_bonus: { type: Number ,default:50},
         rank_6to10_bonus: { type: Number ,default:25},
        
        });


module.exports = mongoose.model('admin_settings', admin_settings);
