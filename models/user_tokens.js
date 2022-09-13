
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let tokenSchema = new Schema({
                        user_id  : {type : Schema.Types.ObjectId, required : true  },
                         token : {type :String, default: true }
                     });


 module.exports = mongoose.model('user_tokens', tokenSchema);  