
const mongoose  = require("mongoose")

const Schema = mongoose.Schema;

const match_card_schema = new Schema({
              match_id    : {type:Schema.Types.ObjectId,ref:"team_matches",require:true },
            // live_match_id    : {type:Number,require:true, unique: true},
             match_name  : {type:String ,require:true },
             card_id     : {type:Schema.Types.ObjectId,ref:"prediction_cards",require:true },
             apperance_times  : { type : String,require:true  },time_duration : { type : String ,require:true },
             point_1     : {type:Number,default:0 },
             point_2     : {type:Number,default:0 },
             point_3     : {type:Number,default:0 },
             point_4     : {type:Number,default:0 },
             date :{ type: Date, default: Date.now  },
          
         }) ;


module.exports = mongoose.model("match_cards",match_card_schema);









