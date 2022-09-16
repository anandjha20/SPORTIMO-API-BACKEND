const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const pollschema = new Schema({
         match: { type: String, required: true },
         poll_type: { type: String,enum: ['Public Poll', 'Private Poll'],  default: 'Public Poll' },
         fee_type: { type: String,enum: ['Free', 'Paid'],default: 'Free' },
         result_type: { type: String,enum: ['Disclosed', 'Undisclosed'],default: 'Disclosed' },
         disclosed_status: { type:String, enum :[0,1], default: 0 },
            reward_type:     { type: String, default: '' },
            reward_quantity: { type: Number, default: 0 },
         
         amount: { type: Number, default: 0 },
         apperance_time: { type: String, required: true },
         time_duration: { type: String ,required: true},
          qus: { type: String , required: true }, qus_ara: { type: String , required: true },

         ops_1: { type: String, required: false },  ops_1_ara: { type: String, required: false },
         ops_2: { type: String, required: false },  ops_2_ara: { type: String, required: false },
         ops_3: { type: String, required: false },  ops_3_ara: { type: String, required: false },
         ops_4: { type: String, required: false },  ops_4_ara: { type: String, required: false },
         ops_5: { type: String, required: false },  ops_5_ara: { type: String, required: false },
        
         noti_status: { type: Boolean , default : 0 },          
         noti_in_App_status: { type: Boolean , default : 0 },
         date :{ type: Date,  required: true},
        
         sports: { type: String,  default :'' },
         leagues: { type: String, default :'' },
         teams :{ type: String,  default :'' },
      
         players:{ type: String,  default :'' }
    });


module.exports = mongoose.model('poll_tbl', pollschema);

