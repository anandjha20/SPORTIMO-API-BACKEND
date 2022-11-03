const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const D_msg_schema = new Schema({
      d_msg: { type: String,unique: true , required: true },
      d_msg_ara: { type: String,required: true},
    
     });     

module.exports = mongoose.model('default_massages', D_msg_schema);

      