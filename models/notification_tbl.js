const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                             
        title : {type : String, required : true},
        message: { type: String, required: true,  },
        type_status: { type: String,enum:[0,1] ,default : 0 },     // 0 = in app Notification, 1 = Send Notification 
       

});


module.exports = mongoose.model('notification_tbls', sprtschema);

