
const mongoose  = require("mongoose")

const Schema = mongoose.Schema;

const team_match_schema = new Schema({
             match_id    : {type:String,require:true, unique: true},
             match_name  : {type:String ,require:true },
             team_a_id     : {type:String,require:true },
             team_a_name  : { type : String,require:true  },
             team_a_short_name : { type : String ,require:true },
             team_b_id     : {type:String,require:true },
             team_b_name  : { type : String,require:true  },
             team_b_short_name : { type : String ,require:true },
             date_utc :{ type: Date, require:true,  },
             time_utc :{ type: Date, require:true,  },
             last_updated :{ type: Date, require:true,  },

             status :{type:String, default: '' },
             score_a :{type:String,default: '' }, 
             score_b :{type:String,default: '' }, 
            venue: { type: Schema.Types.Mixed, default: {} },
            live: { type: Schema.Types.Mixed, default: {} }
         }) ;


module.exports = mongoose.model("team_matches",team_match_schema);









