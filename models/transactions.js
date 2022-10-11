const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const users = require('./users');

const schema = new Schema({
                points: { type: Number, required:true },
                type: { type: String,enum: ['credit', 'debit', 'refund'],required:true },
                description : {type: String,default:''},
                user_id: { type: Schema.Types.ObjectId,ref: 'user_tbl' },
                match_id: {type: Schema.Types.ObjectId,ref: 'team_matches'},
                card_id: {type: Schema.Types.ObjectId,ref: 'prediction_cards'},
                date : {type:Date , default :Date.now}
        });

module.exports = mongoose.model('transactions', schema);