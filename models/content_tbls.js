const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                             
         type: { type: String, required: true, unique: true },
         content_data: { type: String, required: true },
     });


module.exports = mongoose.model('content_tbls', sprtschema);

