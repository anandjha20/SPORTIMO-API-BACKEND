const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const league_list = new Schema({
         
  competition_id:{type:String,require:true},
  season_id:{type:String,require:true},
  original_name:{type:String,require:true},
  original_name_ara:{type:String,require:true},
  league_logo:{type:String,require:true},
  status:{type:Boolean,default:1},
  type:{type:String,enum:['custom','default'],default:'default'},

});


module.exports = mongoose.model('league_list', league_list);

