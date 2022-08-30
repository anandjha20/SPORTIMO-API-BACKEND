const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const D_msg_schema = new Schema({
       d_msg: { type: String,lowercase:true,unique: true , required: true },
     
      });        


module.exports = mongoose.model('default_massages', D_msg_schema);

      