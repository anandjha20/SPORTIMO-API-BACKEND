const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
         complaint_id: { type:Schema.Types.ObjectId,ref: 'complaint_categories', required: true },
         message: { type: String, required: false },
         sender_type: { type: String ,lowercase:true, enum: ['user', 'admin'], required: true },
        
    });


module.exports = mongoose.model('user_complaint_chat', pollschema);

