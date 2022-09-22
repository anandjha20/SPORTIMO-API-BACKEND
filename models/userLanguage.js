const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const userLenSchema = new Schema({
            user_id : {type: Schema.Types.ObjectId,ref:"user_tbl",required:true},
            lenguage : {type:String, trim:true,required :true},
            active: {type : Boolean,default:true }
        });


module.exports = mongoose.model("user_lenguages",userLenSchema);


















