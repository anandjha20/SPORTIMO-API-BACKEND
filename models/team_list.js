const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const team_list = new Schema({
    
  competition_id:{type:String,require:true},
  season_id:{type:String,require:true},
  team_id:{type:String,require:true},
  team_name:{type:String,require:true},
  team_name_ara:{type:String,require:true},
  short_name:{type:String,require:true},
  short_name_ara:{type:String,require:true},
  team_logo:{type:String,require:true},
  type:{type:String,enum:['custom','default'],default:'default'},

});  


module.exports = mongoose.model('team_list', team_list);

