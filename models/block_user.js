const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
         from_user: { type:Schema.Types.ObjectId,ref: 'user_tbl', required: true },
         to_user:  { type:Schema.Types.ObjectId,ref: 'user_tbl', required: true },
         date: { type: Date , default: Date.now },
          
    });



   
    
module.exports = mongoose.model('block_user_tbl', pollschema);

                