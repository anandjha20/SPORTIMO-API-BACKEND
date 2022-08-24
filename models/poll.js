const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
         match: { type: String, required: true },
         poll_type: { type: String,enum: ['Public Poll', 'Private Poll'],  default: 'Public Poll' },
         fee_type: { type: String,enum: ['Free', 'Paid'],default: 'Free' },
         amount: { type: Number, default: 0 },
         apperance_time: { type: Number, required: true },
         time_duration: { type: String ,required: true},
         qus: { type: String, required: true },
         ops_1: { type: String, required: false },
         ops_2: { type: String, required: false },
         ops_3: { type: String, required: false },
         ops_4: { type: String, required: false },
         ops_5: { type: String, required: false },   
        
         noti_status: { type: Boolean , default : 0 }
    });


module.exports = mongoose.model('poll_tbl', pollschema);

