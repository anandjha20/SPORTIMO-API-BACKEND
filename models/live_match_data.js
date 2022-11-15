const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const live_match_data = new Schema({ 
            yellow_card:{type:Number,default:0}

        });
 
module.exports = mongoose.model("live_match_data",live_match_data);
