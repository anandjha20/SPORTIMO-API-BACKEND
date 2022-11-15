const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                         user_id : {type : String, default : ''},     
                         title : {type : String,trim:true, required : true},
                        message: { type: String,trim:true, required: true,  },
                     
                         title_ara : {type : String,trim:true,  default : ''},
                        message_ara : { type: String,trim:true,  default : ''},
                     
                        type_status: { type: String,enum:[0,1] ,default : 0 },   // 0 = in app Notification, 1 = Send Notification 
                        module_type :  {type :String,default : ''},
                        module_id :  {type :String, default : ''},
                        category_type:{ type: String, lowercase:true, enum:['system','hints','results','news','block','follow','unfollow','request' ],default : 'system' },    //  System notification, hints, results, news,
                        country: {type : String, default : ''},   
                        sports: {type : String, default : ''},
                        leagues: {type : String, default : ''},
                        team: {type : String, default : ''},
                        players: {type : String, default : ''},
                        date : {type: Date, default : Date.now }
                   });
     

module.exports = mongoose.model('notification_tbls', sprtschema);

