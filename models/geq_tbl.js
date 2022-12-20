const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const geq = new Schema({
                             
      
         match_id: { type: Schema.Types.ObjectId , ref:"team_matches" , required: true },
         match_name: { type: String, required: true },
         event: { type: String, required: true },
         appearance_time: { type: String },
         duration: { type: String },
         
         qus: { type: String , required: true }, qus_ara: { type: String , required: true },
         opt_1: { type: String, required: true },  opt_1_ara: { type: String, required: true },
         opt_2: { type: String, required: true},  opt_2_ara: { type: String, required: true },
         opt_3: { type: String, default :'' },  opt_3_ara: { type: String, default :'' },
         opt_4: { type: String, default :'' },  opt_4_ara: { type: String, default :'' },
         opt_5: { type: String, default :'' },  opt_5_ara: { type: String, default :'' },
         
         correct_ans: { type: String,enum: ['opt_1', 'opt_2', 'opt_3', 'opt_4', 'opt_5',''], default :'' },
         result_disclosed: { type: Boolean , default :0 },
         reward_type    : { type: String,default :'' },
         reward_quantity: { type: Number , default :0 },
         reward_condition: { type: String , default :'' },

         targeted_country: { type: Array, default :[] },
         targeted_sport: { type: Array, default :[] },
         //targeted_player: { type: Array, default :[] },
         targeted_team: { type: Array, default :[] },
         targeted_league: { type: Array, default :[] },
        
         date :{ type: Date, default: Date.now }
});


module.exports = mongoose.model('geq_tbl', geq);

