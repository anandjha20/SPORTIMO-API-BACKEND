const mongoose = require('mongoose');

const Schema = mongoose.Schema;             

            
const pollschema = new Schema({
         poll_id:{ type:Schema.Types.ObjectId,  ref: 'poll_tbls', required: true },
         user_id: { type:Schema.Types.ObjectId,ref: 'user_tbls', required: true },
      });


module.exports = mongoose.model('poll_skips', pollschema);

       