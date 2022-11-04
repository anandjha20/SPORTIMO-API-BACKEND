const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const powerUpSchema = new Schema({
         power_up_count : { type: Number, default : 0 },
         user_id : {  type : Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
    });


module.exports = mongoose.model('user_allotted_powerUps', powerUpSchema);