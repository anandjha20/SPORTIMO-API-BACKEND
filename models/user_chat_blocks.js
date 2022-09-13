const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const Schema = mongoose.Schema;

 let userblockSchema = new Schema({
    user_id : {type:Schema.Types.ObjectId,ref:"user_tbl",require:true },
    block_status : {type:Boolean,default:0},
    block_type :{ type: String, trim :true, enum: ['admin', 'auto',], require:true },
    date :{type:Date,default:Date.now}
});

module.exports = mongoose.model("user_chat_blocks",userblockSchema);