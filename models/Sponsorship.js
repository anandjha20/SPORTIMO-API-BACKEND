const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const sprtschema = new Schema({
                             
         //match: { type: String, required: true, unique: true },
         match: { type: String, required: true },
         image: { type: String, required: true, default :'' },
         sports: { type: String, required: true, default :'' },

         league: { type: String, required: true, default :'' },
        
         team :{ type: String, required: true, default :'' },
         players:{ type: String, required: true, default :'' },
         country:{ type: String, required: true, default :'' },
         skip_add: { type: Boolean,  default :0 },
         view_type:{ type: String,  enum: ['banner', 'video',], default :'banner' },
         Fdate: { type: Date,required: true },
         Ldate: { type: Date,required: true },
         created_date: { type: Date,required: true },                   
    
             active_status: { type: Boolean ,default : 1},
       

});


module.exports = mongoose.model('sponsorship', sprtschema);

