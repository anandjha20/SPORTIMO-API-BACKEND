const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const adminschema = new Schema({
         login_date: { type: String,default :'' },
         logout_date: { type: String,default :'' },
        // user_id: { type: String,required: true},
         user_id :{  type: Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
       });
   

module.exports = mongoose.model('user_logs', adminschema);




