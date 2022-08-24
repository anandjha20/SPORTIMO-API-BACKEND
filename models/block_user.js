const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
         from_user: { type:Schema.Types.ObjectId,ref: 'user_tbls', required: true },
         to_user:  { type:Schema.Types.ObjectId,ref: 'user_tbls', required: true },
         date: { type: String },
          
    });



   
    
module.exports = mongoose.model('block_user_tbl', pollschema);

                