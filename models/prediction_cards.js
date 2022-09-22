
const mongoose  = require("mongoose")

const Schema = mongoose.Schema;

const prediction_card_schema = new Schema({
             name : {type:String,trim:true,required:true,unique: true},
             name_ara : {type:String,trim:true,datault: ''},
             card_type:{ type: String,enum: ['Game-based', 'Event-based','Time-based','Time-Decay'], default :'Game-based' },
             card_cat_id : {type:Schema.Types.ObjectId,ref:"prediction_card_categories",require:true },
             apperance_time: { type: String, required: true },
             time_duration: { type: String ,required: true},
             qus: { type: String , required: true }, qus_ara: { type: String , datault: '' },

             ops_1: { type: String, required: false },  ops_1_ara: { type: String, required: false },
             ops_2: { type: String, required: false },  ops_2_ara: { type: String, required: false },
             ops_3: { type: String, required: false },  ops_3_ara: { type: String, required: false },
             ops_4: { type: String, required: false },  ops_4_ara: { type: String, required: false },
             date :{ type: Date, default: Date.now  },
        
         }) ;


module.exports = mongoose.model("prediction_cards",prediction_card_schema);









