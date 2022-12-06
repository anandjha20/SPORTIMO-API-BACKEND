const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const user_achievements = new Schema({
         user_id :{  type: Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
         league_id : {type:String,default:"61217"},
         rank : {type:String,default:"0"}
        });
   

module.exports = mongoose.model('user_achievements', user_achievements);


