const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const avatars = new Schema({
       
         avatar:{ type: String, required: true },
    });        


module.exports = mongoose.model('avatars', avatars);

