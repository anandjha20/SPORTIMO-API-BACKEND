const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                             
         team_name: { type: String, required: true, unique: true },
         active_status: { type: Boolean ,default : 1},
       

});


module.exports = mongoose.model('team', sprtschema);

