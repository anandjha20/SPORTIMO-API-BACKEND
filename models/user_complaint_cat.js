const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                             
         cat_name: { type: String, required : true, unique: true },
         cat_name_ara: { type: String, required : true, unique: true },
         cat_name_fr: { type: String, required : true, unique: true },
         active_status: { type: Boolean ,default : 1},
       });
             

module.exports = mongoose.model('Complaint_categories', sprtschema);

