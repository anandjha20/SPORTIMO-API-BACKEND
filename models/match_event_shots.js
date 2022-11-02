const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const adminschema = new Schema({
                match_id: { type: Number , required: true },
                 event_type: { type: String,  enum: ['shots_on_target','fouls','card_39','card_34','card_16','card_03'],trim:true, default: 'shots_on_target' },
                 shots_count: { type: Number , default: 0 },
                 team_a : { type: Number , default: 0 },
                 team_b : { type: Number , default: 0 },
                });


module.exports = mongoose.model('match_event_shots', adminschema);
