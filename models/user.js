const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const Userschema = new Schema({
                             
         name: { type: String, default: ''},
         doc_type: { type: String,default: ''},
         token: { type: String, default: '' },
      
         address: { type: String, default: '' },
         user_language : { type: String,enum: ['Arabic', 'English'],  default: 'English' },

         email: { type: String, default: ''},
         otp: { type: Number, required: true },
         mobile: { type: Number,default: 0},
         gender: { type: String ,lowercase:true, enum: ['male', 'female,other'], default: 'male' },
         user_type: { type: String,enum: [1,2,3,4,5], default: '5' }, // 1 = mobile, 2 = email, 3 = google, 4 = apple, 5 = Guest user //
         image: { type: String,default: '' }, 
         country :{type: String,default: '' },
         date: { type: Date, default: Date.now()},   
         active_status: { type: Boolean ,default : 1},     
         email_status: { type: Boolean , default : 0 },
         mobile_status: { type: Boolean , default : 0 },
         device_id: { type: String,required: true},
         sport_preferences:  { type: String ,default: ''},
         league_preference: { type: String ,default: ''},
         team_preference:  { type: String ,default: '' },
         player_preference:  { type: String,default: '' },
         u_name :  { type: String,default: '' },
         nickname :  { type: String,default: '' },
         status_msg :  { type: String,default: '' },
});


module.exports = mongoose.model('user_tbl', Userschema);

