
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user_reportSchema = new Schema({
    reported_user_id : {type: Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
    reporting_user_id : {type: Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
    reason_id :  {type: Schema.Types.ObjectId,  ref: 'report_reason_tbls', required: true },
    discription : {type:String, default:''},  
    image : {type:String, default:''},                        
    date : {type:Date,default: Date.now}
});


    user_reportSchema.set('timestamps', true);
module.exports = mongoose.model("user_reportings",user_reportSchema);                 