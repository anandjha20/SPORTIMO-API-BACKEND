const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const emoji = new Schema({
        title:{ type: String, required: true },
        emoji:{ type: String, required: true },
    });        


module.exports = mongoose.model('emoji', emoji);

