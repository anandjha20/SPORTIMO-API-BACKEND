
const mongoose  = require("mongoose")

const Schema = mongoose.Schema;

const predictionCC_schema = new Schema({
             name : {type:String,trim:true,required:true,unique: true},
             name_ara : {type:String,trim:true,datault: ''},
             name_fr : {type:String,trim:true,datault: ''}
         }) ;


module.exports = mongoose.model("prediction_card_categories",predictionCC_schema);









