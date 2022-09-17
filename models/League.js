const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                             
         name: { type: String, required: true, unique: true },
         name_ara: { type: String, default : ''},
         image: {type:String, default :'' },
         active_status: { type: Boolean ,default : 1},
       

});


module.exports = mongoose.model('league', sprtschema);

