const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const chat_chema = new Schema({
         group_name: { type: String, required: true, unique: true },
         type      : { type: String,enum: ['publice','privete'], default: 'publice' },
            });


module.exports = mongoose.model('chat_groups', chat_chema);

