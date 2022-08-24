const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
       
         user_id: { type:Schema.Types.ObjectId,ref: 'user_tbls', required: true },
         cat_id: { type:Schema.Types.ObjectId,ref: 'complaint_categories', required: true },
         question: { type: String, required: false },
         admin_status: { type: Boolean , default : 0 },
         image: { type: String, default :'' },
    });


module.exports = mongoose.model('user_complaint_tbl', pollschema);

