const mongoose = require('mongoose');

const Schema = mongoose.Schema;

            
const Userschema = new Schema({
                             
         name: { type: String, default: ''},
         doc_type: { type: String,default: ''},
         token: { type: String, default: '' },
         city: { type: String, default: '' },
         address: { type: String, default: '' },
         user_language : { type: String,enum: ['Arabic', 'English'],  default: 'English' },

         email: { type: String, default: ''},
         otp: { type: Number, required: true },
         mobile: { type: Number,default: 0},
        // gender: { type: String , enum: ['Male','Female,Other'], default: 'Male' },
         gender: { type: String ,  default: '' },
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
       //  nickname :  { type: String,default: '' },
         status_msg :  { type: String,default: '' },
         seq_id : { type: Number,unique: true , default : 1  },
         is_deleted : { type: Number, default : 0 },
         facebook_id : { type: String ,default: ''},
         music_sound : { type: String,enum: [0,1], default: '0' },
         haptics : { type: String,enum: [0,1], default: '0' },
         chat : { type: String,enum: [0,1], default: '0' },          
         biometric  : { type: String,enum: [0,1], default: '0'},
         notifications : { type: String,enum: [0,1], default: '0' }, 
         chatBlockStatus :{type:Boolean,default: 0 },
         firebase_token :  { type: String ,default: ''},
         profile_type : {type:String, enum :["public","private"] ,default: "public" },  
         points: { type: Number, default: 0 }
});


module.exports = mongoose.model('user_tbl', Userschema);

