const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const geq = new Schema({
                             
      
         match_id: { type: Schema.Types.ObjectId , ref:"team_matches" , required: true },
         match_name: { type: String, required: true },
         event: { type: String, required: true },
         appearance_time: { type: String },
         duration: { type: String },
         
         qus: { type: String , required: true }, qus_ara: { type: String , required: true },
         ops_1: { type: String, required: true },  ops_1_ara: { type: String, required: true },
         ops_2: { type: String, required: true},  ops_2_ara: { type: String, required: true },
         ops_3: { type: String, required: true },  ops_3_ara: { type: String, required: true },
         ops_4: { type: String, default :'' },  ops_4_ara: { type: String, default :'' },
         ops_5: { type: String, default :'' },  ops_5_ara: { type: String, default :'' },
         
         reward_type    : { type: String,default :'' },
         reward_quantity: { type: String , default :'' },
         reward_condition: { type: String , default :'' },

         targeted_country: { type: String, default :'' },
         targeted_sport: { type: String, default :'' },
         targeted_player: { type: String, default :'' },
         targeted_team: { type: String, default :'' },
         targeted_league: { type: String, default :'' },
        
         date :{ type: Date, default: Date.now }
});


module.exports = mongoose.model('geq_tbl', geq);

