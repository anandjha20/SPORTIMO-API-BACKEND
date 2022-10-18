const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const adminschema = new Schema({
                             
         match_id: { type: Number , required: true },
        event_type: { type: String,  enum: ['shots_on_target'],trim:true, default: 'shots_on_target' },
        shots_count: { type: Number , default: 0 },
       

});


module.exports = mongoose.model('match_event_shots', adminschema);
