const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const loginschema = new Schema({
        date: { type: Date, default: Date.now()},   
        // user_id: { type: String,required: true},
         user_id :{  type: Schema.Types.ObjectId,  ref: 'user_tbl', required: true },
       });
   

module.exports = mongoose.model('logins', loginschema);




