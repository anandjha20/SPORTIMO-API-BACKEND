
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user_preference = new Schema({
    user_id : {type: Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
    league_id_mongo : {type: String,  default:"" },
    team_id_mongo : {type: String,  default:"" },
    sport_id_mongo : {type: String,  default:"" },
    competition_id : {type: String,  default:"" },
    season_id : {type: String,  default:"" },
    team_id : {type: String,  default:"" },
    
});


module.exports = mongoose.model("user_preference",user_preference);                 