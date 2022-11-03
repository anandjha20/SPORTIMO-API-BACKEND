const mongoose = require('mongoose');

const Schema = mongoose.Schema;             

            
const geqAnswerSchema = new Schema({
      
         geq_id:{ type:Schema.Types.ObjectId,  ref: 'geq_tbl', required: true },
         user_id: { type:Schema.Types.ObjectId,ref: 'user_tbl', required: true },
         user_ans:{ type: String, required: true },
         date: { type: Date, default: Date.now()} 
       
    });


module.exports = mongoose.model('geq_answers', geqAnswerSchema);

       