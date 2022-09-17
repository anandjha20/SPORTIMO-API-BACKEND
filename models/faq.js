const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
       
         faq_cat_id:{ type: Schema.Types.ObjectId,  ref: 'faq_categories', required: true },
         question: { type: String, required: true }, 
         answer: { type: String, required: true }, 
         question_ara: { type: String, required: true },
         answer_ara : { type: String, required: true }
    });        


module.exports = mongoose.model('faq_tbl', pollschema);

