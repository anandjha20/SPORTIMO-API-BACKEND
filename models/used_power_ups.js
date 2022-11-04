const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const powerUpSchema = new Schema({
        user_id : {  type : Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
        match_id : {  type : Schema.Types.ObjectId,  ref: 'team_matches', required: true },
        card_id : {  type : Schema.Types.ObjectId,  ref: 'prediction_cards', required: true },
        power_up_type : { type: String, default : 0 },
        date : {type: Date, default: Date.now }

    });


module.exports = mongoose.model('used_power_ups', powerUpSchema);