const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const followers_Schema = new Schema({
                             
         follower_id: { type:mongoose.Schema.Types.ObjectId, ref: 'user_tbl', required: true },
         following_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user_tbl', required: true },
         date: {type:Date, default:Date.now}
     });


module.exports = mongoose.model('follower_users', followers_Schema);