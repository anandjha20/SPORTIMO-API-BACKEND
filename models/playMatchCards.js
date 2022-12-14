const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playMatchCard_schema = new Schema({ 
                                           match_card_id    : {type:Schema.Types.ObjectId ,ref:"match_cards", required:true },  
                                           match_id         : {type:Schema.Types.ObjectId,ref:"team_matches",required:true },
                                           league_id        : {type:String,default:"61217" },
                                           card_id          : {type:Schema.Types.ObjectId,ref:"prediction_cards",required:true },
                                           card_cat_id      : {type:Schema.Types.ObjectId,ref:"prediction_card_categories",required:true },
                                           user_id          : {type:Schema.Types.ObjectId,ref:"user_tbl",required:true },  
                                           user_option      : {type:String,trim:true,default:'' },
                                           point            : {type:Number , default:1 }, 
                                           powerUpPoints    : {type:Number , default:1 }, 
                                           ans              : {type:String , default:'' }, 
                                           time_range_start :  {type:Number , default:0 }, 
                                           time_range_end   :  {type:Number , default : 0 }, 
                                           dateTime         : {type:Date,default:Date.now  },
                                           active           : {type:Boolean,default: 1 },
                                           result           : { type: String,enum: ['pending','win', 'lose'],default:'pending' },
                                        });
 
 module.exports = mongoose.model("play_match_cards",playMatchCard_schema);
   
       






