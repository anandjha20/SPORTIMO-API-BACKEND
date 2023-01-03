
const mongoose  = require("mongoose")

const Schema = mongoose.Schema;

const prediction_card_schema = new Schema({
             name : {type:String,trim:true,required:true,unique: true},
             name_ara : {type:String,trim:true,datault: ''},
             name_fr : {type:String,trim:true,datault: ''},
             card_type : { type: String,enum: ['Game-based', 'Event-based','Time-based','Time-Decay'], default :'Game-based' },
             card_cat_id : {type:Schema.Types.ObjectId,ref:"prediction_card_categories",require:true },
             card_color : { type:String, datault : "white"},   
             font_color : { type:String, datault : "#ffffff"},   
             image : { type:String, datault : ""},
             qus: { type: String , required: true }, qus_ara: { type: String , datault: '' },qus_fr: { type: String , datault: '' },

             ops_1: { type: String, required: false },  ops_1_ara: { type: String, required: false },  ops_1_fr: { type: String, required: false },
             ops_2: { type: String, required: false },  ops_2_ara: { type: String, required: false },  ops_2_fr: { type: String, required: false },
             ops_3: { type: String, required: false },  ops_3_ara: { type: String, required: false },  ops_3_fr: { type: String, required: false },
             ops_4: { type: String, required: false },  ops_4_ara: { type: String, required: false },  ops_4_fr: { type: String, required: false },
             point_1 : { type: Number, default: 0 },    point_2 : { type: Number, default: 0 },
             point_3 : { type: Number, default: 0 },    point_4 : { type: Number, default: 0 },
             date :{ type: Date, default: Date.now },
             time_range: { type: Number,default: 0},
         }) ;


module.exports = mongoose.model("prediction_cards",prediction_card_schema);









